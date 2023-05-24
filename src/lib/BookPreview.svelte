<script lang="ts">
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
		<img class="cover" src="{book.image.url}" alt="{book.image.alt}"/>
	{/if}
	<div class="content">
		<span>{book.name}</span>
		<span>{book.authors.map((val) => val.author).join(", ")}</span>
		<span>{book.year} година</span>
		<span>издателство {book.publisher.name}</span>
		{#if book.note}
			<p>{book.note}</p>
		{/if}
	</div>
</div>

<style>
	.container {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: #FFFFFF;
		padding: 1rem;
	}

	.cover {
		width: 100%;
		object-fit: contain;
	}

	.content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
		gap: 0.5rem;
	}

	p, span {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-size: 26px;
        line-height: 32px;
		color: #000000;
    }
</style>