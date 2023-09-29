<script>
	import { setLayout, tertiaryLayout } from "$lib/setLayout";
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
		seoInfo.publishDate = data.News.publishDate

		return seoInfo
	})

	let mode = "light"

	const changeMode = (newMode) => {
		mode = newMode
		if (mode === "dark") {
			document.body.classList.add("dark");
		} else {
			document.body.classList.remove("dark");
		}
	}

	onMount(() => {
		const savedMode = localStorage.getItem("mode");
		if (savedMode === "light" || savedMode === "dark") {
			changeMode(savedMode)
		} else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			mode = "dark"
			document.body.classList.add("dark");
		}
	})

	let darkModeButtonOpacity = tweened(1, { duration: 150, easing: linear });

	const setMode = (newMode) => {
		darkModeButtonOpacity.set(0).then(() => {
				changeMode(newMode)
				localStorage.setItem("mode", newMode);
				darkModeButtonOpacity.set(1);
			}
		)
	}
</script>

<div class="article-content" class:dark={mode === "dark"}>
	<div class="top-container">
		<div class="header-container">
			<h1>{data.News.title}</h1>
		</div>
		<div class="description">
			<p>{data.News.description}</p>
		</div>
	</div>
	{#if data.News.postImage}
		<img src="{env.PUBLIC_SERVER_URL + data.News.postImage.url}" alt="{data.News.postImage.alt}" loading="lazy" />
	{/if}
	<BlockRenderer blocks="{data.News.content}" />
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
    .article-content {
		--background: var(--news-background);
        --background-text: var(--news-background-text);
        --secondary: var(--news-primary);
        --secondary-text: var(--news-primary-text);
		--primary: var(--news-primary);
		--accent: var(--news-accent);
        --primary-dark: var(--news-primary-dark);
        --primary-dark-text: var(--news-primary-dark-text);
        --primary-text: var(--news-primary-text);
        --primary-semi-transparent: rgba(124, 20, 22, 0.33);
        --secondary-light-text: var(--news-secondary-light-text);
        --primary-disabled: var(--news-primary-disabled);
        --background-disabled: var(--background-disabled);
	}

    .dark {
        --primary: var(--background-text);
        --secondary: var(--background-text);
        --secondary-text: var(--background);
		--accent: var(--background-text);
    }

    .article-content :global(.document-viewer .container) {
        --secondary: var(--background);
        --secondary-text: var(--background-text);
		--primary: var(--accent);
    }

    .article-content h1 {
        font-family: 'Alegreya', serif;
        font-style: normal;
        font-weight: 400;
        color: var(--background-text);
        border-bottom: 2px var(--primary) solid;
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
        border-bottom: 1px var(--primary-semi-transparent) solid;
        width: auto;
	}

    .article-content img {
        object-fit: contain;
        width: 100%;
        max-width: 50rem;
        height: 100%;
        max-height: 25rem;
    }

    .article-content {
        color: var(--background-text);
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
		background-color: var(--primary);
		margin: 0;
		padding: 0;
		border: none;
		fill: var(--primary-text);
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
