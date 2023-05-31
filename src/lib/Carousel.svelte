<script lang="ts">
	import ArrowLeft from "$lib/ArrowLeft.svelte";
	import ArrowRight from "$lib/ArrowRight.svelte";
	import { onMount } from "svelte";

	let groups: unknown[][] = [];
	let groupSize = 4;

	let carousel;
	let lastGroupItem;

	let carouselWidth;
	let previewWidth;

	let groupElements = [];
	let selectedGroupIndex = 0;

	export let elementProps: unknown[];
	export let component;
	export let componentHeight;
	export let componentWidth;

	const scrollConfig: ScrollIntoViewOptions = {
		behavior: 'smooth',
		block: 'nearest',
		inline: 'center'
	}

	const scrollLeft = () => {
		if (selectedGroupIndex > 0) {
			groupElements[selectedGroupIndex - 1].scrollIntoView(scrollConfig)
		}
	}

	const scrollRight = () => {
		if (selectedGroupIndex + 1 < groupElements.length) {
			groupElements[selectedGroupIndex + 1].scrollIntoView(scrollConfig)
		}
	}

	const updateSelectedGroupIndex = () => {
		if (groupElements && carousel) {
			let newIndex = findSelectedGroupIndex()

			if (selectedGroupIndex == newIndex) return;

			selectedGroupIndex = newIndex
		}
	}

	const findSelectedGroupIndex = () => {
		let carouselRect = carousel.getBoundingClientRect()
		let biggestGroupShownIndex = 0;
		let biggestGroupShownWidth = 0;
		for (let i = 0; i < groupElements.length; i++) {
			let groupRect = groupElements[i].getBoundingClientRect()
			// If the group is fully within the viewable part of the carousel, return early
			if (groupRect.left > 0 && groupRect.right <= carouselRect.right + 10) {
				return i;
			}

			let width;
			if (groupRect.left <= carouselRect.left && groupRect.right >= carouselRect.left) {
				width = groupRect.right - carouselRect.left;
			} else if (groupRect.left >= carouselRect.left && groupRect.right >= carouselRect.right) {
				width = carouselRect.right - groupRect.left;
			} else {
				continue;
			}

			if (width >= biggestGroupShownWidth) {
				biggestGroupShownWidth = width;
				biggestGroupShownIndex = i;
			}
		}

		return biggestGroupShownIndex;
	}

	const updateGroups = () => {
		if (carouselWidth && previewWidth) {
			let newGroupSize = Math.floor(carouselWidth / previewWidth);
			if (newGroupSize != groupSize)  {
				groupSize = newGroupSize;
			} else return;
		}

		let newGroups = [];

		for (let i = 0; i < elementProps.length; i+= groupSize) {
			let group: unknown[] = [];
			for (let j = i; j < i + groupSize && j < elementProps.length; j++) {
				group.push(elementProps[j])
			}
			newGroups.push(group)
		}

		groups = newGroups;
	}

	onMount(() => {
		updateGroups();
	})

	$: {
		groupElements;
		if (groupElements) {
			groupElements = groupElements.filter((e) => e != null)
		}
	}

	$: {
		if (lastGroupItem && carousel && carouselWidth && previewWidth && carouselWidth > previewWidth ) {
			let lastGroupItemRect = lastGroupItem.getBoundingClientRect()
			let carouselRect = carousel.getBoundingClientRect()

			if (lastGroupItemRect.right > carouselRect.right ||
				carouselRect.right - groupSize * lastGroupItemRect.width > lastGroupItemRect.width) {
				updateGroups()
			}

			if (groupElements && groupElements[selectedGroupIndex] && groupElements[selectedGroupIndex][0]) {
				groupElements[selectedGroupIndex][0].scrollIntoView(scrollConfig)
			}
		}
	}
</script>

<div class="container" style="--component-width: {componentWidth}; --component-height: {componentHeight};">
	<button on:click={scrollLeft} class="arrow-button big-screen" disabled="{selectedGroupIndex === 0}">
		<ArrowLeft />
	</button>
	<div class="carousel" bind:clientWidth={carouselWidth} bind:this={carousel} on:scroll={updateSelectedGroupIndex}>
		{#each groups as group, i}
			<div class="group"
				 style="--group-width: {carouselWidth}px"
				 class:non-full="{group.length !== groupSize}"
				 bind:this={groupElements[i]}
				>
				{#each group as element, j}
					<!-- bind:clientWidth is a costly operation, so it is best done on a single element
					 Unfortunately, there are no conditional binds in svelte, so the only way to achieve that is through this ugly block-->
					{#if i === selectedGroupIndex && j === group.length - 1}
						<div class="element-preview"
							 bind:offsetWidth="{previewWidth}"
							 bind:this={lastGroupItem}>
							<svelte:component this="{component}" {...element} />
						</div>
						{:else}
						<div class="element-preview">
							<svelte:component this="{component}" {...element} />
						</div>
					{/if}
				{/each}
			</div>
		{/each}
	</div>
	<button on:click={scrollRight} class="arrow-button big-screen" disabled="{selectedGroupIndex === groups.length - 1}">
		<ArrowRight />
	</button>
	<div class="small-screen-navigation">
		<button on:click={scrollLeft} class="arrow-button" disabled="{selectedGroupIndex === 0}">
			<ArrowLeft />
		</button>
		<button on:click={scrollRight} class="arrow-button" disabled="{selectedGroupIndex === groups.length - 1}">
			<ArrowRight />
		</button>
	</div>
</div>

<style>
	.container {
		display: flex;
		width: 100%;
		justify-content: space-around;
		align-items: center;
		flex-shrink: 0;
	}

	.small-screen-navigation {
		display: none;
		width: 100%;
		margin-top: 1rem;
		justify-content: space-evenly;
		align-items: center;
	}

    @media only screen and (max-width: 580px) {
		.big-screen {
			display: none;
		}

		.container {
			flex-direction: column;
		}

		.small-screen-navigation {
			display: flex;
		}
    }

    .container :global(svg) {
        flex-shrink: 0;
    }

	.carousel {
		width: 100%;
		display: flex;
		overflow-x: scroll;
        scroll-snap-type: x mandatory;
        scroll-behavior: smooth;
        -webkit-overflow-scrolling: touch;
		scrollbar-width: none;
		margin: 1rem;
		min-width: 16rem;
	}

    .carousel::-webkit-scrollbar {
        display: none;
    }

	.group {
		display: flex;
		justify-content: space-evenly;
		flex-grow: 0;
        flex-shrink: 0;
		width: auto;
		height: auto;
        flex-basis: var(--group-width);
		scroll-snap-align: start;
        scroll-snap-stop: always;
	}

	.non-full {
        justify-content: flex-start;
	}

	.element-preview {
		display: flex;
		height: var(--component-height);
		width: var(--component-width);
		padding-left: 1rem;
		padding-right: 1rem;
	}

	.arrow-button {
		background-color: rgba(0, 0, 0, 0);
		border: none;
		cursor: pointer;
	}

	.arrow-button {
        fill: #FFFFFF;
	}

    .arrow-button:disabled :global(path) {
        fill: #B3B3B3;
    }
</style>