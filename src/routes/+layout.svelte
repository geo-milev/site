<script>
	import Navbar from "$lib/Navbar.svelte";
	import Footer from "$lib/Footer.svelte";
	import { onMount, setContext } from "svelte";
	import { layout, mainLayout, setLayout } from "$lib/setLayout";
	import { cacheExchange, Client, fetchExchange, setContextClient } from "@urql/svelte";
	import { env } from "$env/dynamic/public";
	import { seoInfo } from "../lib/seoInfo";
	import { page } from "$app/stores";
	import { logo } from "$lib/logo";

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

		logo.set(data.MainInfo.logo)

		layout.subscribe((layoutProps) => {
			window.document.body.style.backgroundColor = layoutProps.navbar.backgroundColor
		})
	})

	const client = new Client({
		url: env.PUBLIC_SERVER_URL + "/api/graphql",
		exchanges: [cacheExchange, fetchExchange],
	});

	setContextClient(client);

  seoInfo.set({
		title: data.MainInfo.name,
		description: undefined,
		url: $page.url.href,
		siteName: data.MainInfo.name,
		imageUrl: undefined,
		type: undefined,
		publishDate: undefined
	})

	$: if (data.seoData) {
		seoInfo.update((seoInfo) => {
			seoInfo.title = data.seoData.title
			seoInfo.description = data.seoData.description
			seoInfo.imageUrl = data.seoData.image.url
			seoInfo.url = $page.url.href
			seoInfo.type = undefined
			seoInfo.publishDate = undefined

			return seoInfo
		})
	} else {
		if (!$page.url.pathname.startsWith("/news/")) {
			seoInfo.set({
				title: data.MainInfo.name,
				description: undefined,
				url: $page.url.href,
				siteName: data.MainInfo.name,
				imageUrl: undefined,
				type: undefined,
				publishDate: undefined
			})
		}
	}
</script>

<svelte:head>
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
        --background: #4F0D0D;
        --secondary: #FFFFFF;
        --accent: #FFFFFF;
        --primary-text: #FFFFFF;
        --background-text: #FFFFFF;
        --secondary-text: #000000;
        --primary-semi-transparent: rgba(255, 255, 255, 0.31);
        --secondary-light-text: #D9D9D9;
        --primary-disabled: #B3B3B3;
        --background-disabled: #B3B3B3;

        --main-background: #000000;
        --main-secondary: #FFFFFF;
        --main-accent: #7d0b09;
        --main-background-text: #FFFFFF;
        --main-secondary-text: #000000;
        --main-primary-semi-transparent: rgba(255, 255, 255, 0.31);
        --main-secondary-light-text: #D9D9D9;
        --main-primary-disabled: #000000;
        --main-background-disabled: #B3B3B3;

        --news-secondary: #7d0b09;
        --news-accent: #7d0b09;
        --news-secondary-text: #FFFFFF;
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
        --news-background: #121212;
        --news-background-text: #FFFFFF;
    }
</style>
