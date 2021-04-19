// The reason this is not in .env file is that Svelte envs wont be changed after the app is build.
// Even if you change .env file. So it makes more sense to put the constant here.
// Also it is nice to demonstrate how the code can be shared between backend and frontend.
// Take that Java developers! 😅
const API_ROUTE_PREFIX = '/api';

export default API_ROUTE_PREFIX;
