<script lang="ts">
	import SecondaryButton from "$lib/SecondaryButton.svelte";
	import { env } from "$env/dynamic/public";

	export let project;
</script>

<div class="container">
	<img src="{env.PUBLIC_SERVER_URL + project.image.url}" alt="{project.image.alt}">
	<div class="content">
		<div class="header-container">
			<h2>{project.name}</h2>
			<div class="line"></div>
		</div>
		<p>{project.description}</p>
		{#if project.article}
			<SecondaryButton href="news/{project.article.id}" text="Виж още" color="#7C1416" />
		{/if}
	</div>

</div>

<style>
	.container {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
        background-color: #FFFFFF;
		gap: 1rem;
	}

	img {
		width: 140%;
		object-fit: cover;
	}

	.content {
		display: flex;
		flex-direction: column;
        width: 160%;
		padding-top: 1rem;
		padding-bottom: 1rem;
		gap: 0.5rem;
	}

	.content p {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: #000000;
    }

    h2 {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 700;
        font-size: 40px;
        line-height: 47px;
        text-align: start;
        color: #000000;
		margin: 0;
        padding-bottom: 1rem;
        border-bottom: #FFFFFF 2px solid;
    }

    .header-container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
		padding: 0;
    }

    .line {
        width: 100%;
		padding-left: 1rem;
		padding-right: 1rem;
		box-sizing: border-box;
        height: 1px;
        background-color: rgba(255, 255, 255, 0.31);
        margin-top: -1px;
    }

    @media only screen and (max-width: 640px) {
		.container {
			flex-direction: column;
		}

		img {
			width: 100%;
		}

		.content {
			width: 100%;
			padding-left: 2rem;
			padding-right: 2rem;
			box-sizing: border-box;
		}

		h2 {
			padding-bottom: 0.5rem;
		}

		p {
			margin-top: 0;
		}
    }
</style>