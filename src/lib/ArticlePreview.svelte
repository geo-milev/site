<script lang="ts">
	import Button from "$lib/Button.svelte";
	import { env } from "$env/dynamic/public";
	import { seoAutofillImage } from "$lib/seoAutofillImage";

	export let preview;
</script>

<div class="container">
	{#if preview.postImage}
		<img class="preview-image" loading="lazy" src="{env.PUBLIC_SERVER_URL + preview.postImage.url}" alt="{preview.postImage.alt}">
	{:else}
		<img class="preview-image" loading="lazy" src="{env.PUBLIC_SERVER_URL + $seoAutofillImage.url}" alt="{$seoAutofillImage.alt}">
	{/if}
	<div class="content">
		<div class="text">
			<h3>{preview.title}</h3>
			<p>{preview.description}</p>
		</div>
		<div class="button"><Button href="/news/{preview.id}" text="Виж още" target="_blank"/></div>
	</div>
</div>

<style>
	.container {
		width: 100%;
		height: 100%;
		background-color: var(--secondary);
        position: relative;
		display: flex;
		flex-direction: column;
	}

	.preview-image {
		object-fit: cover;
		height: 50%;
		width: 100%;
	}

	.content {
		display: flex;
		padding: 1rem;
		flex-direction: column;
		justify-content: space-between;
		height: 50%;
		box-sizing: border-box;
	}

	h3 {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 24px;
        margin: 0 0 0.5rem;
        color: var(--secondary-text);
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        -webkit-box-orient: vertical;
	}

	p {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 18px;
		margin: 0;
        color: var(--secondary-text);
		text-overflow: ellipsis;
        overflow: hidden;
		display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
    }

	.button {
		margin-top: 0.5rem;
	}
</style>
