<script lang="ts">
	import { secondaryLayout, setLayout } from "../../../lib/setLayout";
	import { getContextClient } from "@urql/svelte";
	import { classNumberNames } from "$lib/classNumberNames.js";
	import SecondaryButton from "$lib/SecondaryButton.svelte";
	import { env } from "$env/dynamic/public";
	import BookPreview from "$lib/BookPreview.svelte";
	import { onMount } from "svelte";

	setLayout(secondaryLayout)

	let client = getContextClient();

	let books = [];

	let classSelect;

	const changeBooks = () => {
		const className = classSelect.options[classSelect.selectedIndex].value

		const QUERY = `
			query($className: String!) {
				Books(where: {class: {like: $className}}, limit: 100) {
					docs {
						class
						name
						authors {
							author
						}
						year
						publisher {
							name
						}
						subject {
							name
						}
						note
						image {
							url
							alt
						}
					}
				}
			}
    	`;

		client.query(QUERY, { className }).then((res) => {
			books = res.data.Books.docs
		})
	}

	export let data;

	onMount(() => {
		changeBooks()
	})
</script>

<div class="container">
	<div class="header-container">
		<h1>Учебници за учебна {data.BooksInfo.year}</h1>
		<div class="line"></div>
	</div>
	{#if data.BooksInfo.file}
		<SecondaryButton href="{env.PUBLIC_SERVER_URL + data.BooksInfo.file.url}" text="Изтегли"></SecondaryButton>
	{/if}
	<div class="class-selector">
		<label for="classNumber">Въведи своя клас:</label>
		<select name="classNumber" id="classNumber" bind:this={classSelect} on:change={changeBooks}>
			{#each [5, 6, 7, 8, 9, 10, 11, 12] as classNumber}
				<option value="{classNumber}">{classNumberNames[classNumber - 1]}</option>
			{/each}
		</select>
	</div>
	<div class="book-container">
		{#each books as book}
			<div class="book">
				<BookPreview book="{book}"></BookPreview>
			</div>
		{/each}
	</div>
</div>

<style>
	.container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 3rem;
        margin-top: 1rem;
		gap: 1rem;
	}

    .header-container {
        display: flex;
        width: auto;
        flex-direction: column;
        align-items: center;
        margin-bottom: 2rem;
    }

    .line {
        width: 50%;
        height: 1px;
        background-color: #FFFFFF;
        margin-top: -1px;
    }

    h1 {
        font-family: 'Alegreya', serif;
        font-style: normal;
        font-weight: 700;
        font-size: 40px;
        line-height: 54px;
        text-align: center;
        border-bottom: 1px rgba(255, 255, 255, 0.31) solid;
        margin: 0;
        padding-bottom: 1rem;
        color: #FFFFFF;
    }

    .class-selector {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
		margin-top: 1rem;
    }

    select {
        display: flex;
        justify-content: space-around;
        align-items: center;
        gap: 0.5rem;
        width: 100%;
        background-color: rgba(0, 0, 0, 0);
        border: 1px solid #FFFFFF;
        color: #FFFFFF;
        font-size: 16px;
        line-height: 20px;
        font-family: 'Roboto', serif;
        font-weight: 300;
    }

    option {
        font-family: 'Roboto', serif;
        font-weight: 300;
        font-size: 16px;
        line-height: 20px;
        color: #151515;
    }

    option:disabled {
        font-family: 'Roboto', serif;
        font-weight: 300;
        font-size: 16px;
        line-height: 20px;
        color: #FFFFFF;
    }

    label {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 300;
        font-size: 20px;
        line-height: 24px;
        text-align: center;
        color: #FFFFFF;
		margin-bottom: 0.5rem;
    }

	.book-container {
		display: grid;
		grid-gap: 2rem;
		width: 100%;
        grid-template-columns: repeat(auto-fill, 20rem);
		place-content: center;
		margin-top: 1rem;
		overflow-x: hidden;
	}
</style>