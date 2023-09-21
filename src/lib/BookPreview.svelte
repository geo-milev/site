<script lang="ts">
	import { env } from "$env/dynamic/public";

	interface Book {
		class: string
		name: string
		authors: { author: string }[]
		year: number
		publisher: { name: string }
		subject: { name: string }
		note?: string
		image?: { url: string, alt: string }
	}

	export let book: Book;
</script>

<div class="container">
	{#if book.image}
		<img class="cover" loading="lazy" src="{env.PUBLIC_SERVER_URL + book.image.url}" alt="{book.image.alt}"/>
		{:else}
		<div class="rotated">Няма снимка</div>
	{/if}
	<div class="content">
		<h4>{book.name}</h4>
		<div class="line"></div>
		{#if book.publisher}
			<span>{book.publisher}</span>
		{/if}
		{#if book.authors}
			<span>{book.authors.map((val) => val.author).join(", ")}</span>
		{/if}
		{#if book.note}
			<span>{book.note}</span>
		{/if}
		{#if book.year}
			<span class="year">{book.year}</span>
		{/if}
	</div>
</div>

<style>
	.container {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		background-color: #FFFFFF;
		padding: 8px;
		box-sizing: border-box;
	}

	.cover {
		width: 100%;
		max-height: 20rem;
		object-fit: contain;
	}

	.rotated {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 20rem;
		text-transform: uppercase;
		font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 400;
        font-size: 40px;
        line-height: 45px;
        color: #D9D9D9;
		transform: rotate(-45deg);
		user-select: none;
    }

	.content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        width: 100%;
		gap: 0.5rem;
        margin: 1rem 2px 2px;
    }

	.line {
		width: 50%;
		height: 1px;
		background-color: #000000;
	}

	h4 {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 23px;
        color: #000000;
		text-align: center;
		margin: 0;
		width: 100%;
    }

	span {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: #000000;
    }

	.year {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 19px;
		text-align: end;
        color: #000000;
		width: 100%;
	}
</style>
