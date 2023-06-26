<script>
	import { env } from "$env/dynamic/public";

	export let event;
</script>

<div class="container">
	<div class="image-title-container">
		<div class="image-container">
			<img src="{env.PUBLIC_SERVER_URL + event.image.url}" alt="{event.image.alt}" loading="lazy"/>
		</div>
		<p>{event.image.alt}</p>
	</div>
	<div class="text">
		<h2>{event.title}</h2>
		<p>{event.text}</p>
	</div>
</div>

<style>
	.container {
		display: grid;
		grid-template-columns: repeat(2, 50%);
		width: 100%;
		height: 100%;
		padding: 2px;
		box-sizing: border-box;
	}

	.image-container {
		display: flex;
		justify-content: center;
	}

	.image-title-container {
        display: flex;
        margin-right: 3rem;
		flex-direction: column;
	}

	img {
		max-width: 100%;
		object-fit: contain;
	}

	.text {
		display: flex;
		flex-direction: column;
        gap: 1rem;
        position: relative;
	}

	h2 {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 600;
        font-size: 32px;
        line-height: 39px;
        color: #FFFFFF;
		text-transform: uppercase;
        width: 100%;
        word-break: break-word;
        white-space: normal;
	}

	p {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 300;
        font-size: 16px;
        line-height: 19px;
        color: #FFFFFF;
        width: 100%;
        word-break: break-word;
        white-space: normal;
	}

    @media only screen and (max-width: 950px) {
		.container {
            gap: 2rem;
            grid-template-columns: 1fr;
            grid-auto-rows: max-content;
		}

		.image-container {
			order: 1;
			margin-right: 0;
		}

		.text {
			order: -1;
			gap: 0;
		}
    }
</style>
