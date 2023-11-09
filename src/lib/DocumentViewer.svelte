<script lang="ts">
	import { env } from "$env/dynamic/public";
	import { fade } from "svelte/transition";
	import { documentViewerSorts } from "./documentViewerSorts";

	export interface Document {
		name: string;
		file: { url: string, filename: string }
	}

	let page = 1;
	let isRequestingNext = false;

	const onScrollList = () => {
		if (Math.abs(list.scrollHeight - list.scrollTop - list.clientHeight) < 1 && !isRequestingNext) {
			page += 1;
			isRequestingNext = true;
			getNext(page).then(res => {
				documents = [...documents, ...res]
				isRequestingNext = false;
			})
		}
	}

	let hoveredDocument: Document;
	let list;

	$:  {
		if (typeof filteredDocuments !== 'undefined') {
			if (autoSelect) {
				hoveredDocument = filteredDocuments[0]
			} else {
				hoveredDocument = undefined
			}
		}
	}

	export let documents: Document[];
	export let getNext: (page: number) => Promise<Document[]>;
	export let header: string;
	export let autoSelect = false;
	export let hasSearch = true;
	export let sort: (documents: Document[]) => Document[] = documentViewerSorts.alphabetical

	let filteredDocuments = sort(documents)

	$: filteredDocuments = sort(documents)

	let searchValue;

	if (searchValue && searchValue != "") {
		search(searchValue)
	}

	const search = (value) => {
		if (value === "") {
			filteredDocuments = sort(documents)
			return
		}

		const options = {
			keys: [
				"name"
			]
		};

		import("fuse.js").then((Fuse: { default: never }) => {
			const fuse = new Fuse.default(documents, options);

			filteredDocuments = fuse.search(value).map((doc) => doc.item)
		})
	}

	$: if (filteredDocuments.indexOf(hoveredDocument) == -1) {
		hoveredDocument = undefined
	}

	$: if (autoSelect && documents && filteredDocuments && filteredDocuments.length > 0) {
		hoveredDocument = filteredDocuments[0]
	}
</script>

<div class="container">
	<div class="list">
		<h2>{header}</h2>
		{#if hasSearch && documents.length !== 0}
			<label for="search" hidden>Търсене</label>
			<input type="search" id="search" name="search" class="search" placeholder="Търси..."
				   on:input={(event) => { search(event.target.value )}} bind:value={searchValue}>
		{/if}
		{#if filteredDocuments.length !== 0}
			<ul bind:this={list} on:scroll={onScrollList}>
				{#each filteredDocuments as document}
					<li on:mouseenter={() => { hoveredDocument = document}}
						class:selected={hoveredDocument ? (hoveredDocument.file.url === document.file.url) : false}>
						<a href="{env.PUBLIC_SERVER_URL + document.file.url}" title="Отвори">{document.name}</a>
					</li>
				{/each}
			</ul>
		{/if}
		{#if documents.length === 0}
			<p>Странно... тук няма нищо.</p>
		{:else}
			{#if filteredDocuments.length === 0}
				<p>Няма елементи, които да отговарят на условията.</p>
			{/if}
		{/if}
	</div>
	<div class="preview">
		{#if hoveredDocument}
			<iframe src="{env.PUBLIC_SERVER_URL + hoveredDocument.file.url}"
					title="{hoveredDocument.name}"
					referrerpolicy="no-referrer"
					in:fade={{ duration: 300 }} out:fade={{ duration: 100 }}></iframe>
		{:else}
			<p>Поставете мишката си върху елемент от списъка за да се покаже тук.</p>
		{/if}
	</div>
</div>

<style>
	.container {
		display: flex;
		width: 100%;
		justify-content: space-around;
		align-items: center;
		flex-wrap: wrap;
		margin-top: 2rem;
	}

	.list {
		display: flex;
		flex-direction: column;
		margin: 1rem;
		background-color: var(--secondary);
		max-height: 30rem;
        width: 100%;
		padding-left: 1rem;
		max-width: 30rem;
		overflow: hidden;
		border: 1px var(--background-accent) solid;
	}

	.list h2 {
        font-family: 'Alegreya', serif;
        font-style: normal;
        font-weight: 700;
        font-size: 32px;
        line-height: 44px;
        color: var(--secondary-text);
		padding-right: 1rem;
	}

	.list .search {
		margin-right: 3rem;
		border: none;
        border-bottom: 1px solid var(--secondary-text);
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
		background-color: var(--secondary);
		color: var(--secondary-text);
	}

	.list .search:focus {
        border-color: var(--secondary-accent);
	}

    .list ul::-webkit-scrollbar {
        width: 15px;
    }

    .list ul::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0);
    }

	.list ul::-webkit-scrollbar-thumb {
        background: var(--secondary-accent);
        border-radius: 26px;
	}

    /* Handle on hover */
    .list ul::-webkit-scrollbar-thumb:hover {
        background: var(--primary-dark);
    }

	.list ul {
        padding-left: 0;
        overflow-y: auto;
		padding-top: 0;
	}

	.list li {
		list-style: none;
        border-bottom: 1px solid var(--secondary-text);
        margin: 10px 2rem 10px 0;
		padding-bottom: 8px;
		padding-top: 8px;
    }

	.list li.selected {
        border-color: var(--secondary-accent);
	}

	.list li.selected a {
        color: var(--secondary-accent);
	}

	.list li a {
        text-decoration: none;
        color: var(--secondary-text);
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 24px;
		width: 100%;
		display: inline-block;
	}

	.preview {
        margin: 1rem;
        width: 100%;
		max-width: 40rem;
    }

	.preview iframe {
        min-height: 30rem;
		width: 100%;
	}

	.preview p {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 300;
        font-size: 26px;
        line-height: 33px;
        text-align: center;
        color: var(--background-text);
	}

	.list p {
        color: var(--secondary-text);
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
	}
</style>
