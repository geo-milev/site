<script>
	import { setLayout, tertiaryLayout, tertiaryLayoutDark } from "$lib/setLayout";
	import { env } from "$env/dynamic/public";
	import BlockRenderer from "$lib/BlockRenderer.svelte";
	import { seoInfo } from "$lib/seoInfo";
	import { onMount } from "svelte";
	import DarkModeIcon from "$lib/DarkModeIcon.svelte";
	import LightModeIcon from "$lib/LightModeIcon.svelte";
	import { tweened } from "svelte/motion";
	import { linear } from "svelte/easing";

	setLayout(tertiaryLayout)

	export let data;

	seoInfo.update(seoInfo => {
		seoInfo.title = data.News.title
		seoInfo.description = data.News.description
		seoInfo.type = "article"
		seoInfo.imageUrl = data.News.postImage.url
		seoInfo.publishDate = data.News.publishDate

		return seoInfo
	})

	let mode = "light"
	let buttonColor
	let textColor
	let buttonHoverTextColor
	let documentViewerBackgroundColor
	let documentViewerHoverColor
	let documentViewerTextColor
	let documentViewerTextColorNegative

	onMount(() => {
		const savedMode = localStorage.getItem("mode");
		if (savedMode === "light" || savedMode === "dark") {
			mode = savedMode
		} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			mode = "dark"
		}
	})

	let darkModeButtonOpacity = tweened(1, { duration: 150, easing: linear });

	const setMode = (newMode) => {
		darkModeButtonOpacity.set(0).then(() => {
				mode = newMode
				localStorage.setItem("mode", newMode);
				darkModeButtonOpacity.set(1);
			}
		)
	}

	$: if (mode === "light") {
		textColor = "#000000"
		buttonColor = "#7D0B09"
		buttonHoverTextColor = "#FFFFFF";
		documentViewerBackgroundColor = "#FFFFFF"
		documentViewerHoverColor = "#7d0b09"
		documentViewerTextColor = "#000000"
		documentViewerTextColorNegative = "#000000"
		setLayout(tertiaryLayout)
	} else {
		textColor = "#FFFFFF"
		buttonColor = "#FFFFFF"
		buttonHoverTextColor = "#000000";
		documentViewerBackgroundColor = "#000000"
		documentViewerHoverColor = "#FFFFFF"
		documentViewerTextColor = "#FFFFFF"
		documentViewerTextColorNegative = "#FFFFFF"
		setLayout(tertiaryLayoutDark)
	}
</script>

<div class="article-content" style="--text-color: {textColor}">
	<div class="top-container">
		<div class="header-container">
			<h1>{data.News.title}</h1>
		</div>
		<div class="description">
			<p>{data.News.description}</p>
		</div>
	</div>
	<img src="{env.PUBLIC_SERVER_URL + data.News.postImage.url}" alt="{data.News.postImage.alt}"/>
	<BlockRenderer blocks="{data.News.content}"
				   buttonColor={buttonColor}
				   textColor={textColor}
				   headerLineColor="#7D0B09"
				   buttonHoverTextColor={buttonHoverTextColor}
				   documentViewerBackgroundColor ={documentViewerBackgroundColor}
				   documentViewerHoverColor ={documentViewerHoverColor}
				   documentViewerTextColor = {documentViewerTextColor}
				   documentViewerTextColorNegative = {documentViewerTextColorNegative}
	/>
</div>

<button on:click={() => (mode === "light") ? setMode("dark") : setMode("light")}
		title="Смени цветови режим на {(mode === 'light') ? 'тъмен' : 'светъл'}"
		class="theme-button">
	<span class="container" style="opacity: {$darkModeButtonOpacity}">
		{#if mode === "light"}
			<DarkModeIcon />
		{:else}
			<LightModeIcon />
		{/if}
	</span>
</button>

<style>
    .article-content h1 {
        font-family: 'Alegreya', serif;
        font-style: normal;
        font-weight: 400;
        color: var(--text-color);
        border-bottom: 2px #7d0b09 solid;
        margin: 0;
        padding: 1rem;
		text-align: center;
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
        width: 100%;
        max-width: 50rem;
        height: 100%;
        max-height: 50rem;
    }

    .article-content {
        color: var(--text-color);
        display: flex;
        flex-direction: column;
        margin-left: 3rem;
        margin-right: 3rem;
        justify-content: center;
        align-items: center;
        margin-bottom: 5rem;
		gap: 1rem;
    }

	.article-content p {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 300;
        font-size: 19px;
        line-height: 23px;
        text-align: center;
	}

	.top-container {
		display: flex;
		flex-direction: column;
        max-width: min(50rem, 100%);
        justify-content: center;
        align-items: center;
	}

    @media only screen and (max-width: 740px) {
		.article-content {
			margin-left: 1rem;
			margin-right: 1rem;
		}
    }

	.theme-button {
		position: fixed;
		bottom: 12px;
		right: 12px;
		z-index: 2;
		height: 48px;
		width: 48px;
		background-color: #7d0b09;
		margin: 0;
		padding: 0;
		border: none;
		fill: #FFFFFF;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
	}

	.theme-button .container {
		width: 36px;
		height: 36px;
	}
</style>
