<script lang="ts">
	import { secondaryLayout, setLayout } from "../../../lib/setLayout";
	import DocumentViewer from "$lib/DocumentViewer.svelte";
	import { getContextClient } from "@urql/svelte";

	setLayout(secondaryLayout)

	let client = getContextClient();

	const getNext = (page: number) => {
		const QUERY = `query($page: Int!) {
							AdministrativeServicesInfos(page: $page, limit: 15) {
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

		return client.query(QUERY, { page: page }).then(res => res.data.AdministrativeServicesInfos.docs);
	}

	export let data;
</script>

<div class="container">
	<div class="header-container">
		<h1>Административни услуги</h1>
		<div class="line"></div>
	</div>
	<DocumentViewer documents="{data.AdministrativeServicesInfos.docs}"
					header="Имена на административни услуги"
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
        background-color: rgba(255, 255, 255, 0.31);
        margin-top: -1px;
    }

    h1 {
        font-family: 'Alegreya', serif;
        font-style: normal;
        font-weight: 700;
        font-size: 40px;
        line-height: 54px;
        text-align: center;
        border-bottom: 2px #FFFFFF solid;
        margin: 0;
        padding-bottom: 1rem;
        color: #FFFFFF;
    }
</style>