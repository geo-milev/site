<script>
    import Navbar from "../lib/Navbar.svelte";
	import Footer from "../lib/Footer.svelte";
</script>

<Navbar fixed="{true}" />

<slot />

<Footer />

<style>
    :global(body) {
        padding: 0;
        margin: 0;
        background-color: black;
    }
</style>