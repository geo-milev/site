<script>
	import Navbar from "$lib/Navbar.svelte";
	import Footer from "$lib/Footer.svelte";
	import { onMount, setContext } from "svelte";
	import { layout, mainLayout, setLayout } from "$lib/setLayout";
	import { cacheExchange, Client, fetchExchange, setContextClient } from "@urql/svelte";
	import { env } from "$env/dynamic/public";
	import { seoInfo } from "../lib/seoInfo";
	import ThemeChangeButton from "$lib/ThemeChangeButton.svelte";
	import { seoAutofillImage } from "$lib/seoAutofillImage";

	setContext('layout', layout);

	setLayout(mainLayout)

	export let data;

	onMount(() => {
		import('@fontsource/roboto/100.css');
		import('@fontsource/roboto/300.css');
		import('@fontsource/roboto/400.css');
		import('@fontsource/roboto/500.css');
		import('@fontsource/roboto/100-italic.css');
		import('@fontsource/roboto/300-italic.css');
		import('@fontsource/roboto/400-italic.css');
		import('@fontsource/roboto/500-italic.css');
		import('@fontsource-variable/roboto-flex/full.css');
		import('@fontsource/alegreya/400.css');
		import('@fontsource/alegreya/500.css');
		import('@fontsource/alegreya/700.css');

		seoAutofillImage.set(data.MainInfo.seoAutofillImage)

		layout.subscribe((layoutProps) => {
			window.document.body.style.backgroundColor = layoutProps.navbar.backgroundColor
		})
	})

	const client = new Client({
		url: env.PUBLIC_SERVER_URL + "/api/graphql",
		exchanges: [cacheExchange, fetchExchange],
	});

	setContextClient(client);

	const resetSeo = () => {
		seoInfo.set({
			title: data.MainInfo.name,
			description: data.MainInfo.name,
			url: data.href,
			siteName: data.MainInfo.name,
			imageUrl: data.MainInfo.seoAutofillImage.url,
			type: "website",
			publishDate: undefined
		})
	}

	resetSeo()

	$: if (data.seoData) {
		seoInfo.update((seo) => {
			seo.title = data.seoData.title
			seo.description = data.seoData.description
			seo.imageUrl = data.seoData.image ? data.seoData.image.url: data.MainInfo.seoAutofillImage.url
			seo.url = data.href
			seo.type = "website"
			seo.publishDate = undefined

			if (data.pathname.startsWith("/news/")) {
				seo.type = "article"
				seo.publishDate = data.seoData.lastUpdate
			}

			return seo
		})
	} else {
		resetSeo()
	}
</script>

<svelte:head>
	<link rel="icon" type="image/x-icon" href="/favicon.ico">
	{#each data.MainInfo.favicons as favicon}
		<link rel="icon" type="image/png" sizes="{favicon.size}"
			  href={env.PUBLIC_SERVER_URL + favicon.favicon.url} />
	{/each}
	<link href="/news/feed" rel="alternate" type="application/rss+xml" title="RSS 2.0" />
	<meta property="og:title" content="{$seoInfo.title}" />
	<meta property="og:url" content="{$seoInfo.url}" />
	<meta property="og:locale" content="bg_BG" />
	<meta property="og:site_name" content='{$seoInfo.siteName}' />
	<title>{$seoInfo.title}</title>
	{#if $seoInfo.description}
		<meta name="description" content="{$seoInfo.description}">
		<meta property="og:description" content="{$seoInfo.description}" />
	{/if}
	{#if $seoInfo.imageUrl}
		<meta property="og:image" content="{env.PUBLIC_SERVER_URL + $seoInfo.imageUrl}" />
	{/if}
	{#if $seoInfo.type}
		<meta property="og:type" content="{$seoInfo.type}" />
	{/if}
	{#if $seoInfo.publishDate}
		<meta property="article:published_time" content="{$seoInfo.publishDate}" />
	{/if}
</svelte:head>

<Navbar fixed="{$layout.navbar.fixed}"
		title="{data.MainInfo.name}"
		showTitle="{$layout.navbar.showTitle}"
		logoHref="{env.PUBLIC_SERVER_URL + data.MainInfo.logo.url}"
		logoHrefAlt="{data.MainInfo.logo.alt}"
		logoWidth="{data.MainInfo.logo.width}" />

<slot />

{#if $layout.themeSwitchShown}
	<ThemeChangeButton />
{/if}

<Footer address="{data.Contact.locationInfo.address}"
		schoolName="{data.MainInfo.name}"
		phone="{data.Contact.phones.principalPhone}"
		email="{data.Contact.emails.mainEmail}"
		logoHref="{env.PUBLIC_SERVER_URL + data.MainInfo.logo.url}"
		logoHrefAlt="{data.MainInfo.logo.alt}" />

<style>
    :global(body) {
        --primary: #7d0b09;
        --primary-dark: #4F0D0D;
        --primary-dark-text: #FFFFFF;
        --background: #FFFFFF;
        --secondary: #e5e5e5;
		--background-accent: #7d0b09;
        --secondary-accent: #7d0b09;
        --primary-text: #FFFFFF;
        --background-text: #000000;
        --secondary-text: #000000;
        --primary-semi-transparent: rgba(126, 104, 104, 0.31);
        --secondary-light-text: #D9D9D9;
        --primary-disabled: #B3B3B3;
        --background-disabled: #B3B3B3;

        --main-background: #000000;
        --main-secondary: #FFFFFF;
        --main-background-accent: #7d0b09;
        --main-secondary-accent: #000000;
        --main-background-text: #FFFFFF;
        --main-secondary-text: #000000;
        --main-primary-semi-transparent: rgba(255, 255, 255, 0.31);
        --main-secondary-light-text: #D9D9D9;
        --main-primary-disabled: #000000;
        --main-background-disabled: #B3B3B3;

        --news-secondary: #FFFFFF;
        --news-background-accent: #7d0b09;
        --news-secondary-accent: #7d0b09;
        --news-secondary-text: #000000;
        --news-primary-semi-transparent: rgba(124, 20, 22, 0.33);;
        --news-secondary-light-text: #D9D9D9;
        --news-primary-disabled: #B3B3B3;
        --news-background-disabled: #B3B3B3;
        --news-background: #FFFFFF;
        --news-background-text: #000000;

        --black: #000000;
        --white: #FFFFFF;

        padding: 0;
        margin: 0;
        background-color: var(--black);
    }

    :global(body.dark) {
        --news-secondary: #121212;
        --news-secondary-text: #FFFFFF;
        --news-background: #121212;
        --news-background-text: #FFFFFF;
        --news-background-accent: #FFFFFF;
        --news-secondary-accent: #cb1712;
        --news-primary-semi-transparent: rgba(124, 20, 22, 0.33);;
        --news-secondary-light-text: #D9D9D9;
        --news-primary-disabled: #B3B3B3;
        --news-background-disabled: #B3B3B3;

        --background: #4F0D0D;
        --secondary: #FFFFFF;
        --background-text: #FFFFFF;
        --background-accent: #FFFFFF;
        --secondary-accent: #7d0b09;
        --secondary-text: #000000;
        --primary-semi-transparent: rgba(255, 255, 255, 0.31);
        --secondary-light-text: #D9D9D9;
        --primary-disabled: #B3B3B3;
        --background-disabled: #B3B3B3;
    }
</style>
