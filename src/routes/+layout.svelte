<script lang="ts">
    import Navbar from "$lib/Navbar.svelte";
	import Footer from "$lib/Footer.svelte";
	import { onMount, setContext } from "svelte";
	import { layout, mainLayout, setLayout } from "../lib/setLayout";
	import { mainInfo } from "../lib/mainInfo";

	setContext('layout', layout);
	setContext('mainInfo', mainInfo)

	setLayout(mainLayout)

	onMount(() => {
		layout.subscribe((layoutProps) => {
			window.document.body.style.backgroundColor = layoutProps.navbar.backgroundColor
		})
	})
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link
		href="https://fonts.googleapis.com/css2?family=Alegreya:wght@500&display=swap"
		rel="stylesheet"
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;500;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<Navbar fixed="{$layout.navbar.fixed}"
		title="{$mainInfo.schoolName}"
		showTitle="{$layout.navbar.showTitle}"
		logoHref="{$mainInfo.logoHref}"
		logoHrefAlt="{$mainInfo.logoHrefAlt}" />

<slot />

<Footer address="{$mainInfo.contact.address}"
		schoolName="{$mainInfo.schoolName}"
		phone="{$mainInfo.contact.principalPhone}"
		email="{$mainInfo.contact.mainEmail}"/>

<style>
    :global(body) {
        padding: 0;
        margin: 0;
		background-color: #000000;
    }
</style>