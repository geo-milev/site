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

    let scrollY;
    // By default, the navbar is a part of the normal page to prevent content colliding with it
    // This prop allows it to be set to fixed in cases such as the main page, where the content
    // should go below the navbar
    export let fixed: boolean;
</script>

<svelte:head>
    <link
        href="https://fonts.googleapis.com/css?family=Roboto"
        rel="stylesheet"
    />
</svelte:head>

<svelte:window bind:scrollY="{scrollY}" />

<div class:scrolled="{scrollY > 0}" class="navbar" class:fixed="{fixed}">
    <nav>
        {#each navigationLinksLeft as navigationLink}
            <a href="{navigationLink.href}">{navigationLink.key}</a>
        {/each}
    </nav>

    <div class="logo" class:scrolled="{scrollY > 0}">
        <Logo />
    </div>

    <nav>
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
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: space-around;
        align-items: center;
        background-color: rgba(0, 0, 0, 0);
        transition: all 250ms ease-in;
        position: relative;
        top: 0;
    }

    .fixed {
        position: fixed;
    }

    nav {
        display: flex;
        flex-direction: row;
        column-gap: 1.5rem;
        border-top: #ffffff 2px solid;
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
        transition: transform 250ms ease-in-out;
    }

    .logo.scrolled {
        transform: translateY(15%);
        background-color: rgba(0, 0, 0, 0);
    }

    .scrolled {
        background-color: #7d0b09;
        max-height: 12vh;
    }
</style>
