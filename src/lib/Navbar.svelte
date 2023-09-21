<script lang="ts">
    import NavLines from "$lib/NavLines.svelte";
    import { afterNavigate } from '$app/navigation';
    import { navigating } from '$app/stores'
    import MobileNavbar from "$lib/MobileNavbar.svelte";
    import { onMount } from "svelte";

    let shownSubsectionsHref = ""
    let shownSubsectionLeftShift = 0;

    const navigationLinksLeft = [
        { key: "Новини", href: "/news" },
        { key: "За ученика", subsections: [
                { key: "Седмично разписание", href: "/student/weekly-schedule" },
                { key: "Учебници", href: "/student/books" },
                { key: "Вестник", href: "/student/newspaper" }
            ]},
        { key: "Прием", href: "/admission" },
        { key: "Организация", subsections: [
                { key: "Графици", href: "/organisation/schedules" },
                { key: "Документи", href: "/organisation/documents" },
                { key: "Административни услуги", href: "/organisation/administrative-services" },
                { key: "Бланки", href: "/organisation/forms" },
                { key: "Бюджет", href: "/organisation/budget" }
            ]},
    ];

    const navigationLinksRight = [
        { key: "Проекти", href: "/projects" },
        { key: "Постижения", href: "/achievements" },
        { key: "За нас", href: "/about-us" },
        { key: "Контакти", href: "/contacts" },
    ];

    const mobileBreakpoint = 1050;

    let scrollY = 0;
    let leftNavWidth;
    let rightNavWidth;
    let innerWidth;
    let isMobileMenuOpen;
    let loadingBarPercentage = 0;
    let loaded = false;

    const closeNavbar = () => {
        isMobileMenuOpen = false;
        document.body.classList.remove("no-scroll")
    }

    afterNavigate(() => {
        if (loadingBarPercentage > 0) {
            loadingBarPercentage = 100;
            setTimeout(() => {
                loadingBarPercentage = 0;
            }, 100)
        }
    })

    $: if ($navigating) {
        setTimeout(() => {
            if ($navigating) {
                loadingBarPercentage = 30;
            }
        }, 300)
    }

    onMount(() => loaded = true)

    $: isMobile = innerWidth < mobileBreakpoint;

    // By default, the navbar is a part of the normal page to prevent content colliding with it
    // This prop allows it to be set to fixed in cases such as the main page, where the content
    // should go below the navbar
    export let fixed = false;
    export let showTitle = true;
    export let title: string;
    export let logoHref: string;
    export let logoHrefAlt: string;
    export let logoWidth: number;

    $: scrollMode = (scrollY > 0) || !fixed;
</script>

<svelte:window bind:scrollY="{scrollY}" bind:innerWidth />

<div class="nav-container" class:fixed="{fixed}" style="--logo-width: {logoWidth}px; --mobile-breakpoint: {mobileBreakpoint}px">
    <div class="progress-bar" style="--loading-bar-scale: scaleX({loadingBarPercentage}%)"></div>
    <div class="navbar">
        <div class="background" class:scrolled="{scrollMode}"></div>

        {#if !isMobile && loaded}
            <nav class:scrolled="{scrollMode}" class="left-nav" bind:clientWidth={leftNavWidth}>
                {#each navigationLinksLeft as navigationLink, index (navigationLink.key)}
                    {#if !navigationLink.subsections}
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
        {:else}
            <div class="left-nav"></div>
        {/if}
        <div class="logo">
            <a href="/">
                <img alt="{logoHrefAlt}" src="{logoHref}"/>
            </a>
        </div>

        {#if !isMobile && loaded}
            <nav class:scrolled="{scrollMode}" class="right-nav" bind:clientWidth={rightNavWidth}>
                {#each navigationLinksRight as navigationLink}
                    {#if !navigationLink.subsections}
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
    </div>
    {#if showTitle && fixed}
        <h1 class:scrolled="{scrollMode}">{title}</h1>
    {:else}
        {#if showTitle}
            <h1>{title}</h1>
        {/if}
    {/if}

    {#if isMobile && isMobileMenuOpen}
        <MobileNavbar closeNavbar={closeNavbar}
                      navigationLinksLeft={navigationLinksLeft}
                      navigationLinksRight={navigationLinksRight} />
    {/if}
</div>

<style>
    :global(.no-scroll) {
        overflow: hidden;
    }

    .nav-container {
        position: sticky;
        top: 0;
        width: 100%;
        display: flex;
        flex-direction: column;
        height: auto;
        justify-content: center;
        pointer-events: none;
        z-index: 3;
    }

    .navbar {
        position: relative;
        width: 100%;
        display: grid;
        justify-items: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0);
        pointer-events: none;
        grid-template-columns: 1fr var(--logo-width) 1fr;
    }

    .fixed {
        position: fixed;
    }

    nav {
        display: flex;
        flex-direction: row;
        column-gap: 1.5rem;
        border-top: #ffffff 2px solid;
        pointer-events: all;
        transition: margin-bottom 250ms;
    }

    .left-nav {
        justify-self: flex-start;
        margin-left: 3rem;
    }

    .right-nav {
        justify-self: flex-end;
        margin-right: 3rem;
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

    .logo {
        width: auto;
        margin-top: 1rem;
        pointer-events: all;
        user-select: none;
    }

    .background {
        background-color: rgba(0, 0, 0, 0);
        position: absolute;
        width: 100%;
        height: 100%;
        transition: background-color 250ms ease-in-out;
        transform: scaleY(0%);
        transform-origin: top;
        z-index: -1;
        pointer-events: all;
    }

    .background.scrolled {
        background-color: #7d0b09;
        transform: scaleY(70%);
    }

    h1 {
        font-family: 'Alegreya', serif;
        font-style: normal;
        font-weight: 500;
        font-size: 24px;
        text-transform: uppercase;
        line-height: 33px;
        text-align: center;

        color: #FFFFFF;
        transition: all 100ms ease-in-out;
    }

    h1.scrolled {
        transform: translateY(-100px);
        color: rgba(0, 0, 0, 0);
        user-select: none;
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

    .icon-button {
        background-color: rgba(0, 0, 0, 0);
        border: none;
        cursor: pointer;
        pointer-events: all;
    }

    button {
        transition: margin-bottom 250ms;
    }

    .scrolled button {
        margin-bottom: 1.5rem;
    }

    .progress-bar {
        width: 100%;
        height: 1px;
        border-radius: 1px;
        background-color: #FFFFFF;
        position: absolute;
        top: 0;
        transform: var(--loading-bar-scale);
        transform-origin: left;
    }
</style>
