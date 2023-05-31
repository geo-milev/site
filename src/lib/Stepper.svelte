<script lang="ts">
	import RichText from "$lib/RichText.svelte";
	import { parseRichText } from "$lib/parseRichText";

	let formulaResults: Map<string, string> = new Map<string, string>()

	export let steps;
</script>

<div class="container">
	<div class="line"></div>
	<div class="step-container">
		{#each steps as step}
			<div class="circle">
				<span>{step.stepNumber}</span>
			</div>
			<div class="content-container">
				{#each step.info as block}
					{#if block.blockType === "rich-text"}
						<RichText richText="{parseRichText(block.importantInfo)}" isCentered="{block.isCentered}" />
					{/if}
					{#if block.blockType === "admission-requirements"}
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
								{#each block.variables as variable}
									<label for="{variable.variable}">{variable.label}</label>
									<input type="number"
										   id="{variable.variable}"
										   name="{variable.variable}"
										   required
										   min="{variable.min}"
										   max="{variable.max}"/>
								{/each}
								<input type="submit" value="Сметни" />
							</form>
							{#if formulaResults.has(block.id)}
								<span>Твоят резултат е: </span>
								<span>{formulaResults.get(block.id)}</span>
							{/if}
						</div>
					{/if}
				{/each}
			</div>
		{/each}
	</div>
</div>
