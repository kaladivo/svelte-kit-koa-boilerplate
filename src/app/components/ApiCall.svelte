<script lang="ts">
	import Axios from 'axios'
	let promise = Axios.get('/api')
</script>

{#await promise}
	<p>Loading api response...</p>
{:then response}
	<p>Response from api: {JSON.stringify(response.data)}</p>
{:catch error}
	<p class='error'>{error.message}</p>
{/await}

<style>
    .error {
        color: darkred;
    }
</style>
