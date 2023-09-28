<script>

	export let href;
	export let text;
</script>

<a href="{href}">
	<slot />
	<span>{text}</span>
</a>

<style>
	a {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 300;
        font-size: 20px;
        line-height: 23px;
        color: var(--primary-text);
		text-decoration: none;
		display: inline-flex;
        align-items: center;
        flex-direction: row;
		gap: 10px;
    }
</style>
