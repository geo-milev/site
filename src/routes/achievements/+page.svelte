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

	const entries = [
		{ title: "Олимпиади", key: "olympiads", elementProps: olympiads },
		{ title: "Спорт", key: "sports", elementProps: sports },
		{ title: "Творчество", key: "arts", elementProps: arts },
	]
</script>

<div class="container">
	<div class="header-container">
		<h1>Постижения</h1>
		<div class="line"></div>
	</div>
	<div class="achievements-container">
		{#each entries as entry}
			<div class="achievements-section">
				<div class="achievement-header-container">
					<h3>{entry.title}</h3>
					<div class="button-top">
						<SecondaryButton href="/achievements/{entry.key}" text="Виж още"></SecondaryButton>
					</div>
				</div>
				<Carousel elementProps="{entry.elementProps}" component="{ArticlePreview}" componentHeight="23rem" componentWidth="16rem" />
				<div class="button-bottom">
					<SecondaryButton href="/achievements/{entry.key}" text="Виж още"></SecondaryButton>
				</div>
			</div>
		{/each}
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
        flex-direction: column;
        align-items: center;
		width: min(100%, 30rem)
    }

    .line {
        width: 100%;
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
		padding-left: 6.5rem;
		padding-right: 6.5rem;
	}

    .achievement-header-container h3 {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 300;
        font-size: 32px;
        line-height: 38px;
        color: #FFFFFF;
    }

	.button-bottom {
		display: none;
		width: 100%;
		justify-content: center;
		align-items: center;
		margin-top: 1rem;
	}

    @media only screen and (max-width: 740px) {
		.achievement-header-container {
			padding: 0;
			flex-direction: column;
		}

		.button-bottom {
			display: flex;
		}

		.button-top {
			display: none;
		}

		.container {
			gap: 0;
		}
    }
</style>