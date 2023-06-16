<script lang="ts">
	import Button from "$lib/Button.svelte";
	import ArticlePreview from "./ArticlePreview.svelte";

	export let preview: ArticlePreview;
</script>

<div class="container">
	<img class="preview-image" loading="lazy" src="{preview.image.url}" alt="{preview.image.alt}">
	<div class="content">
		<div class="text">
			<span>{preview.date.toLocaleDateString("bg-BG", { year: 'numeric', month: 'long', day: 'numeric' })}</span>
			<div class="separator"></div>
			<h2>{preview.title}</h2>
		</div>
		<div class="button"><Button href="{preview.href}" text="Виж още" target="_blank" /></div>
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
		filter: brightness(0.5);;
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
        color: #FFFFFF;
		margin-bottom: 0.5rem;
	}

	.separator {
		display: block;
		height: 2px;
		width: 100%;
		background-color: #7D0B09;
	}

	h2 {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 23px;
        color: #FFFFFF;
		margin: 0;
	}

	.button {
         margin-top: 0.5rem;
     }
</style>
