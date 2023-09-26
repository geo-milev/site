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

	const resetSeo = () => {
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

	resetSeo()

	$: if (data.seoData) {
		seoInfo.update((seo) => {
			seo.title = data.seoData.title
			seo.description = data.seoData.description
			seo.imageUrl = data.seoData.image.url
			seo.url = $page.url.href
			seo.type = undefined
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
        padding: 0;
        margin: 0;
		background-color: #000000;
    }
</style>
