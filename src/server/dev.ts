import createServer, {Params } from './createServer';
import proxy from 'koa-proxies';

const { SERVER_PORT = 3001 } = process.env;

createServer(<Params>{
	injectMiddlewares: (app) => {
		app.use(proxy(/^(?!\/api)/, {
			target: 'http://localhost:3000',
			changeOrigin: true,
			logs: true
		}));
	}
}).listen(SERVER_PORT, () => {
	console.info(`Koa dev server listening on ${SERVER_PORT}`);
});

