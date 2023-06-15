<script lang="ts">
	export let componentProps: unknown[];
	export let component;
	export let timelineTextProperty;

	let selectedIndex = 0;
	let carouselWidth;

	$: moveCoefficient = (componentProps.length % 2 == 0 ? -0.5: 0) +
		(-(selectedIndex - Math.floor(componentProps.length / 2)));

	let clientWidth;

	$: circleRadius = clientWidth > 675 ? 9 : 5;
	$: circleGap = clientWidth > 675 ? 5: 3;

	let touchStartX;
	let touchStartY;
	let touchEndX;
	let touchEndY;

	const onTouchStart = (e) => {
		touchStartX = e.changedTouches[0].screenX;
		touchStartY = e.changedTouches[0].screenY;
	};

	const onTouchEnd = (e) => {
		touchEndX = e.changedTouches[0].screenX;
		touchEndY = e.changedTouches[0].screenY;
		handleGesture();
	}

	function handleGesture() {
		const xChange = Math.abs(touchEndX - touchStartX);
		const yChange = Math.abs(touchEndY - touchStartY)

		if (yChange > xChange) return;

		if (touchEndX < touchStartX) {
			if (selectedIndex < componentProps.length - 1)
				selectedIndex++;
		}

		if (touchEndX > touchStartX) {
			if (selectedIndex != 0)
				selectedIndex--;
		}
	}
</script>

<svelte:window bind:innerWidth={clientWidth} />

<div class="container" style="--circle-radius: {circleRadius}rem; --circle-gap: {circleGap}rem"
	 on:touchstart|passive={onTouchStart} on:touchend|passive={onTouchEnd}>
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
	<div class="carousel" style="--move-coefficient-carousel: {selectedIndex}" bind:offsetWidth={carouselWidth}>
		{#each componentProps as props, index}
			<div class="item-container" style="--carousel-width: {carouselWidth}px">
				<svelte:component this="{component}" {...componentProps[index]}></svelte:component>
			</div>
		{/each}
	</div>
</div>

<style>
	.container {
		overflow: hidden;
		display: flex;
		flex-direction: column;
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
		margin-bottom: 3rem;
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
