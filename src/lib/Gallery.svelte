<script>
	import { env } from "$env/dynamic/public";
	import { tweened } from "svelte/motion";
	import { linear } from "svelte/easing";
	import ArrowLeft from "$lib/ArrowLeft.svelte";
	import ArrowRight from "$lib/ArrowRight.svelte";
	import Close from "$lib/Close.svelte";

	export let images;
	export let arrowColor;

	const imageWidth = "10rem"
	const imageHeight = "8rem"

	let selectedImageIndex = 0
	let elements = [];
	let fullscreenShown = false;

	const scrollConfig = {
		behavior: 'smooth',
		block: 'nearest',
		inline: 'center'
	}

	const transitionDuration = 250;
	let opacity = tweened(1, { duration: transitionDuration, easing: linear });

	const setSelectedImageIndex = (index) => {
		return opacity.set(0).then(() => {
				selectedImageIndex = index
				opacity.set(1);
			}
		)
	}

	const onClick = (_, index) => {
		setSelectedImageIndex(index).then(() => {
			elements[selectedImageIndex].scrollIntoView(scrollConfig)
		})
	}

	const scrollLeft = () => {
		setSelectedImageIndex(selectedImageIndex - 1).then(() => {
			elements[selectedImageIndex].scrollIntoView(scrollConfig)
		});
	}

	const scrollRight = () => {
		setSelectedImageIndex(selectedImageIndex + 1).then(() => {
			elements[selectedImageIndex].scrollIntoView(scrollConfig)
		});
	}

	const openFullscreen = () => {
		fullscreenShown = true
		document.body.classList.add("no-scroll")
	}

	const closeFullscreen = () => {
		fullscreenShown = false
		document.body.classList.remove("no-scroll")
	}
</script>

<div class="container">
	<button class="fullscreen button-reset" style="{fullscreenShown? 'display: flex': ''}"
			aria-label="затваряне на цял екран" on:click={closeFullscreen}>
		<button class="button-reset fullscreen-close"
				aria-label="затваряне на цял екран"
				on:click={closeFullscreen}>
			<Close />
		</button>
		<figure on:click={(e) => e.stopPropagation()}>
			<img class="current-image" loading="lazy"
				 src="{env.PUBLIC_SERVER_URL + images[selectedImageIndex].image.url}"
				 alt="{images[selectedImageIndex].image.alt}" style="opacity: 1;">
			<figcaption>{images[selectedImageIndex].image.alt}</figcaption>
		</figure>
	</button>

	<div class="current-image-container" style="--arrow-color: {arrowColor}">
		<button on:click={scrollLeft} aria-label="лява стрелка" class="arrow-button left big-screen" disabled="{selectedImageIndex === 0}">
			<ArrowLeft />
		</button>
		<button on:click={scrollRight} aria-label="дясна стрелка" class="arrow-button right big-screen" disabled="{selectedImageIndex === images.length - 1}">
			<ArrowRight />
		</button>
		<button aria-label="отваряне на цял екран" class="button-reset" on:click={openFullscreen}>
			<img class="current-image" loading="lazy"
				 src="{env.PUBLIC_SERVER_URL + images[selectedImageIndex].image.url}"
				 alt="{images[selectedImageIndex].image.alt}" style="opacity: {$opacity};">
		</button>
	</div>
	<div class="selector">
		<div class="previews">
			{#each images as image, index}
				<button bind:this={elements[index]}
						class="image-button"
						on:click={() => {onClick(image, index)}}
						style="--image-width: {imageWidth}; --image-height: {imageHeight}; --border: {index === selectedImageIndex ? '3px solid #7C1416': 'none'}">
					<img class="preview-image"
						 src="{env.PUBLIC_SERVER_URL + image.image.url}"
						 alt="{image.image.alt}" loading="lazy"/>
				</button>
			{/each}
		</div>
		<div class="small-screen-navigation" style="--arrow-color: {arrowColor}">
			<button on:click={scrollLeft} aria-label="лява стрелка" class="arrow-button" disabled="{selectedImageIndex === 0}">
				<ArrowLeft />
			</button>
			<button on:click={scrollRight} aria-label="дясна стрелка" class="arrow-button" disabled="{selectedImageIndex === images.length - 1}">
				<ArrowRight />
			</button>
		</div>
	</div>
</div>

<style>
	.container {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.current-image {
        object-fit: contain;
        width: 100%;
        max-width: 40rem;
        height: 100%;
        max-height: 30rem;
	}

    .image-button {
        width: var(--image-width);
        height: var(--image-height);
        border: var(--border);
        background-color: rgba(0, 0, 0, 0);
        cursor: pointer;
        flex-shrink: 0;
        margin: 0;
        padding: 0;
    }

    .preview-image {
        object-fit: cover;
        width: 100%;
        height: 100%;
    }

	.selector {
		display: flex;
		width: 100%;
		justify-content: center;
		align-items: center;
		gap: 1rem;
	}

	.previews {
		width: 100%;
        height: 100%;
		display: flex;
		flex-wrap: nowrap;
        overflow-y: hidden;
		overflow-x: auto;
		gap: 1rem;
		padding-top: 1rem;
		padding-bottom: 1rem;
        max-width: 60rem;
	}

	.current-image-container {
		position: relative;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		max-width: 60rem;
	}

    .arrow-button {
        background-color: rgba(0, 0, 0, 0);
        border: none;
        cursor: pointer;
		position: absolute;
    }

	.arrow-button.left {
		left: 0;
		top: 50%;
		transform: translateY(-50%);
	}

    .arrow-button.right {
        right: 0;
        top: 50%;
        transform: translateY(-50%);
    }

    .arrow-button {
        fill: var(--arrow-color);
    }

    .arrow-button:disabled :global(path) {
        fill: #B3B3B3;
    }

    .small-screen-navigation {
        display: none;
        width: 100%;
        justify-content: space-evenly;
        align-items: center;
    }

	.button-reset {
		border: none;
		padding: 0;
		margin: 0;
		background-color: rgba(0, 0, 0, 0);
		cursor: pointer;
	}

    .fullscreen {
        position: fixed;
		display: none;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.75);
		z-index: 5;
    }

	.fullscreen-close {
		position: absolute;
		top: 2rem;
		right: 2rem;
	}

	.fullscreen figcaption {
        font-family: 'Roboto', serif;
        font-size: 18px;
        line-height: 22px;
        color: #FFFFFF;
		text-align: start;
		overflow: auto;
	}

	.fullscreen figure {
		margin: 1rem;
	}

    .fullscreen figure img {
        cursor: auto;
    }

	.fullscreen .current-image {
        max-width: 90vw;
        max-height: 90vh;
	}

    @media only screen and (max-width: 580px) {
		.arrow-button {
			position: relative;
		}

        .big-screen {
            display: none;
        }

        .selector {
            flex-direction: column;
        }

        .small-screen-navigation {
            display: flex;
        }
    }

    @media only screen and (max-width: 800px) {
        .fullscreen .current-image {
            max-width: 100%;
			max-height: 90vh;
        }
    }
</style>
