<script lang="ts">
    import Slideshow from "$lib/Slideshow.svelte";
	import type { Slide } from "../../lib/Slideshow.svelte";
	import OvalContainer from "$lib/OvalContainer.svelte";
	import ArticlePreview from "$lib/ArticlePreview.svelte";
	import NewsCarousel from "$lib/NewsCarousel.svelte";

	let slides: Slide[] = [
		{ src: "/pexels-ezra-comeau-2387418.jpg" },
		{ src: "/pexels-francesco-ungaro-2325446.jpg", text: "Добре дошли в сайта на ППМГ \"Гео Милев\""},
		{ src: "/pexels-eberhard-grossgasteiger-1287145.jpg", text: "Вижте повече за нас", callToAction: {text: "За нас", dest: "/about-us"} }
	];

	let articles: ArticlePreview[] = Array(9).fill({ title: "Заглавие",
			description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
			imgSrc: "/pexels-eberhard-grossgasteiger-1287145.jpg",
			href: "/about-us",
			date: new Date() })
</script>

<Slideshow slides={slides} />

<OvalContainer>
	<div class="hello-section">
		<div class="video-column">
			<iframe
				width="560"
				height="315"
				src="https://www.youtube-nocookie.com/embed/eMf3qqGoIMM"
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowfullscreen></iframe>
		</div>
		<div class="hello-column">
			<h3>Здравейте</h3>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velзit esse cillum dolore eu fugiat nulla pariatur.</p>
		</div>
	</div>
</OvalContainer>

<div class="news-section">
	<h3>Новини</h3>
	<NewsCarousel articles="{articles}"/>
</div>

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
        padding: 4rem 4rem;
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
</style>