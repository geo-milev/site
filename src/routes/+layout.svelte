<script>
	import Navbar from "$lib/Navbar.svelte";
	import Footer from "$lib/Footer.svelte";
	import { onMount, setContext } from "svelte";
	import { layout, mainLayout, setLayout } from "$lib/setLayout";
	import { cacheExchange, Client, fetchExchange, setContextClient } from "@urql/svelte";
	import { env } from "$env/dynamic/public";
	import { seoInfo } from "../lib/seoInfo";
	import { page } from "$app/stores";

	setContext('layout', layout);

	setLayout(mainLayout)

	onMount(() => {
		layout.subscribe((layoutProps) => {
			window.document.body.style.backgroundColor = layoutProps.navbar.backgroundColor
		})
	})

	const client = new Client({
		url: env.PUBLIC_SERVER_URL + "/api/graphql",
		exchanges: [cacheExchange, fetchExchange],
	});

	setContextClient(client);

	export let data;

	let loaded = false;

	onMount(() => {
		loaded = true
	})

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
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	{#if loaded}
		<link
			href="https://fonts.googleapis.com/css2?family=Alegreya:wght@400;500;700&display=swap"
			rel="stylesheet"
		/>
		<link
			href="https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght,GRAD@8..144,400,45;8..144,400,50;8..144,1000,0&display=swap"
			rel="stylesheet"
		/>
		<link
			href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap"
			rel="stylesheet"
		/>
	{/if}
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
