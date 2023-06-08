<script lang="ts">
	import RichText from "$lib/RichText.svelte";
	import { parseRichText } from "$lib/parseRichText";
	import SecondarySubmit from "$lib/SecondarySubmit.svelte";
	import { env } from "$env/dynamic/public";
	import BlockRenderer from "$lib/BlockRenderer.svelte";
	import Gallery from "$lib/Gallery.svelte";

	let formulaResults: Map<string, string> = new Map<string, string>()

	export let blocks;
	export let buttonColor = "#FFFFFF";
	export let textColor = "#FFFFFF"
	export let headerLineColor = "#FFFFFF"
	export let buttonHoverTextColor = "#FFFFFF"
</script>

{#each blocks as block}
	{#if block.blockType === "rich-text"}
		<RichText richText="{parseRichText(block.importantInfo)}"
				  isCentered="{block.isCentered}"
				  buttonColor={buttonColor}
				  textColor={textColor}
				  headerLineColor={headerLineColor}
				  buttonHoverTextColor="{buttonHoverTextColor}" />
	{/if}
	{#if block.blockType === "admission-requirements"}
		<div class="table-wrapper" style="--text-color: {textColor}">
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
		<div class="table-wrapper" style="--text-color: {textColor}">
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
				<BlockRenderer blocks="{block.content}"
							   buttonColor={buttonColor}
							   textColor={textColor}
							   headerLineColor={headerLineColor}
							   buttonHoverTextColor = {buttonHoverTextColor}/>

			</div>
		</div>
	{/if}
	{#if block.blockType === "gallery"}
		<Gallery images="{block.images}"></Gallery>
	{/if}
	{#if block.blockType === "formula"}
		<div class="formula" style="--text-color: {textColor}">
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
{/each}

<style>
    table {
        table-layout: fixed;
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
        color: var(--text-color);
    }

    td {
        padding: 1rem;
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 20px;
        text-align: center;
        color: var(--text-color);
        border: 3px solid var(--text-color);
    }

    .table-wrapper {
		width: 100%;
        display: flex;
		overflow-x: auto;
    }

    .formula {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
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
        color: var(--text-color);
    }

    .formula .result-text {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 400;
        font-size: 22px;
        line-height: 28px;
        color: var(--text-color);
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
        color: var(--text-color);
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

    @media only screen and (max-width: 1050px) {
        .floated-blocks-wrapper .block-renderer {
            width: 100%;
        }

        .table-wrapper table {
            min-width: 50rem;
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
    }
</style>
