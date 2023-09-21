<script lang="ts">
	import { secondaryLayout, setLayout } from "../../../lib/setLayout";
	import ArticlePreview from "$lib/ArticlePreview.svelte";
	import { fly } from "svelte/transition";
	import SecondaryButton from "$lib/SecondaryButton.svelte";
	import { categoryKeys } from "$lib/getAchievementsQuerу.js";
	import { getContextClient } from "@urql/svelte";
	import { getAchievementQueryWithPagination } from "../../../lib/getAchievementsQuerу";

	setLayout(secondaryLayout)

	export let data;
	let client = getContextClient()
	let page = 0;
	let remainArticles = data.articles.allNews.hasNextPage;
	const requestMoreArticles = () => {
		page++;
		client.query(getAchievementQueryWithPagination(data.category), { page: page, }).then((res) => {
			remainArticles = res.data.allNews.hasNextPage
			articles = [...articles, ...res.data.allNews.docs]
		})
	}

	let articles = data.articles.allNews.docs
</script>

<div class="container">
	<div class="header-container">
		<h1>{categoryKeys[data.category]}</h1>
		<div class="line"></div>
	</div>
	<div class="achievements-container">
		<div class="achievements-section">
			{#each articles as article}
				<div class="article-preview" in:fly={{ duration: 300 }}>
					<ArticlePreview preview="{article}" />
				</div>
			{/each}
		</div>
		{#if remainArticles}
			<SecondaryButton text="Виж още" action="{requestMoreArticles}" />
		{:else}
			<span class="no-more-articles">Това са всички.</span>
		{/if}
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 2rem;
		margin-bottom: 3rem;
	}

    .header-container {
        display: flex;
        width: auto;
        flex-direction: column;
        align-items: center;
        margin-bottom: 4rem;
    }

    .line {
        width: 30rem;
        height: 1px;
        background-color: rgba(255, 255, 255, 0.31);
        margin-top: -1px;
    }

    h1 {
        font-family: 'Alegreya', serif;
        font-style: normal;
        font-weight: 700;
        font-size: 40px;
        line-height: 54px;
        text-align: center;
        border-bottom: 2px #FFFFFF solid;
        margin: 0;
        padding-bottom: 1rem;
        color: #FFFFFF;
		text-transform: capitalize;
    }

	.achievements-container {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 2rem;
		flex-direction: column;
        padding-left: 4rem;
        padding-right: 4rem;
        box-sizing: border-box;
        width: 100%;
	}

    .achievements-section {
        display: flex;
        justify-content: center;
		gap: 4rem;
		flex-wrap: wrap;
		width: 100%;
    }

    .article-preview {
        display: flex;
        height: 24rem;
        width: 17rem;
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

    @media only screen and (max-width: 740px) {
        .header-container {
            padding-left: 0;
            padding-right: 0;
        }

		.line {
			width: 15rem;
		}
    }
</style>
