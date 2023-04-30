<script lang="ts">
	import ArticlePreview from "./ArticlePreview.svelte";
	import ArrowLeft from "$lib/ArrowLeft.svelte";
	import ArrowRight from "$lib/ArrowRight.svelte";
	import { onMount } from "svelte";

	let articleGroups: ArticlePreview[][] = [];
	let groupSize = 4;

	let carousel;
	let lastGroupItem;

	let carouselWidth;
	let previewWidth;

	let groupElements = [];
	let selectedGroupIndex = 0;

	export let articles: ArticlePreview[];

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

	const updateArticleGroups = () => {
		if (carouselWidth && previewWidth) {
			let newGroupSize = Math.floor(carouselWidth / previewWidth);
			if (newGroupSize != groupSize)  {
				groupSize = newGroupSize;
			} else return;
		}

		let newGroups = [];

		for (let i = 0; i < articles.length; i+= groupSize) {
			let group: ArticlePreview[] = [];
			for (let j = i; j < i + groupSize && j < articles.length; j++) {
				group.push(articles[j])
			}
			newGroups.push(group)
		}

		articleGroups = newGroups;

		// Scroll to beginning when updating article groups to avoid jitter
		// This should only happen when resizing screen from the non-first group
		// It is not a perfect solution, but probably the best one
		if (groupElements[0]) {
			groupElements[0].scrollIntoView(scrollConfig)
		}
	}

	onMount(() => {
		updateArticleGroups();
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
				updateArticleGroups()
			}
		}
	}
</script>

<div class="container">
	<button on:click={scrollLeft} class="arrow-button" disabled="{selectedGroupIndex === 0}">
		<ArrowLeft />
	</button>
	<div class="carousel" bind:clientWidth={carouselWidth} bind:this={carousel} on:scroll={updateSelectedGroupIndex}>
		{#each articleGroups as group, i}
			<div class="group"
				 style="--group-width: {carouselWidth}px"
				 class:non-full="{group.length !== groupSize}"
				 bind:this={groupElements[i]}
				>
				{#each group as article, j}
					<!-- bind:clientWidth is a costly operation, so it is best done on a single element
					 Unfortunately, there are no conditional binds in svelte, so the only way to achieve that is through this ugly block-->
					{#if i === selectedGroupIndex && j === group.length - 1}
						<div class="article-preview"
							 bind:offsetWidth="{previewWidth}"
							 bind:this={lastGroupItem}>
							<ArticlePreview title="{article.title}"
											description="{article.description}"
											imgSrc="{article.imgSrc}"
											href="{article.href}"/>
						</div>
						{:else}
						<div class="article-preview">
							<ArticlePreview title="{article.title}"
											description="{article.description}"
											imgSrc="{article.imgSrc}"
											href="{article.href}"/>
						</div>
					{/if}
				{/each}
			</div>
		{/each}
	</div>
	<button on:click={scrollRight} class="arrow-button" disabled="{selectedGroupIndex === articleGroups.length - 1}">
		<ArrowRight />
	</button>
</div>

<style>
	.container {
		display: flex;
		width: 100%;
		justify-content: space-around;
		align-items: center;
		flex-shrink: 0;
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

	.article-preview {
		display: flex;
		height: 23rem;
		width: 16rem;
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