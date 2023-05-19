<script>
	import { PUBLIC_IMAGE_ENDPOINT } from "$env/static/public";

	export let event;
</script>

<div class="container">
	<div class="image-container">
		<img src="{PUBLIC_IMAGE_ENDPOINT + event.image.url}" alt="{event.image.alt}"/>
	</div>
	<div class="text">
		<h2>{event.title}</h2>
		<p>{event.text}</p>
	</div>
</div>

<style>
	.container {
		width: 100%;
		display: flex;
        flex-shrink: 0;
		min-height: 25rem;
	}

	.image-container {
		width: 100%;
		display: flex;
		justify-content: center;
	}

	img {
		max-width: 75%;
		object-fit: contain;
	}

	.text {
		width: 125%;
		display: flex;
		flex-direction: column;
        gap: 1rem;
	}

	h2 {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 600;
        font-size: 32px;
        line-height: 39px;
        color: #FFFFFF;
		text-transform: uppercase;
	}

	p {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 300;
        font-size: 16px;
        line-height: 19px;
        color: #FFFFFF;
	}
</style>