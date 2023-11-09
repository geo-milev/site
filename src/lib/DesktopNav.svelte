<script>
	export let scrollMode;
	export let navigationLinksLeft;
	export let navigationLinksRight;

	let shownSubsectionsHref = ""
	let shownSubsectionLeftShift = 0;
	let leftNavWidth;
	let rightNavWidth;

</script>

<nav class:scrolled="{scrollMode}" class="left-nav" bind:clientWidth={leftNavWidth}>
	{#each navigationLinksLeft as navigationLink, index (navigationLink.key)}
		{#if navigationLink.href}
			<a href="{navigationLink.href}">{navigationLink.key}</a>
		{:else}
			<div on:mouseenter={(event) => {
                                shownSubsectionLeftShift = event.target.offsetLeft
                                shownSubsectionsHref = navigationLink.key
                            }}
				 on:mouseleave="{() => { shownSubsectionsHref = '' }}"
				 class="subsection-container">
				<span>{navigationLink.key}</span>
				<div class="subsections"
					 style="--subsection-width: {leftNavWidth}px"
					 class:open={shownSubsectionsHref === navigationLink.key}>
					<div class="subsection-top">
						<div class="subsection-line"></div>
						<span class="subsection-title"
							  style="--subsection-left-shift: {shownSubsectionLeftShift - 10}px">
                                                {navigationLink.key}</span>
					</div>
					{#each navigationLink.subsections as subsection}
						<a href="{subsection.href}">{subsection.key}</a>
					{/each}
				</div>
			</div>
		{/if}
	{/each}
</nav>

<nav class:scrolled="{scrollMode}" class="right-nav" bind:clientWidth={rightNavWidth}>
	{#each navigationLinksRight as navigationLink}
		{#if navigationLink.href}
			<a href="{navigationLink.href}">{navigationLink.key}</a>
		{:else}
			<div on:mouseenter={(event) => {
                                shownSubsectionLeftShift = event.target.offsetLeft
                                shownSubsectionsHref = navigationLink.href
                            }}
				 on:mouseleave="{() => { shownSubsectionsHref = '' }}"
				 class="subsection-container">
				<span>{navigationLink.key}</span>
				{#if shownSubsectionsHref === navigationLink.href}
					<div class="subsections" style="--subsection-width: {rightNavWidth + 'px'}">
						<div class="subsection-top">
							<div class="subsection-line"></div>
							<span class="subsection-title"
								  style="--subsection-left-shift: {shownSubsectionLeftShift - 10}px">{navigationLink.key}</span>
						</div>
						{#each navigationLink.subsections as subsection}
							<a href="{subsection.href}">{subsection.key}</a>
						{/each}
					</div>
				{/if}
			</div>
		{/if}
	{/each}
</nav>

<style>
    nav {
        display: flex;
        flex-direction: row;
        column-gap: 1.5rem;
        border-top: #ffffff 2px solid;
        pointer-events: all;
        transition: margin-bottom 250ms;
    }

    nav.scrolled {
        margin-bottom: 1.5rem;
    }

    a {
        text-decoration: none;
        color: #ffffff;
        text-transform: uppercase;
        margin-top: 10px;
        font-family: Roboto, serif;
    }

    span {
        text-decoration: none;
        color: #ffffff;
        text-transform: uppercase;
        margin-top: 10px;
        font-family: Roboto, serif;
    }

    .subsection-container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .subsections {
        display: flex;
        position: absolute;
        background-color: #7d0b09;
        flex-direction: column;
        width: var(--subsection-width);
        top: 0;
        right: 0;
        gap: 1rem;
        max-height: 0;
        margin-top: 0.5rem;
        transition: max-height 300ms linear;
        transform-origin: top;
        overflow: hidden;
    }

    .subsections.open {
        max-height: 25rem;
    }

    .subsections a {
        margin-left: 8px;
    }

    .subsections a:last-child {
        margin-left: 8px;
        padding-bottom: 1rem;
    }

    .subsection-top {
        display: flex;
        width: 100%;
        padding-top: 4px;
        align-items: center;
        position: relative;
        min-height: 21px;
    }

    .subsection-line {
        display: flex;
        background-color: #FFFFFF;
        height: 1px;
        flex-grow: 1;
        margin-right: 8px;
        width: 100%;
        margin-left: 8px;
    }

    .subsection-title {
        padding-right: 4px;
        padding-left: 4px;
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 18px;
        color: #FFFFFF;
        text-transform: uppercase;
        text-align: center;
        position: absolute;
        height: 100%;
        background-color: #7d0b09;
        left: var(--subsection-left-shift)
    }
</style>
