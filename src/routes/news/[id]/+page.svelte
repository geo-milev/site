<script>
	import { parseRichText } from "$lib/parseRichText";
	import { setLayout, tertiaryLayout } from "$lib/setLayout";
	import { PUBLIC_IMAGE_ENDPOINT } from "$env/static/public";

	setLayout(tertiaryLayout)

	export let data;
</script>

<div class="article-content">
	<div class="top-container">
		<div class="header-container">
			<h1>{data.News.title}</h1>
		</div>
		<div class="description">
			<p>{data.News.description}</p>
		</div>
	</div>
	<img src="{PUBLIC_IMAGE_ENDPOINT + data.News.postImage.url}" alt="{data.News.postImage.alt}"/>
	<div class="markup-content">
		{@html parseRichText(data.News.content)}
	</div>
</div>

<style>
	:global(.article-content h1,
	.article-content h2,
	.article-content h3,
	.article-content h4,
	.article-content h5,
	.article-content h6) {
        font-family: 'Alegreya', serif;
        font-style: normal;
        font-weight: 400;
        color: #000000;
		border-bottom: 2px #7D0B09 solid;
		margin: 0;
		padding: 1rem;
	}

	:global(.header-container) {
		display: flex;
		justify-content: center;
		align-items: center;
		padding-left: 2rem;
		padding-right: 2rem;
        border-bottom: 1px rgba(124, 20, 22, 0.33) solid;
		width: auto;
	}

    :global(.article-content img) {
		object-fit: contain;
		max-width: 50vw;
		max-height: 50vh;
	}

	:global(.article-content) {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 300;
        font-size: 16px;
        line-height: 19px;
        text-align: center;
        color: #000000;
	}

	:global(.markup-content) {
        text-align: left;
	}

	:global(.markup-content .header-container) {
        justify-content: flex-start;
        align-items: center;
        padding-left: 0;
		margin-top: 1rem;
	}

    :global(.markup-content img) {
		align-self: center;
		justify-self: center;
		margin-top: 1rem;
    }

    :global(.markup-content pre) {
        overflow-x: auto;
    }

    :global(.markup-content p) {
        text-indent: 1rem;
    }

	.markup-content {
		display: flex;
		max-width: min(40rem, 100%);
		flex-direction: column;
		align-items: flex-start;
	}

	:global(.markup-content div) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
	}

	.article-content {
		display: flex;
		flex-direction: column;
		margin-left: 3rem;
		margin-right: 3rem;
		justify-content: center;
		align-items: center;
		margin-bottom: 5rem;
	}

	.top-container {
		display: flex;
		flex-direction: column;
        max-width: min(40rem, 100%);
        justify-content: center;
        align-items: center;
	}
</style>