<script lang="ts">

	import { tweened } from "svelte/motion";
	import { linear } from "svelte/easing";

	let slideSwitchIntervalMs = 3000
	const switchSlide = () => {
		darkGradientOpacity.set(1).then(() => {
				if (selectedIndex + 1 >= slides.length) {
					selectedIndex = 0;
				} else {
					selectedIndex++;
				}
				darkGradientOpacity.set(0.5);
			}
		)
	}

	const resetInterval = () => {
		clearInterval(clear)
		clear = setInterval(switchSlide, slideSwitchIntervalMs)
	}

	let clear
	let darkGradientOpacity = tweened(0.5, { duration: 250, easing: linear });
	let selectedIndex = 0;
	export let slides: string[];

	$: {
		resetInterval()
	}
</script>

<div class="slideshow-container" style="--background-url: url({slides[selectedIndex]}); --gradient-opacity: {$darkGradientOpacity}">
	<div class="dot-container">
		{#each slides as slide, i}
			<input type="radio" bind:group={selectedIndex} on:change={resetInterval} name="dots" value={i}>
		{/each}
	</div>
</div>

<style>
	.slideshow-container {
        position: relative;
		display: flex;
		justify-content: center;
		width: 100%;
		min-height: 40rem;
		background-image: linear-gradient(rgba(0, 0, 0, var(--gradient-opacity)), rgba(0, 0, 0, var(--gradient-opacity))), var(--background-url);
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
		transition: 250ms background-image ease-in-out;
	}

	.dot-container {
		display: flex;
		width: auto;
		position: absolute;
		bottom: 1rem;
		gap: 0.5rem;
	}

    input[type="radio"] {
        appearance: none;
        background-color: rgba(0, 0, 0, 0);
        margin: 0;
		padding: 0;
        width: 12px;
        height: 12px;
        border: 1px solid #FFFFFF;
        border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
    }

    input[type="radio"]::before {
        content: "";
        width: 7px;
        height: 7px;
        border-radius: 50%;
        transition: 250ms background-color ease-in-out;
    }

    input[type="radio"]:checked::before {
        background-color: #FFFFFF;
    }
</style>