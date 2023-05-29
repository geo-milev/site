<script lang="ts">
    import NavLines from "$lib/NavLines.svelte";
    import NavClose from "$lib/NavClose.svelte";
    import NavMinus from "$lib/NavMinus.svelte";
    import NavPlus from "$lib/NavPlus.svelte";
    import { afterNavigate } from '$app/navigation';

    interface NavigationLink {
        key: string;
        href?: string;
        subsections?: NavigationLink[]
    }

    let shownSubsectionsHref = ""
    let mobileOpenSubsectionsKeys = []

    const navigationLinksLeft: NavigationLink[] = [
        { key: "Новини", href: "/news" },
        { key: "За ученика", subsections: [
                { key: "Учебници", href: "/student/books" },
                { key: "Вестник", href: "/student/newspaper" }
            ]},
        { key: "Прием", href: "/acceptance" },
        { key: "Организация", subsections: [
                { key: "Седмично разписание", href: "/organisation/weekly-schedule" },
                { key: "Графици", href: "/organisation/schedules" },
                { key: "Документи", href: "/organisation/documents" },
                { key: "Административни услуги", href: "/organisation/administrative-services" },
                { key: "Бланки", href: "/organisation/forms" },
                { key: "Бюджет", href: "/organisation/budget" }
            ]},
    ];

    const navigationLinksRight: NavigationLink[] = [
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
    let navBackground;

    const closeNavbar = () => {
        isMobileMenuOpen = false;
        document.body.classList.remove("no-scroll")
    }

    afterNavigate(closeNavbar)

    const onBackgroundClick = (event) => {
        if (event.target == navBackground) closeNavbar()
    }

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
    <div class="navbar">
        <div class="background" class:scrolled="{scrollMode}"></div>

        {#if !isMobile}
            <nav class:scrolled="{scrollMode}" class="left-nav" bind:clientWidth={leftNavWidth}>
                {#each navigationLinksLeft as navigationLink}
                    {#if !navigationLink.subsections}
                        <a href="{navigationLink.href}">{navigationLink.key}</a>
                        {:else}
                        <div on:mouseenter={() => { shownSubsectionsHref = navigationLink.key }}
                             on:mouseleave="{() => { shownSubsectionsHref = '' }}"
                             class="subsection-container">
                            <span>{navigationLink.key}</span>
                            {#if shownSubsectionsHref === navigationLink.key}
                                <div class="subsections" style="--subsection-width: {leftNavWidth + 'px'}">
                                    <div class="subsection-top">
                                        <div class="subsection-line"></div>
                                        <span class="subsection-title">{navigationLink.key}</span>
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
            <div class="left-nav"></div>
        {/if}
        <div class="logo">
            <a href="/">
                <img alt="{logoHrefAlt}" src="{logoHref}"/>
            </a>
        </div>

        {#if !isMobile}
            <nav class:scrolled="{scrollMode}" class="right-nav" bind:clientWidth={rightNavWidth}>
                {#each navigationLinksRight as navigationLink}
                    {#if !navigationLink.subsections}
                        <a href="{navigationLink.href}">{navigationLink.key}</a>
                    {:else}
                        <div on:mouseenter={() => { shownSubsectionsHref = navigationLink.href }}
                             on:mouseleave="{() => { shownSubsectionsHref = '' }}"
                             class="subsection-container">
                            <span>{navigationLink.key}</span>
                            {#if shownSubsectionsHref === navigationLink.href}
                                <div class="subsections" style="--subsection-width: {rightNavWidth + 'px'}">
                                    <div class="subsection-top">
                                        <div class="subsection-line"></div>
                                        <span class="subsection-title">{navigationLink.key}</span>
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
                <button class="icon-button" on:click={() => {
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
        <div class="nav-background" on:click={onBackgroundClick} bind:this={navBackground}></div>
        <div class="mobile-nav">
            <div class="close">
                <button class="icon-button" on:click={closeNavbar}>
                    <NavClose />
                </button>
            </div>
            <nav>
                {#each [...navigationLinksLeft, ...navigationLinksRight] as navigationLink}
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
                            {#if mobileOpenSubsectionsKeys.includes(navigationLink.key)}
                                <NavMinus />
                                {:else}
                                <NavPlus />
                            {/if}
                        </button>
                        {#if mobileOpenSubsectionsKeys.includes(navigationLink.key)}
                            <div class="mobile-subsection">
                                {#each navigationLink.subsections as subsection}
                                    <a href="{subsection.href}">{subsection.key}</a>
                                {/each}
                            </div>
                        {/if}
                    {/if}
                {/each}
            </nav>
        </div>
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
        margin-top: 0.5rem;
        padding-bottom: 1rem;
        gap: 1rem;
    }

    .subsections a {
        margin-left: 8px;
    }

    .subsection-top {
        display: flex;
        width: 100%;
        padding-top: 4px;
        align-items: center;
    }

    .subsection-line {
        display: flex;
        background-color: #FFFFFF;
        height: 1px;
        padding-right: 4px;
        flex-grow: 1;
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
        margin: 0;
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
        background-color: #4F0D0D;
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
        padding: 0 2rem 1rem 1rem;
        gap: 10px;
        box-sizing: border-box;
    }


    .mobile-nav nav a, .mobile-nav nav span {
        margin-top: 0;
    }

    .link-wrapper {
        border-bottom: 1px solid #FFFFFF;
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
    }

    .mobile-subsection {
        padding-top: 4px;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .mobile-subsection a {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 300;
        font-size: 15px;
        line-height: 17px;
        text-transform: none;
        color: #FFFFFF;
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
</style>
