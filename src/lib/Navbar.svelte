<script lang="ts">
    import Logo from "../lib/Logo.svelte";

    interface NavigationLink {
        key: string;
        href: string;
    }

    const navigationLinksLeft: NavigationLink[] = [
        { key: "Новини", href: "/news" },
        { key: "За ученика", href: "/student" },
        { key: "Прием", href: "/acceptance" },
        { key: "Организация", href: "/organisation" },
    ];

    const navigationLinksRight: NavigationLink[] = [
        { key: "Проекти", href: "/projects" },
        { key: "Постижения", href: "/achievements" },
        { key: "За нас", href: "/about-us" },
        { key: "Контакти", href: "/contacts" },
    ];

    let scrollY = 0;

    // By default, the navbar is a part of the normal page to prevent content colliding with it
    // This prop allows it to be set to fixed in cases such as the main page, where the content
    // should go below the navbar
    export let fixed = false;

    $: scrollMode = (scrollY > 0) || !fixed;
</script>

<svelte:head>
    <link
        href="https://fonts.googleapis.com/css?family=Roboto"
        rel="stylesheet"
    />
</svelte:head>

<svelte:window bind:scrollY="{scrollY}" />

<div class="navbar" class:fixed="{fixed}">
    <div class="background" class:scrolled="{scrollMode}"></div>

    <nav class:scrolled="{scrollMode}">
        {#each navigationLinksLeft as navigationLink}
            <a href="{navigationLink.href}">{navigationLink.key}</a>
        {/each}
    </nav>

    <div class="logo">
        <a href="/">
            <Logo />
        </a>
    </div>

    <nav class:scrolled="{scrollMode}">
        {#each navigationLinksRight as navigationLink}
            <a href="{navigationLink.href}">{navigationLink.key}</a>
        {/each}
    </nav>
</div>

<style>
    :global(body) {
        padding: 0;
        margin: 0;
        background-color: black;
    }

    .navbar {
        position: sticky;
        top: 0;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        background-color: rgba(0, 0, 0, 0);
        pointer-events: none;
        z-index: 3;
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

    .logo {
        width: auto;
        margin-top: 1rem;
        pointer-events: all;
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
</style>
