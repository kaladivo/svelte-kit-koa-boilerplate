const sveltePreprocess = require('svelte-preprocess');
const pkg = require('./package.json');

const { join } = require('path');

const adapt = async (utils) => {
	const out = 'build/';

	utils.log.minor('Copying assets');
	const static_directory = join(out, 'assets');
	utils.copy_client_files(static_directory);
	utils.copy_static_files(static_directory);

	utils.log.minor('Copying server');
	utils.copy_server_files(out);

	utils.log.minor('Prerendering static pages');
	await utils.prerender({
		dest: `${out}/prerendered`
	});

};

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: sveltePreprocess(),

	kit: {
		// By default, `npm run build` will create a standard Node app.
		// You can create optimized builds for different platforms by
		// specifying a different adapter
		// adapter: { adapt } ,
		adapter: {adapt},

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',

		vite: {
			ssr: {
				noExternal: Object.keys(pkg.dependencies || {})
			}
		},

		// Change project structure. App should be served from `src/app`
		files: {
			routes: `src/app/routes`,
			template: 'src/app/app.html'
		}
	}
};
