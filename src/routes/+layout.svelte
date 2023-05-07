<script lang="ts">
    import Navbar from "$lib/Navbar.svelte";
	import Footer from "$lib/Footer.svelte";
	import { onMount, setContext } from "svelte";
	import { layout, mainLayout, setLayout } from "../lib/setLayout";

	let address = "Августа Траяна 42, Стара Загора, 6000"
	let schoolName = "Профилирана природоматематическа гимназия \"Гео Милев\""
	let phone = "0899999999"
	let email = "mgto@abv.bg"

	setContext('layout', layout);

	mainLayout.navbar.title = schoolName

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

<Navbar fixed="{$layout.navbar.fixed}" title="{$layout.navbar.title}" />

<slot />

<Footer address="{address}" schoolName="{schoolName}" phone="{phone}" email="{email}"/>

<style>
    :global(body) {
        padding: 0;
        margin: 0;
		background-color: #000000;
    }
</style>