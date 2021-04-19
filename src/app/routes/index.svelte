<script>
	import ApiCall from '../components/ApiCall.svelte';

</script>

<style>
    .content {
			padding: 0 1rem;
    }

    .box {
        max-width: 600px;
        margin: 1rem auto;
    }
</style>

<div class='content'>
	<div class='box'>
		<h1>Welcome to SvelteKit</h1>
		<hr>
		<p>This is simple boilerplate to use for quickly setting up Svelte Kit + Koa app.</p>
	</div>
	<div class='box'>
	<ApiCall />
	</div>
</div>
<!--wtf-->
