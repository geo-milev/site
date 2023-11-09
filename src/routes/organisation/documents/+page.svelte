<script lang="ts">
	import { secondaryLayout, setLayout } from "../../../lib/setLayout";
	import DocumentViewer from "$lib/DocumentViewer.svelte";
	import { getContextClient } from "@urql/svelte";

	setLayout(secondaryLayout)

	let client = getContextClient();

	const getNext = (page: number) => {
		if (!hasNext) return new Promise(() => [])
		const QUERY = `query($page: Int!) {
							Documents(page: $page, limit: 15) {
								docs {
									name
									file {
										url
										filename
									}
								}
								hasNextPage
							}
						}`;

		return client.query(QUERY, { page: page }).then(res => {
			hasNext = res.data.Documents.hasNextPage
			return res.data.Documents.docs
		});
	}

	export let data;

	let hasNext = data.Documents.hasNextPage;
</script>

<div class="container">
	<div class="header-container">
		<h1>Документи</h1>
		<div class="line"></div>
	</div>
	<DocumentViewer documents="{data.Documents.docs}"
					header="Имена на документи"
					getNext="{getNext}"></DocumentViewer>
</div>


<style>
	.container {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 3rem;
		margin-top: 1rem;
	}

    .header-container {
        display: flex;
        width: auto;
        flex-direction: column;
        align-items: center;
    }

    .line {
        width: 20rem;
        height: 1px;
        background-color: var(--primary-semi-transparent);
        margin-top: -1px;
    }

    h1 {
        font-family: 'Alegreya', serif;
        font-style: normal;
        font-weight: 700;
        font-size: 40px;
        line-height: 54px;
        text-align: center;
        border-bottom: 2px var(--background-text) solid;
        margin: 0;
        padding-bottom: 1rem;
        color: var(--background-text);
    }
</style>
