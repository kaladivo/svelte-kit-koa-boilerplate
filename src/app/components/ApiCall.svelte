<script lang="ts">
	import Axios from 'axios';
	import API_ROUTE_PREFIX from '../../shared/apiRoutePrefix';

	let promise = Axios.get(API_ROUTE_PREFIX);
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
