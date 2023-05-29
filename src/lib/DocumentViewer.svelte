<script lang="ts">
	import { env } from "$env/dynamic/public";
	import SecondaryButton from "$lib/SecondaryButton.svelte";

	export interface Document {
		name: string;
		file: { url: string, filename: string }
	}

	const downloadDoc = () => {
		fetch(env.PUBLIC_SERVER_URL + hoveredDocument.file.url)
			.then(res => res.blob())
			.then(blob => {
				const url = window.URL.createObjectURL(blob);
				const link = document.createElement('a');
				link.style.display = "none";
				link.href = url;
				link.download = hoveredDocument.file.filename;
				document.body.appendChild(link);
				link.click();
				window.URL.revokeObjectURL(url);
			})
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

	export let documents: Document[];
	export let getNext: (page: number) => Promise<Document[]>;
	export let header: string;
</script>

<div class="container">
	<div class="list">
		<h2>{header}</h2>
		<ul bind:this={list} on:scroll={onScrollList}>
			{#each documents as document}
				<li on:mouseenter={() => { hoveredDocument = document}}>
					<a href="{env.PUBLIC_SERVER_URL + document.file.url}" title="Отвори">{document.name}</a>
				</li>
			{/each}
		</ul>
	</div>
	{#if hoveredDocument}
		<SecondaryButton action={downloadDoc} text="Изтегли" />
	{/if}
	<div class="preview">
		{#if hoveredDocument}
			<iframe src="{env.PUBLIC_SERVER_URL + hoveredDocument.file.url}"
					title="{hoveredDocument.name}"
					referrerpolicy="no-referrer"></iframe>
		{:else}
			<p>Поставете мишката си върху елемент от списъка за да се покаже тук.</p>
		{/if}
	</div>
</div>

<style>
	.container {
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
	}

	.list {
		display: flex;
		flex-direction: column;
		margin: 3rem;
		background-color: #FFFFFF;
		max-height: 30rem;
        width: 100%;
		padding-left: 1rem;
		max-width: 30rem;
		overflow: hidden;
	}

	.list h2 {
        font-family: 'Alegreya', serif;
        font-style: normal;
        font-weight: 700;
        font-size: 32px;
        line-height: 44px;
        color: #000000;
	}

    .list ul::-webkit-scrollbar {
        width: 15px;
    }

    .list ul::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0);
    }

	.list ul::-webkit-scrollbar-thumb {
        background: #7D0B09;
        border-radius: 26px;
	}

    /* Handle on hover */
    .list ul::-webkit-scrollbar-thumb:hover {
        background: rgb(79, 13, 13);
    }

	.list ul {
        padding-left: 0;
        overflow-y: auto;
		padding-top: 0;
	}

	.list li {
		list-style: none;
        border-bottom: 1px solid #000000;
        margin: 10px 2rem 10px 0;
		padding-bottom: 8px;
		padding-top: 8px;
    }

	.list li a {
        text-decoration: none;
        color: #000000;
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 24px;
	}

	.preview {
        margin: 3rem;
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
        color: #FFFFFF;
	}
</style>