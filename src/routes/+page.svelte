<script lang="ts">
    import Slideshow from "$lib/Slideshow.svelte";
	import type { Slide } from "../lib/Slideshow.svelte";

	let slides: Slide[] = [
		{ src: "/pexels-ezra-comeau-2387418.jpg" },
		{ src: "/pexels-francesco-ungaro-2325446.jpg", text: "Добре дошли в сайта на ППМГ \"Гео Милев\""},
		{ src: "/pexels-eberhard-grossgasteiger-1287145.jpg", text: "Вижте повече за нас", callToAction: {text: "За нас", dest: "/about-us"} }
	];
</script>

<Slideshow slides={slides} />
