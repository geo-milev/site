<script>
	import { env } from "$env/dynamic/public";

	export let image;
	export let imageWidth;
	export let imageHeight;
	export let onClick;
</script>

<button class="image" on:click={() => {onClick(image)}} style="--image-width: {imageWidth}; --image-height: {imageHeight}">
	<img src="{env.PUBLIC_SERVER_URL + image.url}" alt="{image.alt}" loading="lazy"/>
</button>

<style>
	.image {
		width: var(--image-width);
		height: var(--image-height);
		border: none;
		background-color: rgba(0, 0, 0, 0);
        cursor: pointer;
	}

	img {
		object-fit: cover;
		width: 100%;
		height: 100%;
	}
</style>
