<script>
	import Button from "$lib/Button.svelte";

	export let title;
	export let description;
	export let imgSrc;
	export let href;
</script>

<div class="container">
	<div class="preview-image" style="--preview-img: url({imgSrc});"></div>
	<div class="content">
		<div class="text">
			<h4>{title}</h4>
			<p>{description}</p>
		</div>
		<div class="button"><Button href="{href}" text="Виж още" /></div>
	</div>
</div>

<style>
	.container {
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
        position: relative;
		display: flex;
		flex-direction: column;
	}

	.preview-image {
		background-image: var(--preview-img);
		background-size: cover;
		height: 150%;
	}

	.content {
		display: flex;
		padding: 1rem;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
	}

	h4 {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 24px;
        margin: 0 0 0.5rem;

        color: #000000
	}

	p {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 400;
        font-size: 15px;
        line-height: 18px;
		margin: 0;
        color: #000000;
	}
</style>