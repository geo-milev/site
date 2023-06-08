<script>
	import Carousel from "$lib/Carousel.svelte";
	import GalleryImagePreview from "$lib/GalleryImagePreview.svelte";
	import { env } from "$env/dynamic/public";
	import { tweened } from "svelte/motion";
	import { linear } from "svelte/easing";

	export let images;

	const imageWidth = "10rem"
	const imageHeight = "8rem"

	let selectedImage = images[0].image;

	const transitionDuration = 250;
	let opacity = tweened(1, { duration: transitionDuration, easing: linear });

	$: mappedImages = images.map((e) => {
		return {
			image: e.image,
			onClick: (image) => {
				opacity.set(0).then(() => {
						selectedImage = image
						opacity.set(1);
					}
				)
			},
			imageWidth,
			imageHeight
		}
	})

	$: console.log(selectedImage)
</script>

<div class="container">
	<img class="current-image" loading="lazy"
		 src="{env.PUBLIC_SERVER_URL + selectedImage.url}"
		 alt="{selectedImage.alt}" style="opacity: {$opacity};">
	<Carousel elementProps="{mappedImages}"
			  component="{GalleryImagePreview}"
			  componentHeight="{imageHeight}"
			  componentWidth="{imageWidth}"
			  arrowFill="#000000" />
</div>

<style>
	.container {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	img {
        object-fit: contain;
        width: 100%;
        max-width: 40rem;
        height: 100%;
        max-height: 40rem;
	}
</style>
