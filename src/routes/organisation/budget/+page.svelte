<script lang="ts">
	import { secondaryLayout, setLayout } from "../../../lib/setLayout";
	import DocumentViewer from "$lib/DocumentViewer.svelte";
	import { onMount } from "svelte";

	setLayout(secondaryLayout)

	export let data;

	let year = data.Budget.years.sort((year1, year2) => year2.year - year1.year)[0].year

	let budgets;
	let yearlyBudgets;
	let quarterlyBudgets;

	let selectedBudgetId;

	let selectedBudget;
	let documents;

	const onYearChange = () => {
		budgets = data.Budget.years.filter((val) => val.year === year)[0].budgets
		yearlyBudgets = budgets.filter((val) => val.isYearly)
		quarterlyBudgets = budgets.filter((val) => !val.isYearly)

		selectedBudgetId = budgets[0].id
		changeSelectedBudget()
	}

	const changeSelectedBudget = () => {
		selectedBudget = budgets.filter((val) => val.id === selectedBudgetId)[0];
		documents = selectedBudget.isYearly ? [
			{
				name: "Годишен",
				file: selectedBudget.yearly
			}
		] : [
			{
				name: "Януари - Март",
				file: selectedBudget.yearlyQuarters.first
			},
			{
				name: "Април - Юни",
				file: selectedBudget.yearlyQuarters.second
			}
			,{
				name: "Юли - Септември",
				file: selectedBudget.yearlyQuarters.third
			},
			{
				name: "Октомври - Декември",
				file: selectedBudget.yearlyQuarters.fourth
			}
		].filter((val) => val.file != null)
	}

	onMount(() => {
		onYearChange()
	})
</script>

<div class="container">
	<div class="header-container">
		<h1>Бюджет</h1>
		<div class="line"></div>
	</div>
	<div class="selects">
		<label for="year">Година</label>
		<select name="year" id="year" bind:value={year} on:change={onYearChange}>
			{#each data.Budget.years as year}
				<option value="{year.year}">{year.year}</option>
			{/each}
		</select>
		<label for="year">Бюджет</label>
		{#if yearlyBudgets && quarterlyBudgets}
			<select name="classNumber" id="classNumber" bind:value={selectedBudgetId} on:change={changeSelectedBudget}>
				{#if yearlyBudgets.length > 0}
					<optgroup label="Годишни">
						{#each yearlyBudgets as budget}
							<option value="{budget.id}">Годишен: {budget.name}</option>
						{/each}
					</optgroup>
				{/if}
				{#if quarterlyBudgets.length > 0}
					<optgroup label="Тримесечни">
						{#each quarterlyBudgets as budget}
							<option value="{budget.id}">Тримесечен: {budget.name}</option>
						{/each}
					</optgroup>
				{/if}
			</select>
		{/if}
	</div>
	{#if documents}
		<DocumentViewer documents="{documents}" autoSelect="{true}"
						header="{selectedBudget.isYearly ? 'Годишен': 'Месеци'}"
						getNext="{() => { return }}"
						sort="{(documents) => documents}"
						hasSearch="{false}"></DocumentViewer>
	{/if}
</div>


<style>
	.container {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 4rem;
		margin-top: 1rem;
	}

    .header-container {
        display: flex;
        width: auto;
        flex-direction: column;
        align-items: center;
        margin-bottom: 3rem;
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

	.selects {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		max-width: 90%;
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

    select:first-child {
        flex: 0 0 80%;
    }

    select:last-child {
        flex: 0 0 20%;
    }

    option {
        font-family: 'Roboto', serif;
        font-weight: 300;
        font-size: 16px;
        line-height: 20px;
        color: #151515;
    }

	optgroup {
        font-family: 'Roboto', serif;
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
    }
</style>
