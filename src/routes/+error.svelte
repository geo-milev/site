<script>
	import { page } from '$app/stores';
	import { getContext } from "svelte";
	import SecondaryButton from "$lib/SecondaryButton.svelte";

	const layout = getContext("layout")

	layout.set({
		navbar: {
			fixed: false,
			showTitle: false,
			backgroundColor: "#4F0D0D",
		},
	});

</script>

<div class="container">
	<div class="header-container">
		<h1>{$page.status}</h1>
		<div class="line"></div>
	</div>
	<p>
		{#if $page.status === 404}
			Страницата, която търсите, не е намерена
		{:else}
			Нещо се обърка
		{/if}
	</p>
	<SecondaryButton href="/" text="Начало"></SecondaryButton>
</div>

<style>
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 3rem;
        position: relative;
		flex-direction: column;
		margin-bottom: 3rem;
	}

	.header-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.line {
		position: relative;
		width: 50%;
		height: 1px;
		background-color: var(--primary-text);
		display: flex;
		top: -1px;
	}

	.container h1 {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 700;
        font-size: 176px;
        line-height: 212px;
        text-align: center;
        color: var(--primary-text);
        margin: 0;
		border-bottom: 1px solid var(--primary-semi-transparent);
    }

	.container p {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 700;
        font-size: 40px;
        line-height: 48px;
        text-align: center;
        color: var(--primary-text);
		text-transform: uppercase;
    }
</style>
