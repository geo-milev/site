<script>
	import { setLayout, tertiaryLayout } from "$lib/setLayout";
	import { env } from "$env/dynamic/public";
	import BlockRenderer from "$lib/BlockRenderer.svelte";

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
	{#if data.News.postImage}
		<img src="{env.PUBLIC_SERVER_URL + data.News.postImage.url}" alt="{data.News.postImage.alt}" loading="lazy" />
	{/if}
	<BlockRenderer blocks="{data.News.content}" />
</div>

<style>
    .article-content {
		--background: var(--news-background);
        --background-text: var(--news-background-text);
        --secondary: var(--news-secondary);
        --secondary-text: var(--news-secondary-text);
		--background-accent: var(--news-background-accent);
        --secondary-accent: var(--news-secondary-accent);
        --primary-semi-transparent: var(--news-primary-semi-transparent);
        --secondary-light-text: var(--news-secondary-light-text);
        --primary-disabled: var(--news-primary-disabled);
        --background-disabled: var(--news-background-text);
	}

    .article-content h1 {
        font-family: 'Alegreya', serif;
        font-style: normal;
        font-weight: 400;
        color: var(--background-text);
        border-bottom: 2px var(--primary) solid;
        margin: 0;
        padding: 1rem;
		text-align: center;
	}

    .header-container {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-left: 2rem;
        padding-right: 2rem;
        border-bottom: 1px var(--primary-semi-transparent) solid;
        width: auto;
	}

    .article-content img {
        object-fit: contain;
        width: 100%;
        max-width: 50rem;
        height: 100%;
        max-height: 25rem;
    }

    .article-content {
        color: var(--background-text);
        display: flex;
        flex-direction: column;
        margin-left: 3rem;
        margin-right: 3rem;
        justify-content: center;
        align-items: center;
        margin-bottom: 5rem;
		gap: 1rem;
    }

	.article-content p {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 300;
        font-size: 19px;
        line-height: 23px;
        text-align: center;
	}

	.top-container {
		display: flex;
		flex-direction: column;
        max-width: min(50rem, 100%);
        justify-content: center;
        align-items: center;
	}

    @media only screen and (max-width: 740px) {
		.article-content {
			margin-left: 1rem;
			margin-right: 1rem;
		}
    }
</style>
