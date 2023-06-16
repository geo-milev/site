<script lang="ts">
	import Button from "$lib/Button.svelte";

	interface ArticlePreview {
		title: string;
		description: string;
		image: {
			url,
			alt
		}
		href: string;
		date: Date;
	}

	export let preview: ArticlePreview;
</script>

<div class="container">
	<img class="preview-image" loading="lazy" src="{preview.image.url}" alt="{preview.image.alt}"/>
	<div class="content">
		<div class="text">
			<h3>{preview.title}</h3>
			<p>{preview.description}</p>
		</div>
		<div class="button"><Button href="{preview.href}" text="Виж още" target="_blank"/></div>
	</div>
</div>

<style>
	.container {
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
        position: relative;
		display: flex;
		flex-direction: column;
	}

	.preview-image {
		object-fit: cover;
		height: 60%;
		width: 100%;
	}

	.content {
		display: flex;
		padding: 1rem;
		flex-direction: column;
		justify-content: space-between;
		height: 40%;
	}

	h3 {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 24px;
        margin: 0 0 0.5rem;
        color: #000000;
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
        color: #000000;
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
