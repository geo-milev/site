<script>
    import Navbar from "../lib/Navbar.svelte";
</script>

<Navbar fixed="{true}" />

<slot />

<style>
    :global(body) {
        padding: 0;
        margin: 0;
        background-color: black;
    }
</style>