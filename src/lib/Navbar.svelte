<script lang="ts">
    import MobileNav from "$lib/MobileNav.svelte";
    import { onMount } from "svelte";
    import DesktopNav from "$lib/DesktopNav.svelte";
    import ProgressBar from "$lib/ProgressBar.svelte";
    import Announcements from "$lib/Announcements.svelte";

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

    const mobileBreakpoint = 1150;

    let scrollY = 0;
    let innerWidth;
    let loaded = false;

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
    export let announcements: {text: string, link: string}[]

    $: scrollMode = (scrollY > 0) || !fixed;
</script>

<svelte:window bind:scrollY="{scrollY}" bind:innerWidth />

<div class="nav-container" class:fixed="{fixed}" style="--logo-width: {logoWidth}px; --mobile-breakpoint: {mobileBreakpoint}px">
    <ProgressBar />
    {#if fixed && announcements.length > 0}
        <Announcements announcements="{announcements}"></Announcements>
    {/if}
    <div class="navbar">
        <div class="background" class:scrolled="{scrollMode}"></div>

        <div class="logo">
            <a href="/">
                <img alt="{logoHrefAlt}" src="{logoHref}"/>
            </a>
        </div>

        {#if loaded}
            {#if !isMobile}
                <DesktopNav scrollMode={scrollMode}
                            navigationLinksLeft={navigationLinksLeft}
                            navigationLinksRight={navigationLinksRight} />
            {:else}
                <MobileNav scrollMode={scrollMode}
                              navigationLinksLeft={navigationLinksLeft}
                              navigationLinksRight={navigationLinksRight} />
            {/if}
        {/if}
    </div>

    {#if showTitle && fixed}
        <h1 class:scrolled="{scrollMode}">{title}</h1>
    {:else}
        {#if showTitle}
            <h1>{title}</h1>
        {/if}
    {/if}
</div>

<style>
    :global(.no-scroll) {
        overflow: hidden;
    }

    :global(.nav-container .left-nav) {
         justify-self: flex-start;
         margin-left: 3rem;
         grid-column: 1;
        grid-row: 1;
     }

    :global(.nav-container .right-nav) {
        justify-self: flex-end;
        margin-right: 3rem;
        grid-column: 3;
        grid-row: 1;
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

    a {
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
        grid-column: 2;
        grid-row: 1;
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
</style>
