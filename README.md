# Svelte-kit + Koa boilerplate project

This is a boilerplate for svelte(-kit) and koa. It includes:
    
1. [Koa](https://koajs.com) for building backend API
2. [Svelte kit](https://github.com/sveltejs/kit) for building FE js app
3. [Typescript](http://typescriptlang.org) support
4. Build configuration and Dockerfile for easy to set up deploy

## Download with Degit
`degit kaladivo/svelte-kit-koa-boilerplate my-new-super-cool-project`

## Structure
`src/server` - Where the Koa server lives in
`src/server/createServer.ts` - Creates Koa server, here you can add more routes
`src/app` - SvelteKit app directory. See [official docs](https://github.com/sveltejs/kit`) to find out more.

## How to use
First of all, run `yarn install` to install all dependencies.

`yarn start:server` - starts koa dev server  
`yarn start:app` - starts svelte-kit dev server  
`yarn start` - runs both start commands concurrently  

`yarn build:server` - builds Koa server into _/build_ folder  
`yarn build:app` - builds Svelte-kit app into _/build_ folder   
`yarn build` - runs both build commands concurrently  

`yarn serve` - Starts built koa server

## TODO
- [ ] Include .env file setup
