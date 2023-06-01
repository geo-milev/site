<script lang="ts">
	import RichText from "$lib/RichText.svelte";
	import { parseRichText } from "$lib/parseRichText";
	import SecondarySubmit from "$lib/SecondarySubmit.svelte";

	let formulaResults: Map<string, string> = new Map<string, string>()

	export let steps;
</script>

<div class="container">
	<div class="line"></div>
	<div class="step-container">
		{#each steps as step}
			<div class="step">
				<div class="circle">
					<span>{step.stepNumber}</span>
				</div>
				<div class="content-container">
					{#each step.info as block}
						{#if block.blockType === "rich-text"}
							<RichText richText="{parseRichText(block.importantInfo)}" isCentered="{block.isCentered}" />
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
													   max="{variable.max}"/>
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
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.container {
		display: flex;
        width: 100%;
		flex-direction: column;
		position: relative;
	}

	.line {
		height: 100%;
		width: 10px;
		position: absolute;
		left: calc(4rem - 5px);
		top: 5px;
        background-color: #FFFFFF;
    }

	.step-container {
        display: flex;
        flex-direction: column;
        position: relative;
	}

	.circle {
		width: calc(6rem + 10px);
		height: calc(6rem + 10px);
		background-color: #4F0D0D;
        border: 12px solid #FCFCFC;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
        flex-shrink: 0;
	}

	.circle span {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 700;
        font-size: 96px;
        line-height: 116px;
        color: #FFFFFF;
	}

	.step {
		width: 100%;
		display: flex;
	}

	.content-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-left: 1rem;
		position: relative;
	}

    table {
        table-layout: fixed;
        width: 75%;
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
        color: #FFFFFF;
    }

    td {
        padding: 1rem;
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 20px;
        text-align: center;
        color: #FFFFFF;
        border: 3px solid #FFFFFF;
    }

    .table-wrapper {
        width: 100%;
        display: flex;
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
        color: #FFFFFF;
	}

    .formula .result-text {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 400;
        font-size: 22px;
        line-height: 28px;
        color: #FFFFFF;
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
        color: #FFFFFF;
    }

    .formula form input {
		width: 10rem;
    }

    @media only screen and (max-width: 1070px) {
        .table-wrapper table {
            width: 100%;
        }
    }

    @media only screen and (max-width: 750px) {
		.content-container {
			overflow-x: auto;
		}

		.table-wrapper table {
            min-width: 50rem;
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

		.line {
			left: calc(2rem - 5px);
		}

		.circle {
			width: calc(2rem + 10px);
            height: calc(2rem + 10px);
		}

		.circle span {
            font-size: 32px;
            line-height: 44px;
		}

        .formula form input {
            width: 100%;
        }

        .formula form .variables {
            grid-template-columns: repeat(auto-fill, 10rem);
        }
    }
</style>
