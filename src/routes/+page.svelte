<script lang="ts">
    import Slideshow from "$lib/Slideshow.svelte";
	import type { Slide } from "../lib/Slideshow.svelte";
	import OvalContainer from "$lib/OvalContainer.svelte";
	import ArticlePreview from "$lib/ArticlePreview.svelte";
	import Carousel from "$lib/Carousel.svelte";
	import Button from "$lib/Button.svelte";
	import { mainLayout, setLayout } from "../lib/setLayout"
	import { env } from "$env/dynamic/public";
	import { onMount } from "svelte";

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

	let articleProps = data.allNews.docs.map((article) => {
		return {
			preview: article
		}
	})

	let loaded = false

	onMount(() => {
		loaded = true
	})
</script>

<Slideshow slides={slides}>
	<div class="social-media">
		{#each data.Contact.socialMedia as socialMedia }
			<a class="floating-action-button"
			   title="{socialMedia.socialMediaTitle}"
			   href="{socialMedia.link}" target="_blank">
				<img src="{socialMedia.icon.url}" alt="{socialMedia.icon.alt}" loading="lazy">
			</a>
		{/each}
	</div>
</Slideshow>

<div class="oval-container">
	<OvalContainer>
		<div class="hello-section">
			<div class="video-column">
					<iframe
						class="video"
						src="{loaded ? data.VideoSection.video: ''}"
						title="YouTube video player"
						frameborder="0"
						loading="lazy"
						allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						allowfullscreen></iframe>
			</div>
			<div class="hello-column">
				<h2>{data.VideoSection.header}</h2>
				<p>{data.VideoSection.text}</p>
			</div>
		</div>
	</OvalContainer>
</div>

<div class="news-section">
	<h2>Новини</h2>
	<Carousel elementProps="{articleProps}" component="{ArticlePreview}" componentHeight="24rem" componentWidth="17rem"/>
</div>

<div class="oval-container">
	<OvalContainer>
		<div class="what-we-study-section">
			<h2>{data.WhatIsStudied.header}</h2>
			<p>{data.WhatIsStudied.text}</p>
			<div class="profiles">
				{#each profiles as profile}
					<div class="profile">
						<div class="image-container">
							<img src="{profile.imgSrc}" alt="{profile.name}" loading="lazy"/>
						</div>
						<h3>{profile.name}</h3>
						<p>{profile.description}</p>
					</div>
				{/each}
			</div>
			<Button href="/about-us" text="Виж още"></Button>
		</div>
	</OvalContainer>
</div>

<style>
	.hello-section {
		width: 100%;
        display: grid;
        grid-gap: 5rem;
        grid-template-columns: repeat(2, 1fr);
        place-content: center;
        margin-top: 1rem;
	}

    @media only screen and (max-width: 1050px) {
        .hello-column {
			order: -1;
		}

		.video-column {
			order: 1;
		}

		.hello-section {
			grid-gap: 2rem;
			grid-template-columns: 1fr;
            grid-auto-rows: max-content;
		}

		.what-we-study-section {
			padding-bottom: 3rem;
		}
    }

    @media only screen and (max-width: 580px) {
		.news-section {
			padding-left: 2rem !important;
			padding-right: 2rem !important;
		}
    }

	.oval-container {
		--background: var(--main-primary);
	}

	.hello-column {
		width: 100%;
	}

	.hello-column h2 {
        font-family: 'Alegreya', serif;
        font-style: normal;
        font-weight: 400;
        font-size: 48px;
        line-height: 65px;
		margin: 0;
		padding-bottom: 2rem;
		width: auto;
		border-bottom: var(--primary) 2px solid;
        color: var(--main-primary-text);
		display: inline-block;
		z-index: 1;
	}

	.hello-column p {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 300;
        font-size: 16px;
        line-height: 18px;
        border-top: var(--primary) 1px solid;
		margin: 0;
		padding-top: 2rem;
        color: var(--main-primary-text);
	}

    .news-section {
        background-color: var(--main-secondary);
        padding: 4rem 4rem 8rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
		--background: var(--main-primary);
		--background-text: var(--main-primary-text)
    }

    .news-section h2 {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 700;
        font-size: 49px;
        line-height: 59px;
        text-transform: uppercase;
        text-align: center;
        color: var(--main-secondary-text);
    }

	.news-section :global(.arrow-button path) {
		fill: var(--main-secondary-text)
	}

    .news-section :global(.arrow-button:disabled path) {
        fill: var(--main-secondary-disabled)
    }

    .what-we-study-section {
		width: 100%;
        display: flex;
        justify-content: center;
		align-items: center;
		flex-direction: column;
    }

	.what-we-study-section h2 {
        font-family: 'Alegreya', serif;
        font-style: normal;
        font-weight: 700;
        font-size: 48px;
        line-height: 65px;
        text-align: center;
        color: var(--main-primary-text);
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
        color: var(--main-primary-text);
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

	.profile h3 {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 18px;
        text-align: center;
        color: var(--main-primary-text);
    }

	.profile p {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 300;
        font-size: 16px;
        line-height: 18px;
        text-align: center;
		width: auto;
        color: var(--main-primary-text);
	}

    .video-column {
		display: flex;
        position: relative;
		overflow: hidden;
        width: 100%;
		height: auto;
        padding-top: 56.25%;
    }

    .video {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
    }

	.social-media {
		position: absolute;
		right: 1rem;
		bottom: 3.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.social-media .floating-action-button {
		border: none;
		background-color: var(--primary);
		border-radius: 50%;
		width: 48px;
		height: 48px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.social-media .floating-action-button img {
		max-height: 24px;
		max-width: 24px;
	}
</style>
