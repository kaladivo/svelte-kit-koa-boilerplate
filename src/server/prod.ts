import { dirname, join } from 'path';
import fs from 'fs';
import { URL, fileURLToPath } from 'url';
import fetch, { Response, Request, Headers } from 'node-fetch';
import serve from 'koa-static';
import compress from 'koa-compress';

import './setupEnv'
import createServer, { Params } from './createServer';

// Render app exposed from build app
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { render } from './app.js';


const { SERVER_PORT = 3000 } = process.env;

// // provide server-side fetch
globalThis.fetch = fetch;
globalThis.Response = Response;
globalThis.Request = Request;
globalThis.Headers = Headers;

const __dirname = dirname(fileURLToPath(import.meta.url));
const paths = {
	assets: join(__dirname, './assets'),
	prerendered: join(__dirname, './prerendered')
};

const noop_handler = async (_, next) => await next();

const mutable = (dir) =>
	serve(dir, {
		maxAge: 0
	});

createServer(<Params>{
	injectMiddlewares: (app) => {
		const prerenderedHandler = fs.existsSync(paths.prerendered)
			? mutable(paths.prerendered)
			: noop_handler;

		const assetsHandler = fs.existsSync(paths.assets)
			? serve(paths.assets, {
				maxAge: 31536000,
				immutable: true
			})
			: noop_handler;

		app.use(assetsHandler);
		app.use(prerenderedHandler);
		app.use(compress({ threshold: 0 }));

		app.use(async (ctx, next) => {
			const { req } = ctx;

			const parsed = new URL(req.url || '', 'http://localhost');
			const rendered = await render({
				method: req.method,
				headers: req.headers, // TODO: what about repeated headers, i.e. string[]
				path: parsed.pathname,
				// body: , // TODO body
				query: parsed.searchParams
			});

			if (rendered && rendered.status != 404) {
				ctx.response.status = rendered.status;
				ctx.set(rendered.headers);
				ctx.response.body = rendered.body;
			} else {
				await next();
				// If page not found and no body provided, that means that probably no route was found
				// TODO find a better way
				if (ctx.status === 404 && ctx.body === undefined) {
					ctx.response.status = rendered.status;
					ctx.set(rendered.headers);
					ctx.response.body = rendered.body;
				}
			}
		});
	}
}).listen(
	SERVER_PORT,
	() => {
		console.log(`Listening on ${SERVER_PORT}`);
	});

