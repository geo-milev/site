<script lang="ts">
	import { tweened } from "svelte/motion";
	import { linear } from "svelte/easing";
	import { fade } from "svelte/transition";
	import Button from "$lib/Button.svelte";

	export type Slide = {
		src: string;
		text?: string;
		callToAction?: CallToAction;
	}

	export type CallToAction = {
		text: string;
		dest: string;
	}

	let slideSwitchIntervalMs = 4000

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

	const transitionDuration = 250;

	let clear
	let darkGradientOpacity = tweened(0.5, { duration: transitionDuration, easing: linear });
	let selectedIndex = 0;
	export let slides: Slide[];

	$: {
		resetInterval()
	}

	let touchStartX;
	let touchStartY;
	let touchEndX;
	let touchEndY;

	const onTouchStart = (e) => {
		touchStartX = e.changedTouches[0].screenX;
		touchStartY = e.changedTouches[0].screenY;
	};

	const onTouchEnd = (e) => {
		touchEndX = e.changedTouches[0].screenX;
		touchEndY = e.changedTouches[0].screenY;
		handleGesture();
	}

	function handleGesture() {
		const xChange = Math.abs(touchEndX - touchStartX);
		const yChange = Math.abs(touchEndY - touchStartY)

		if (yChange > xChange) return;

		resetInterval()

		if (touchEndX < touchStartX) {
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

		if (touchEndX > touchStartX) {
			darkGradientOpacity.set(1).then(() => {
					if (selectedIndex - 1 < 0) {
						selectedIndex = slides.length - 1;
					} else {
						selectedIndex--;
					}
					darkGradientOpacity.set(0.5);
				}
			)
		}
	}
</script>

<div class="slideshow-container" on:touchstart={onTouchStart} on:touchend={onTouchEnd}>
	<div class="slideshow-background"
		 style="--background-url: url({slides[selectedIndex].src}); --gradient-opacity: {$darkGradientOpacity}; --transition-duration: {transitionDuration}ms"></div>
	<div class="content-container">
		{#if slides[selectedIndex].text}
			<h2 in:fade={{ duration: transitionDuration }} out:fade={{ duration: transitionDuration }}>{slides[selectedIndex].text}</h2>
		{/if}
		{#if slides[selectedIndex].callToAction &&
			slides[selectedIndex].callToAction.dest &&
			slides[selectedIndex].callToAction.text}
			<div in:fade={{ duration: transitionDuration }} out:fade={{ duration: transitionDuration }}>
				<Button href="{slides[selectedIndex].callToAction.dest}"
						text="{slides[selectedIndex].callToAction.text}" />
			</div>
		{/if}
		<div class="dot-container">
			{#each slides as slide, i}
				<input type="radio" bind:group={selectedIndex} on:change={resetInterval} name="dots" value={i}>
			{/each}
		</div>
	</div>
</div>

<style>
	.slideshow-container {
        position: relative;
		display: flex;
		justify-content: center;
		width: 100%;
		min-height: 100vh;
	}

	.slideshow-background {
        background-image: linear-gradient(rgba(0, 0, 0, var(--gradient-opacity)), rgba(0, 0, 0, var(--gradient-opacity))), var(--background-url);
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        transition: var(--transition-duration) background-image ease-in-out;
		position: absolute;
		width: 100%;
		height: 100%;
	}

	.content-container {
        display: flex;
		flex-direction: column;
        position: absolute;
		justify-content: center;
		align-items: center;
        width: auto;
		height: auto;
		bottom: 5rem;
        gap: 2rem;
	}

	.dot-container {
        display: flex;
        width: auto;
        position: relative;
		bottom: 0;
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
        transition: var(--transition-duration) background-color ease-in-out;
    }

    input[type="radio"]:checked::before {
        background-color: #FFFFFF;
    }

	h2 {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        text-transform: uppercase;
        line-height: 33px;
        text-align: center;
		margin-bottom: 0;

        color: #FFFFFF;
	}
</style>
