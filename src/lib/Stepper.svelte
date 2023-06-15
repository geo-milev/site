<script lang="ts">

	import BlockRenderer from "$lib/BlockRenderer.svelte";

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
					<BlockRenderer blocks="{step.info}" />
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

    @media only screen and (max-width: 1050px) {
		.content-container {
			overflow-x: auto;
			margin-left: 0;
		}

		.line {
			left: calc(2rem - 8px);
		}

		.circle {
			width: calc(2rem + 14px);
            height: calc(2rem + 14px);
			border-width: 6px;
		}

		.circle span {
            font-size: 32px;
            line-height: 44px;
		}
    }
</style>
