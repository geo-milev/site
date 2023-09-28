<script lang="ts">
	import ArticlePreview from "../../lib/ArticlePreview.svelte";
	import BigArticlePreview from "$lib/BigArticlePreview.svelte";
	import SecondaryButton from "$lib/SecondaryButton.svelte";
	import { fly } from "svelte/transition";
	import { secondaryLayout, setLayout } from "../../lib/setLayout";
	import { getContextClient } from "@urql/svelte";
	import RSSFeedIcon from "$lib/RSSFeedIcon.svelte";

	setLayout(secondaryLayout)

	export let data;

	let articles = data.allNews.docs

	let remainArticles = data.allNews.hasNextPage;
	let page = 1;
	let client = getContextClient()

	const requestMoreArticles = () => {
		page++;
		client.query(
			`query($page: Int!) {
					allNews(page: $page, limit: 10, sort: "-publishDate") {
						docs {
						  title
						  description
						  postImage {
							url
							alt
						  }
						  publishDate
						  id
						}
						hasNextPage,
					}
				}
   		 	`, { page }).then(result => {
					articles = articles.concat(result.data.allNews.docs)
					remainArticles = result.data.allNews.hasNextPage
				})
	}
</script>

<div class="container">
	<h1>Новинарска страница на ППМГ “Гео Милев”</h1>
	<div class="news-container">
		<div class="big-article-preview">
			<BigArticlePreview preview="{articles[0]}" />
		</div>
		{#each articles.slice(1) as article}
			<div class="article-preview" in:fly={{ duration: 300 }}>
				<ArticlePreview preview="{article}" />
			</div>
		{/each}
	</div>
	{#if remainArticles}
		<SecondaryButton text="Виж още" action="{requestMoreArticles}" />
		{:else}
		<span class="no-more-articles">Това са всички новини.</span>
	{/if}
</div>

<a aria-label="RSS поток" data-sveltekit-reload title="RSS поток" class="rss-button" href="/news/feed">
	<RSSFeedIcon></RSSFeedIcon>
</a>

<style>
	.container {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 3rem;
		gap: 3rem;
	}

	.news-container {
		max-width: 70%;
		display: flex;
		flex-wrap: wrap;
		gap: 2rem;
		margin-left: 5rem;
		margin-right: 5rem;
		justify-content: center;
		align-items: center;
	}

	h1 {
        font-family: 'Alegreya', serif;
        font-style: normal;
        font-weight: 700;
        font-size: 40px;
        line-height: 54px;
        text-align: center;
        color: var(--background-text);
		max-width: 30rem;
		margin-bottom: 0;
		padding-bottom: 2rem;
		border-bottom: var(--primary-semi-transparent) 1px solid;
	}

	h1:after {
		content: "";
		display: block;
		height: 1px;
		width: 30%;
		background-color: var(--background-text);
		position: relative;
		top: calc(2rem + 1px);
        margin: auto;
	}

	.article-preview {
        display: flex;
        height: 24rem;
        width: 17rem;
	}

	.big-article-preview {
        display: flex;
        height: 24rem;
        width: 36rem;
	}

	.no-more-articles {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 18px;
        text-align: center;
        color: var(--background-text);
	}

	.rss-button {
		position: fixed;
		bottom: 12px;
		right: 12px;
		max-width: 36px;
		max-height: 36px;
		z-index: 2;
	}
</style>
