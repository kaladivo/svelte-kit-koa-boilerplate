<script>
	import axios from 'axios';
	import { onMount } from 'svelte';

	let promise = Promise.resolve({})

	onMount(async () => {
		promise = axios.get('/api');
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p>I work werry good</p>
<br>

{#await promise}
	<p>Loading...</p>
{:then response}
	<p>data: {JSON.stringify(response.data)}</p>
{:catch error}
	<p class='error'>{error.message}</p>
{/await}

<style>
	.error {
			color: darkred;
	}
</style>
<!--wtf-->
