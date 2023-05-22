<script lang="ts">
    import Slideshow from "$lib/Slideshow.svelte";
	import type { Slide } from "../lib/Slideshow.svelte";
	import OvalContainer from "$lib/OvalContainer.svelte";
	import ArticlePreview from "$lib/ArticlePreview.svelte";
	import Carousel from "$lib/Carousel.svelte";
	import Button from "$lib/Button.svelte";
	import { mainLayout, setLayout } from "../lib/setLayout"
	import { mapArticles } from "../lib/mapArticles";
	import { env } from "$env/dynamic/public";

	setLayout(mainLayout)

	interface Profile {
		imgSrc: string
		name: string
		description: string
	}

	export let data;

	let slides: Slide[] = data.Slideshow.slides.map((slide) => {
		return {
			src: env.PUBLIC_SERVER_URL + slide.image.url,
			text: slide.text,
			callToAction: {
				text: slide.button.text,
				dest: slide.button.href
			}
		}
	})

	let profiles: Profile[] = data.WhatIsStudied.profiles.map((profile) => {
		return {
			imgSrc: env.PUBLIC_SERVER_URL + profile.image.url,
			name: profile.name,
			description: profile.description
		}
	})

	let articleProps = mapArticles(data.allNews.docs).map((article) => {
		return {
			preview: article
		}
	})
</script>

<Slideshow slides={slides} />

<OvalContainer>
	<div class="hello-section">
		<div class="video-column">
			<iframe
				width="560"
				height="315"
				src="{data.VideoSection.video}"
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowfullscreen></iframe>
		</div>
		<div class="hello-column">
			<h3>{data.VideoSection.header}</h3>
			<p>{data.VideoSection.text}</p>
		</div>
	</div>
</OvalContainer>

<div class="news-section">
	<h3>Новини</h3>
	<Carousel elementProps="{articleProps}" component="{ArticlePreview}" componentHeight="23rem" componentWidth="16rem"/>
</div>

<OvalContainer>
	<div class="what-we-study-section">
		<h3>{data.WhatIsStudied.header}</h3>
		<p>{data.WhatIsStudied.text}</p>
		<div class="profiles">
			{#each profiles as profile}
				<div class="profile">
					<div class="image-container">
						<img src="{profile.imgSrc}" alt="{profile.name}"/>
					</div>
					<h4>{profile.name}</h4>
					<p>{profile.description}</p>
				</div>
			{/each}
		</div>
		<Button href="/about-us" text="Виж още"></Button>
	</div>
</OvalContainer>

<style>
	.hello-section {
		width: 100%;
		display: flex;
		justify-content: center;
		gap: 5rem;
	}

	.hello-column {
		max-width: 33%;
	}

	.hello-column h3 {
        font-family: 'Alegreya', serif;
        font-style: normal;
        font-weight: 400;
        font-size: 48px;
        line-height: 65px;
		margin: 0;
		padding-bottom: 2rem;
		width: auto;
		border-bottom: #7D0B09 2px solid;
        color: #000000;
		display: inline-block;
		z-index: 1;
	}

	.hello-column p {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 300;
        font-size: 16px;
        line-height: 18px;
        border-top: #7D0B09 1px solid;
		margin: 0;
		padding-top: 2rem;
        color: #000000
	}

    .news-section {
        background-color: #151515;
        padding: 4rem 4rem 8rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .news-section h3 {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 700;
        font-size: 49px;
        line-height: 59px;
        text-transform: uppercase;
        text-align: center;

        color: #FFFFFF;
    }

    .what-we-study-section {
		width: 100%;
        display: flex;
        justify-content: center;
		align-items: center;
		flex-direction: column;
    }

	.what-we-study-section h3 {
        font-family: 'Alegreya', serif;
        font-style: normal;
        font-weight: 700;
        font-size: 48px;
        line-height: 65px;
        text-align: center;
        color: #000000;
		max-width: 30rem;
		margin-top: 0;
		margin-bottom: 1rem;
    }

    .what-we-study-section p {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 300;
        font-size: 15px;
        line-height: 18px;
        text-align: center;
        width: calc(1200px - 50vw);
		max-width: 100%;
		min-width: 40%;
        color: #000000;
    }

	.profiles {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		margin: 2rem;
		gap: 1rem;
		width: 100%;
		flex-wrap: wrap;
	}

	.profile {
		display: flex;
		flex-direction: column;
		max-width: 22rem;
	}

	.profile .image-container {
		height: 10rem;
		margin: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.profile h4 {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 18px;
        text-align: center;
        color: #000000;
    }

	.profile p {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 300;
        font-size: 16px;
        line-height: 18px;
        text-align: center;
		width: auto;
        color: #000000;
	}
</style>