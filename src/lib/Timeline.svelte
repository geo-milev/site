<script lang="ts">
	export let componentProps: unknown[];
	export let component;
	export let timelineTextProperty;

	let selectedIndex = 0;

	$: moveCoefficient = (componentProps.length % 2 == 0 ? 0.5 : 1) *
		(-(selectedIndex - Math.floor(componentProps.length / 2)));
</script>

<div class="container">
	<div class="carousel" style="--move-coefficient-carousel: {-100 * selectedIndex}%">
		{#each componentProps as props, index}
			<svelte:component this="{component}" {...componentProps[index]}></svelte:component>
		{/each}
	</div>
	<div class="timeline">
		<div class="line"></div>
		<div class="circles" style="--move-coefficient: {moveCoefficient}">
			{#each componentProps as props, index}
				<button on:click={() => {selectedIndex = index}} class="circle">
					<span>{props.event[timelineTextProperty]}</span>
				</button>
			{/each}
		</div>
	</div>
</div>

<style>
	.container {
		overflow: hidden;
	}

	.carousel {
		display: flex;
        position: relative;
        flex-wrap: nowrap;
        transition: transform 300ms ease-out;
        transform: translateX(calc(var(--move-coefficient-carousel)));
	}

	.timeline {
		display: flex;
		width: 100%;
		flex-direction: row;
		justify-content: center;
		position: relative;
		overflow: hidden;
		margin-top: 3rem;
	}

	.line {
        width: 100%;
		display: block;
		background-color: #D9D9D9;
		height: 6px;
		position: absolute;
        top: 50%;
        transform: translateY(-50%);
	}

	.circles {
		display: flex;
		flex-direction: row;
		gap: 5rem;
		transition: transform 300ms ease-out;
        transform: translateX(calc(9rem * var(--move-coefficient) + 5rem * var(--move-coefficient)));
	}

	.circle {
		display: flex;
		height: 9rem;
		width: 9rem;
        border-radius: 50%;
        background-color: #D9D9D9;
		justify-content: center;
		align-items: center;
		z-index: 1;
        border: none;
        padding: 0;
        cursor: pointer;
	}
</style>