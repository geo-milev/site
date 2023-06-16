<script>
	import { setLayout, tertiaryLayout } from "$lib/setLayout";
	import { env } from "$env/dynamic/public";
	import BlockRenderer from "$lib/BlockRenderer.svelte";
	import { seoInfo } from "$lib/seoInfo";

	setLayout(tertiaryLayout)

	export let data;

	seoInfo.update(seoInfo => {
		seoInfo.title = data.News.title
		seoInfo.description = data.News.description
		seoInfo.type = "article"
		seoInfo.imageUrl = data.News.postImage.url
		seoInfo.publishDate = data.News.publishDate

		return seoInfo
	})
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
	<img src="{env.PUBLIC_SERVER_URL + data.News.postImage.url}" alt="{data.News.postImage.alt}"/>
	<BlockRenderer blocks="{data.News.content}"
				   buttonColor="#7D0B09"
				   textColor="#000000"
				   headerLineColor="#7D0B09" />
</div>

<style>
    .article-content h1 {
        font-family: 'Alegreya', serif;
        font-style: normal;
        font-weight: 400;
        color: #000000;
        border-bottom: 2px #7D0B09 solid;
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
        border-bottom: 1px rgba(124, 20, 22, 0.33) solid;
        width: auto;
	}

    .article-content img {
        object-fit: contain;
        width: 100%;
        max-width: 50rem;
        height: 100%;
        max-height: 50rem;
    }

    .article-content {
        color: #000000;
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
