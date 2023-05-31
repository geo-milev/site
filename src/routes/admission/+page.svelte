<script lang="ts">
	import { secondaryLayout, setLayout } from "../../lib/setLayout";
	import SecondaryButton from "$lib/SecondaryButton.svelte";

	setLayout(secondaryLayout)

	export let data;

	console.log(data)
</script>

<div class="container">
	<div class="header-container">
		<h1>Прием</h1>
		<div class="line"></div>
	</div>
	<div class="select-buttons">
		{#each data.admission.grades as grade}
			<SecondaryButton action="{() => {}}" text="{grade.grade}"></SecondaryButton>
		{/each}
	</div>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 3rem;
        gap: 3rem;
        padding-left: 2rem;
        padding-right: 2rem;
    }

    h1 {
        font-family: 'Alegreya', serif;
        font-style: normal;
        font-weight: 700;
        font-size: 40px;
        line-height: 54px;
        text-align: center;
        color: #FFFFFF;
        max-width: 30rem;
        margin-bottom: 0;
        padding-bottom: 2rem;
        border-bottom: #FFFFFF 2px solid;
    }

    .header-container {
        display: flex;
        width: auto;
        flex-direction: column;
        align-items: center;
        margin-bottom: 1rem;
    }

    .line {
        width: 20rem;
        height: 1px;
        background-color: rgba(255, 255, 255, 0.31);
        margin-top: -1px;
    }

	.select-buttons {
		display: flex;
		flex-direction: row;
	}

    .select-buttons :global(button:active) {

    }
</style>
