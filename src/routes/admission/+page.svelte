<script lang="ts">
	import { secondaryLayout, setLayout } from "../../lib/setLayout";
	import SecondaryButton from "$lib/SecondaryButton.svelte";
	import RichText from "$lib/RichText.svelte";
	import { parseRichText } from "$lib/parseRichText.js";
	import Stepper from "$lib/Stepper.svelte";

	setLayout(secondaryLayout)

	export let data;

	let activeGrade = data.admission.grades[0]
</script>

<div class="container">
	<div class="header-container">
		<h1>Прием</h1>
		<div class="line"></div>
	</div>
	<div class="select-buttons">
		{#each data.admission.grades as grade}
			<SecondaryButton active={grade.grade === activeGrade.grade}
							 action="{() => {
								 activeGrade = grade
							 }}"
							 text="{grade.grade}"></SecondaryButton>
		{/each}
	</div>
	<div class="content">
		<RichText richText="{parseRichText(activeGrade.importantInfo)}" isCentered="{true}" />
		<Stepper steps="{activeGrade.steps}"></Stepper>
		<RichText richText="{parseRichText(activeGrade.bonusInfo)}" isCentered="{true}" />
	</div>
</div>

<style>

	:global(.content-button button) {
        margin: 0;
	}

    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 3rem;
        gap: 1rem;
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

	.select-buttons :global(button) {
        min-width: 10rem;
	}

    @supports not (font-variation-settings: 'GRAD' 150) {
        .select-buttons :global(button:active)  {
            font-weight: 600;
        }
    }

	.content {
		display: flex;
		width: 90%;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		gap: 2rem;
	}

    @media only screen and (max-width: 750px) {
		.container {
			padding-left: 0;
			padding-right: 0;
		}

        .content {
            width: 100%;
        }
    }
</style>
