<script lang="ts">
	import ArticlePreview from "../../lib/ArticlePreview.svelte";
	import { secondaryLayout, setLayout } from "../../lib/setLayout";
	import { mapArticles } from "../../lib/mapArticles";
	import Carousel from "$lib/Carousel.svelte";
	import SecondaryButton from "$lib/SecondaryButton.svelte";

	setLayout(secondaryLayout)

	export let data;

	let olympiads = mapArticles(data.olympiads).map((article) => {
		return {
			preview: article
		}
	})

	let sports = mapArticles(data.sports).map((article) => {
		return {
			preview: article
		}
	})

	let arts = mapArticles(data.arts).map((article) => {
		return {
			preview: article
		}
	})
</script>

<div class="container">
	<div class="header-container">
		<h1>Постижения</h1>
		<div class="line"></div>
	</div>
	<div class="achievements-container">
		<div class="achievements-section">
			<div class="achievement-header-container">
				<h3>Олимпиади</h3>
				<SecondaryButton href="/achievements/olympiads" text="Виж още"></SecondaryButton>
			</div>
			<Carousel elementProps="{olympiads}" component="{ArticlePreview}" componentHeight="23rem" componentWidth="16rem" />
		</div>
		<div class="achievements-section">
			<div class="achievement-header-container">
				<h3>Спорт</h3>
				<SecondaryButton href="/achievements/sports" text="Виж още"></SecondaryButton>
			</div>
			<Carousel elementProps="{sports}" component="{ArticlePreview}" componentHeight="23rem" componentWidth="16rem" />
		</div>
		<div class="achievements-section">
			<div class="achievement-header-container">
				<h3>Творчество</h3>
				<SecondaryButton href="/achievements/arts" text="Виж още"></SecondaryButton>
			</div>
			<Carousel elementProps="{arts}" component="{ArticlePreview}" componentHeight="23rem" componentWidth="16rem" />
		</div>
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 2rem;
		margin-bottom: 3rem;
		gap: 3rem;
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
        flex-direction: column;
        justify-content: center;
		width: 100%;
    }

    .achievement-header-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 5.5rem;
		padding-right: 5.5rem;
	}

    .achievement-header-container h3 {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 300;
        font-size: 32px;
        line-height: 38px;
        color: #FFFFFF;
    }
</style>