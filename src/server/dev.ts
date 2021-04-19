import proxy from 'koa-proxies';
import './setupEnv';
import createServer, { Params } from './createServer';
import API_ROUTE_PREFIX from '../shared/apiRoutePrefix';

const { SERVER_PORT = 3001 } = process.env;


createServer(<Params>{
	injectMiddlewares: (app) => {
		// All requests that do not go to api url should be forwarded to svelte dev server
		const notApiPath = new RegExp(`^(?!${API_ROUTE_PREFIX.replace('/', '\\/')})`);

		app.use(proxy(notApiPath, {
			target: 'http://localhost:3000', // TODO make svelte dev server port configurable
			logs: true
		}));
	}
}).listen(SERVER_PORT, () => {
	console.info(`Koa dev server listening on ${SERVER_PORT}`);
});

