import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import run from  '@rollup/plugin-run'

const dev = process.env.ROLLUP_WATCH;

const DEV_ENTRYPOINT = 'src/server/dev.ts'
const PROD_ENTRYPOINT = 'src/server/prod.ts'

export default {
	input: dev ? DEV_ENTRYPOINT : PROD_ENTRYPOINT,
	output: {
		file: 'build/index.js',
		format: 'esm',
		sourcemap: true
	},
	plugins: [
		typescript(),
		commonjs(),
		json(),
		// autoExternal(),
		dev && run()
	],
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	external: ['./app.js', ...require('module').builtinModules]
};
