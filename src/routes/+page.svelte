<script lang="ts">
    import Slideshow from "$lib/Slideshow.svelte";
	import type { Slide } from "../lib/Slideshow.svelte";
	import OvalContainer from "$lib/OvalContainer.svelte";

	let slides: Slide[] = [
		{ src: "/pexels-ezra-comeau-2387418.jpg" },
		{ src: "/pexels-francesco-ungaro-2325446.jpg", text: "Добре дошли в сайта на ППМГ \"Гео Милев\""},
		{ src: "/pexels-eberhard-grossgasteiger-1287145.jpg", text: "Вижте повече за нас", callToAction: {text: "За нас", dest: "/about-us"} }
	];
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

<OvalContainer>
	<div class="what-we-study-section">
		<h3>Какво се учи в ППМГ “Гео Милев”</h3>
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velзit esse cillum dolore eu fugiat nulla pariatur.</p>
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
</style>