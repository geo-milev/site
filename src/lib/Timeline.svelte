<script lang="ts">
	export let componentProps: unknown[];
	export let component;
	export let timelineTextProperty;

	let selectedIndex = 0;
	let carouselWidth;

	$: moveCoefficient = (componentProps.length % 2 == 0 ? 0.5 : 1) *
		(-(selectedIndex - Math.floor(componentProps.length / 2)));

	let clientWidth;

	$: circleRadius = clientWidth > 675 ? 9 : 5;
	$: circleGap = clientWidth > 675 ? 5: 3;
</script>

<svelte:window bind:innerWidth={clientWidth} />

<div class="container" style="--circle-radius: {circleRadius}rem; --circle-gap: {circleGap}rem">
	<div class="carousel" style="--move-coefficient-carousel: {selectedIndex}" bind:offsetWidth={carouselWidth}>
		{#each componentProps as props, index}
			<div class="item-container" style="--carousel-width: {carouselWidth}px">
				<svelte:component this="{component}" {...componentProps[index]}></svelte:component>
			</div>
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
		gap: 8px;
        transition: transform 300ms ease-out;
        transform: translateX(calc(-100% * var(--move-coefficient-carousel) - 8px * var(--move-coefficient-carousel)));
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
		gap: var(--circle-gap);
		transition: transform 300ms ease-out;
        transform: translateX(calc(var(--circle-radius) * var(--move-coefficient) + var(--circle-gap) * var(--move-coefficient)));
	}

	.circle {
		display: flex;
		height: var(--circle-radius);
		width: var(--circle-radius);
        border-radius: 50%;
        background-color: #D9D9D9;
		justify-content: center;
		align-items: center;
		z-index: 1;
        border: none;
        padding: 0;
        cursor: pointer;
	}

	.item-container {
		width: var(--carousel-width);
		flex-shrink: 0;
		position: relative;
		overflow-x: hidden;
	}
</style>