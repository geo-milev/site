<script lang="ts">
	import Button from "$lib/Button.svelte";
	import ArticlePreview from "./ArticlePreview.svelte";

	export let preview: ArticlePreview;
</script>

<div class="container" style="--preview-img: url({preview.image.url});">
	<div class="content">
		<div class="text">
			<span>{preview.date.toLocaleDateString("bg-BG", { year: 'numeric', month: 'long', day: 'numeric' })}</span>
			<div class="separator"></div>
			<h4>{preview.title}</h4>
		</div>
		<div class="button"><Button href="{preview.href}" text="Виж още" /></div>
	</div>
</div>

<style>
    .container {
        width: 100%;
        height: 100%;
        position: relative;
        background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), var(--preview-img);
        background-size: cover;
		display: flex;
        flex-direction: column;
		justify-content: flex-end;
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

	h4 {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 23px;
        color: #FFFFFF;
		margin: 0;
	}
</style>