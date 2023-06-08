<script>
	import { env } from "$env/dynamic/public";
	import { tweened } from "svelte/motion";
	import { linear } from "svelte/easing";
	import ArrowLeft from "$lib/ArrowLeft.svelte";
	import ArrowRight from "$lib/ArrowRight.svelte";

	export let images;

	const imageWidth = "10rem"
	const imageHeight = "8rem"

	let selectedImageIndex = 0
	let elements = [];

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
		setSelectedImageIndex(index)
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
</script>

<div class="container">
	<img class="current-image" loading="lazy"
		 src="{env.PUBLIC_SERVER_URL + images[selectedImageIndex].image.url}"
		 alt="{images[selectedImageIndex].image.alt}" style="opacity: {$opacity};">
	<div class="selector">
		<button on:click={scrollLeft} class="arrow-button big-screen" disabled="{selectedImageIndex === 0}">
			<ArrowLeft />
		</button>
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
		<button on:click={scrollRight} class="arrow-button big-screen" disabled="{selectedImageIndex === images.length - 1}">
			<ArrowRight />
		</button>
		<div class="small-screen-navigation">
			<button on:click={scrollLeft} class="arrow-button" disabled="{selectedImageIndex === 0}">
				<ArrowLeft />
			</button>
			<button on:click={scrollRight} class="arrow-button" disabled="{selectedImageIndex === images.length - 1}">
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
        max-height: 40rem;
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
        max-height: 60rem;
	}

    .arrow-button {
        background-color: rgba(0, 0, 0, 0);
        border: none;
        cursor: pointer;
    }

    .arrow-button {
        fill: #000000;
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

    @media only screen and (max-width: 580px) {
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
</style>
