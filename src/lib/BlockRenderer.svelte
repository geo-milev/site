<script lang="ts">
	import RichText from "$lib/RichText.svelte";
	import { parseRichText } from "$lib/parseRichText";
	import SecondarySubmit from "$lib/SecondarySubmit.svelte";
	import { env } from "$env/dynamic/public";
	import BlockRenderer from "$lib/BlockRenderer.svelte";
	import Gallery from "$lib/Gallery.svelte";
	import { onMount } from "svelte";
	import DocumentViewer from "$lib/DocumentViewer.svelte";
	import { documentViewerSorts } from "$lib/documentViewerSorts.js";

	let formulaResults: Map<string, string> = new Map<string, string>()

	export let blocks;

	let loaded = false;

	onMount(() => {
		loaded = true
	})
</script>

{#each blocks as block}
	{#if block.blockType === "rich-text"}
		<RichText richText="{parseRichText(block.importantInfo)}"
				  isCentered="{block.isCentered}" />
	{/if}
	{#if block.blockType === "admission-requirements"}
		<div class="table-wrapper">
			<table>
				<thead>
				<tr>
					<td>Изява</td>
					<td>Дата</td>
					<td>Максимален брой точки</td>
					<td>Коефициент</td>
				</tr>
				</thead>
				{#each block.requirements as requirement}
					<tr>
						<td>{requirement.name}</td>
						<td>{requirement.date ? (new Date(requirement.date)).toLocaleDateString("bg-BG"): ""}</td>
						<td>{requirement.maxPoints}</td>
						<td>{requirement.coefficient}</td>
					</tr>
				{/each}
			</table>
		</div>
	{/if}
	{#if block.blockType === "table"}
		<div class="table-wrapper">
			<table>
				<thead>
					<tr>
						{#each block.head as head}
								<td>{head.header}</td>
						{/each}
					</tr>
				</thead>
				{#each block.body as row}
					<tr>
						{#each row.cells as cell}
							<td>{cell.cell}</td>
						{/each}
					</tr>
				{/each}
			</table>
		</div>
	{/if}
	{#if block.blockType === "floated-content"}
		<div class="floated-blocks-wrapper" style="flex-direction: {block.float === 'left' ? 'row': 'row-reverse'}">
			<img src="{env.PUBLIC_SERVER_URL + block.image.url}"
				 alt="{block.image.alt}"
				 loading="lazy"/>
			<div class="block-renderer">
				<BlockRenderer blocks="{block.content}"/>

			</div>
		</div>
	{/if}
	{#if block.blockType === "gallery"}
		<Gallery images="{block.images}"></Gallery>
	{/if}
	{#if block.blockType === "formula"}
		<div class="formula">
			<form method="POST" on:submit|preventDefault={async function handleSubmit(event) {
									const data = new FormData(event.target);
									const formVariables = {}
									for (let v of block.variables) {
										formVariables[v.variable] = data.get(v.variable)
									}

									import("expr-eval").then((lib) => {
										const res = lib.Parser.evaluate(block.formula, formVariables)
										formulaResults.set(block.id, res.toFixed(2))
										formulaResults = formulaResults
									});
								}}>
				<div class="variables">
					{#each block.variables as variable}
						<div class="variable-pair">
							<label for="{variable.variable}">{variable.label}</label>
							<input type="number"
								   id="{variable.variable}"
								   name="{variable.variable}"
								   required
								   min="{variable.min}"
								   max="{variable.max}"
								   step="any" />
						</div>
					{/each}
				</div>
				<SecondarySubmit text="Сметни"></SecondarySubmit>
			</form>
			{#if formulaResults.has(block.id)}
				<div class="result">
					<span class="result-text">Твоят резултат е: </span>
					<span class="result-number">{formulaResults.get(block.id)}</span>
				</div>
			{/if}
		</div>
	{/if}
	{#if block.blockType === "video"}
		<div class="video-container unfloated">
			<iframe
				class="video"
				src="{loaded ? block.video: ''}"
				title="YouTube video player"
				frameborder="0"
				loading="lazy"
				allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowfullscreen></iframe>
		</div>
	{/if}
	{#if block.blockType === "floated-video-content"}
		<div class="floated-video-content" style="flex-direction: {block.float === 'left' ? 'row': 'row-reverse'}">
			<div class="video-container">
				<iframe
					class="video"
					src="{loaded ? block.video: ''}"
					title="YouTube video player"
					frameborder="0"
					loading="lazy"
					allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					allowfullscreen></iframe>
			</div>
			<div class="block-renderer">
				<BlockRenderer blocks="{block.content}" />
			</div>
		</div>
	{/if}
	{#if block.blockType === "file-viewer"}
			<DocumentViewer documents="{block.files}" autoSelect="{block.autoSelect}"
				header="{block.title}"
				getNext="{() => { return }}"
				sort="{documentViewerSorts[block.sort]}"
				hasSearch="{block.hasSearch}"></DocumentViewer>
	{/if}
{/each}

<style>
    table {
		width: 100%;
        border-collapse: collapse;
        border: 3px solid #FFFFFF;
    }

    thead td {
        font-family: 'Alegreya', serif;
        font-style: normal;
        font-weight: 400;
        font-size: 22px;
        line-height: 33px;
        text-align: center;
        color: #000000;
    }

    td {
        padding: 1rem;
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 20px;
        text-align: center;
        color: #000000;
        border: 3px solid #000000;
    }

    .table-wrapper {
		width: 100%;
        display: flex;
		overflow-x: auto;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }

    .formula {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }

    .formula .result {
        display: flex;
        flex-direction: row;
        margin-top: 1rem;
        gap: 1rem;
        justify-content: center;
        align-items: center;
    }

    .formula .result-number {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 500;
        font-size: 28px;
        line-height: 34px;
        color: #000000;
    }

    .formula .result-text {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 400;
        font-size: 22px;
        line-height: 28px;
        color: #000000;
    }

    .formula form .variable-pair {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        max-width: 20rem;
        justify-content: flex-end;
    }

    .formula form {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
    }

    .formula form .variables {
        display: grid;
        grid-template-columns: repeat(auto-fill, 20rem);
        grid-template-rows: repeat(auto-fill, max-content);
        grid-gap: 3rem;
        width: 100%;
    }

    .formula form label {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: #000000;
    }

    .formula form input {
        width: 10rem;
    }

    .floated-blocks-wrapper {
		display: flex;
		margin-bottom: 1rem;
		margin-top: 1rem;
		width: 100%;
		flex-wrap: wrap;
		justify-content: space-around;
	}

	.floated-blocks-wrapper img {
		display: flex;
        object-fit: contain;
        width: 100%;
        max-width: 30rem;
        height: 100%;
        max-height: 30rem;
		margin: 1rem;
	}

    .floated-blocks-wrapper .block-renderer {
        display: flex;
        flex-direction: column;
        align-items: center;
		width: 50%;
    }

    .floated-video-content {
        display: flex;
		justify-content: space-around;
        flex-wrap: wrap;
        flex-direction: row;
        gap: 3rem;
		margin-top: 1rem;
		margin-bottom: 1rem;
    }

    .floated-video-content .block-renderer {
        width: 45vw;
    }

    .video-container {
        display: flex;
        position: relative;
        overflow: hidden;
        width: 40vw;
        height: 22.5vw;
		justify-content: center;
		align-items: center;
    }

	.video-container.unfloated {
		width: 50vw;
		height: 28.125vw;
	}

    .video-container iframe {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
    }

    @media only screen and (max-width: 1050px) {
        .floated-blocks-wrapper .block-renderer {
            width: 100%;
        }

        .table-wrapper table {
			width: 100%;
        }

        .formula form .variables {
            justify-content: center;
        }

        .formula form .variable-pair {
            justify-content: center;
            align-items: center;
        }

        .formula form .variable-pair label {
            text-align: center;
        }

        .formula form input {
            width: 100%;
        }

        .formula form .variables {
            grid-template-columns: repeat(auto-fill, 10rem);
        }

        .video-container, .video-container.unfloated {
            display: flex;
            position: relative;
            overflow: hidden;
            width: 90vw;
            height: 50.625vw;
        }

		.floated-video-content .block-renderer {
			width: 100%;
		}
    }
</style>
