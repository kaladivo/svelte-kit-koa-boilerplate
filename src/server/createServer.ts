import Koa from 'koa';
import Router from 'koa-router';
import logger from 'koa-logger';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import API_ROUTE_PREFIX from '../shared/apiRoutePrefix';

export interface Params {
	injectMiddlewares: (koa: Koa) => undefined
}

export default function createServer({ injectMiddlewares }: Params = { injectMiddlewares: () => undefined }): Koa {
	const app = new Koa();
	app.use(logger());

	injectMiddlewares(app);

	// Router to serve api
	const apiRouter = new Router();
	apiRouter.prefix(API_ROUTE_PREFIX);

	apiRouter.use(json());
	apiRouter.use(bodyParser());

	apiRouter.get('/', async (ctx, next) => {
		ctx.body = {
			message: '😇 Api is up and running 🤩 🤩',
			currentEnvironment: process.env.NODE_ENV,
			version: process.env.VERSION
		};
		await next();
	});

	app
		.use(apiRouter.routes())
		.use(apiRouter.allowedMethods());

	return app;
}
