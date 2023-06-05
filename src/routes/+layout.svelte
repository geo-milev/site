<script lang="ts">
	import Navbar from "$lib/Navbar.svelte";
	import Footer from "$lib/Footer.svelte";
	import { onMount, setContext } from "svelte";
	import { layout, mainLayout, setLayout } from "$lib/setLayout";
	import { cacheExchange, Client, fetchExchange, setContextClient } from "@urql/svelte";
	import { env } from "$env/dynamic/public";

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
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link
		href="https://fonts.googleapis.com/css2?family=Alegreya:wght@500&display=swap"
		rel="stylesheet"
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght,GRAD@8..144,400,45;8..144,400,50;8..144,1000,0&display=swap"
		rel="stylesheet"
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;500;700&display=swap"
		rel="stylesheet"
	/>
	{#each data.MainInfo.favicons as favicon}
		<link rel="icon" type="image/png" sizes="{favicon.size}"
			  href={env.PUBLIC_SERVER_URL + favicon.favicon.url} />
	{/each}
	<title>{data.MainInfo.name}</title>
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
