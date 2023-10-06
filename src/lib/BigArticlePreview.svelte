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
		<img class="preview-image logo" loading="lazy" src="{env.PUBLIC_SERVER_URL + $seoAutofillImage.url}" alt="{$seoAutofillImage.url}">
	{/if}
	<div class="content">
		<div class="text">
			<span>{new Date(preview.publishDate)
				.toLocaleDateString("bg-BG", { year: 'numeric', month: 'long', day: 'numeric' })}</span>
			<div class="separator"></div>
			<h2>{preview.title}</h2>
		</div>
		<div class="button"><Button href="/news/{preview.id}" text="Виж още" target="_blank"/></div>
	</div>
</div>

<style>
    .container {
        width: 100%;
        height: 100%;
        position: relative;
		display: flex;
        flex-direction: column;
		justify-content: flex-end;
    }

	.preview-image {
		position: absolute;
        object-fit: cover;
		width: 100%;
		height: 100%;
		bottom: 0;
		filter: brightness(0.5);
	}

	.preview-image.logo {
		background-color: #FFFFFF;
	}

	.content {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
		padding: 1rem;
		min-height: 36%;
	}

	.text {
        position: relative;
        display: flex;
        flex-direction: column;
		gap: 0.5rem;
	}

	span {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 18px;
        color: var(--white);
		margin-bottom: 0.5rem;
	}

	.separator {
		display: block;
		height: 2px;
		width: 100%;
		background-color: var(--primary);
	}

	h2 {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 23px;
        color: var(--primary-text);
		margin: 0;
	}

	.button {
         margin-top: 0.5rem;
     }
</style>
