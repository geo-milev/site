<script>
	import Close from "$lib/Close.svelte";
	import NavMinus from "$lib/NavMinus.svelte";
	import NavPlus from "$lib/NavPlus.svelte";
	import { fly } from 'svelte/transition';
	import { afterNavigate } from "$app/navigation";
	import NavLines from "$lib/NavLines.svelte";

	export let navigation;
	export let scrollMode;
	let isMobileMenuOpen;

	const closeNavbar = () => {
		isMobileMenuOpen = false;
		document.body.classList.remove("no-scroll")
	}

	let mobileOpenSubsectionsKeys = []
	let navBackground;

	afterNavigate(closeNavbar)

	const onBackgroundClick = (event) => {
		if (event.target == navBackground) closeNavbar()
	}
</script>

{#if isMobileMenuOpen}
	<div class="nav-background" on:click={onBackgroundClick} bind:this={navBackground}></div>
	<div class="mobile-nav" transition:fly="{{ x: 300, duration: 300 }}">
		<div class="close">
			<button class="icon-button" aria-label="затвори мобилна навигация" on:click={closeNavbar}>
				<Close />
			</button>
		</div>
		<nav>
			{#each navigation as navigationLink}
				{#if navigationLink.href}
					<div class="link-wrapper">
						<a href="{navigationLink.href}">{navigationLink.key}</a>
					</div>
				{:else}
					<button class="link-wrapper" on:click={() => {
								if (mobileOpenSubsectionsKeys.includes(navigationLink.key)) {
									mobileOpenSubsectionsKeys = mobileOpenSubsectionsKeys
										.filter((val) => val !== navigationLink.key)
								} else {
									mobileOpenSubsectionsKeys = [...mobileOpenSubsectionsKeys, navigationLink.key]
								}
							}}>
						<span>{navigationLink.key}</span>
						<div class="icon-button">
							{#if mobileOpenSubsectionsKeys.includes(navigationLink.key)}
								<NavMinus />
							{:else}
								<NavPlus />
							{/if}
						</div>
					</button>
					<div class="mobile-subsection" class:open={mobileOpenSubsectionsKeys.includes(navigationLink.key)}>
						{#each navigationLink.subsections as subsection}
							<a href="{subsection.href}">{subsection.key}</a>
						{/each}
					</div>
				{/if}
			{/each}
		</nav>
	</div>
{:else}
	<div class="right-nav" class:scrolled="{scrollMode}" >
		<button class="icon-button" aria-label="отвори мобилна навигация" on:click={() => {
                        isMobileMenuOpen = true
                        document.body.classList.add("no-scroll")
                    }}>
			<NavLines></NavLines>
		</button>
	</div>
{/if}

<style>
    nav {
        display: flex;
        flex-direction: row;
        column-gap: 1.5rem;
        border-top: var(--primary-dark-text) 2px solid;
        pointer-events: all;
        transition: margin-bottom 250ms;
    }

    a {
        text-decoration: none;
        color: var(--primary-dark-text);
        text-transform: uppercase;
        margin-top: 10px;
        font-family: Roboto, serif;
    }

    span {
        text-decoration: none;
        color: var(--primary-dark-text);
        text-transform: uppercase;
        margin-top: 10px;
        font-family: Roboto, serif;
    }

    .nav-background {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        bottom: 0;
        z-index: 4;
        pointer-events: all;
    }

    .close {
        display: flex;
        justify-content: flex-end;
        padding: 1rem;
    }

    .mobile-nav {
        height: 100%;
        position: fixed;
        min-width: 50%;
        right: 0;
        top: 0;
        background-color: var(--primary-dark);
        z-index: 5;
    }

    .mobile-nav nav {
        display: flex;
        width: 100%;
        height: 100%;
        flex-direction: column;
        border: none;
        align-items: flex-start;
        justify-content: flex-start;
        padding: 0 1rem 1rem 1rem;
        box-sizing: border-box;
    }

    .mobile-nav nav a, .mobile-nav nav span {
        margin-top: 0;
    }

    .link-wrapper {
        border-bottom: 1px solid var(--primary-dark-text);
        padding: 0 0 5px;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        display: flex;
        background-color: rgba(0, 0, 0, 0);
        border-top: none;
        border-left: none;
        border-right: none;
        font-size: 16px;
        cursor: pointer;
        margin-top: 15px;
    }

    .mobile-nav .link-wrapper a {
        width: 100%;
    }

    .mobile-subsection {
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-height: 0;
        overflow: hidden;
        transition: max-height 300ms ease-in;
    }

    .mobile-subsection.open {
        max-height: 25rem;
        width: 100%;
    }

    .mobile-subsection a:first-child {
        padding-top: 4px;
    }

    .mobile-subsection a {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 300;
        font-size: 15px;
        line-height: 17px;
        text-transform: none;
        color: var(--primary-dark-text);
        width: 100%;
    }

    .icon-button {
        background-color: rgba(0, 0, 0, 0);
        border: none;
        cursor: pointer;
        pointer-events: all;
		fill: var(--primary-dark-text);
    }

    button {
        transition: margin-bottom 250ms;
    }

    .scrolled button {
        margin-bottom: 1.5rem;
    }
</style>
