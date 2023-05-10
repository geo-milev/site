<script lang="ts">
	import ArticlePreview from "../../lib/ArticlePreview.svelte";
	import BigArticlePreview from "$lib/BigArticlePreview.svelte";
	import SecondaryButton from "$lib/SecondaryButton.svelte";
	import { fly } from "svelte/transition";
	import { secondaryLayout, setLayout } from "../../lib/setLayout";
	import { getContextClient } from "@urql/svelte";
	import { mapArticles } from "../../lib/mapArticles";

	setLayout(secondaryLayout)

	export let data;

	let articles = mapArticles(data.allNews.docs)

	let remainArticles = true;
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
					articles = articles.concat(mapArticles(result.data.allNews.docs))
					remainArticles = result.data.hasNextPage
				})
	}
</script>

<div class="container">
	<h1>Новинарска страница на ППМГ “Гео Милев”</h1>
	<div class="news-container">
		<div class="big-article-preview">
			<BigArticlePreview preview="{articles[0]}" />
		</div>
		{#each articles as article}
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
        color: #FFFFFF;
		max-width: 30rem;
		margin-bottom: 0;
		padding-bottom: 2rem;
		border-bottom: rgba(255, 255, 255, 0.31) 1px solid;
	}

	h1:after {
		content: "";
		display: block;
		height: 1px;
		width: 30%;
		background-color: #FFFFFF;
		position: relative;
		top: calc(2rem + 1px);
        margin: auto;
	}

	.article-preview {
        display: flex;
        height: 23rem;
        width: 16rem;
	}

	.big-article-preview {
        display: flex;
        height: 23rem;
        width: 34rem;
	}

	.no-more-articles {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 18px;
        text-align: center;
        color: #FFFFFF
	}
</style>