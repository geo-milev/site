<script>
	import { onMount } from "svelte";
	import DarkModeIcon from "$lib/DarkModeIcon.svelte";
	import LightModeIcon from "$lib/LightModeIcon.svelte";
	import { tweened } from "svelte/motion";
	import { linear } from "svelte/easing";

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
