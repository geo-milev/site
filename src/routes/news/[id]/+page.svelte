<script>
	import { parseRichText } from "$lib/parseRichText";
	import { setLayout, tertiaryLayout } from "$lib/setLayout";
	import { env } from "$env/dynamic/public";
	import RichText from "$lib/RichText.svelte";

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
	<img src="{env.PUBLIC_SERVER_URL + data.News.postImage.url}" alt="{data.News.postImage.alt}"/>
	<RichText richText="{parseRichText(data.News.content)}"></RichText>
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
        max-width: 50vw;
        max-height: 50vh;
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
    }

	.article-content p {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 300;
        font-size: 16px;
        line-height: 19px;
        text-align: center;
	}

	.top-container {
		display: flex;
		flex-direction: column;
        max-width: min(40rem, 100%);
        justify-content: center;
        align-items: center;
	}
</style>
