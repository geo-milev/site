<script lang="ts">
	import { env } from "$env/dynamic/public";
	import Button from "$lib/Button.svelte";

	export let project;
</script>

<div class="container">
	{#if project.image}
		<img src="{env.PUBLIC_SERVER_URL + project.image.url}" alt="{project.image.alt}" loading="lazy">
	{/if}
	<div class="content {project.image? '': 'no-image'}">
		<div class="header-container">
			<h2>{project.name}</h2>
			<div class="line"></div>
		</div>
		<p>{project.description}</p>
		{#if project.article}
			<div class="button">
				<Button href="news/{project.article.id}" text="Виж още" />
			</div>
		{/if}
	</div>

</div>

<style>
	.button {
		--primary: var(--secondary-text);
		--primary-text: var(--secondary);
	}

	.container {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
        background-color: var(--secondary);
		gap: 1rem;
		margin-right: 1rem;
	}

	img {
		width: 40%;
		object-fit: cover;
	}

	.content {
		display: flex;
		flex-direction: column;
        width: 60%;
		padding-top: 1rem;
		padding-bottom: 1rem;
		gap: 0.5rem;
		padding-right: 1rem;
	}

    .content.no-image {
		width: 100%;
		padding: 1rem;
		justify-content: center;
		align-items: center;
	}

	.content p {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: var(--secondary-text);
    }

    h2 {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 700;
        font-size: 40px;
        line-height: 47px;
        text-align: start;
        color: var(--secondary-text);
		margin: 0;
        padding-bottom: 1rem;
        border-bottom: var(--secondary) 2px solid;
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
        background-color: var(--primary-semi-transparent);
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
