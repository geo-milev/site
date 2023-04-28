<script lang="ts">
	export let href: string = undefined;
	export let action: () => void = undefined;
	export let text: string;
</script>

{#if href}
	<a href="{href}">
		<button>{text}</button>
	</a>
{:else}
	<button on:click={action}>{text}</button>
{/if}

<style>
	button {
		background-color: #7D0B09;
		border: none;
        padding: 0.5rem 3rem;
        color: #FFFFFF;
		text-transform: uppercase;
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 15px;
        text-align: center;
		cursor: pointer;
    }
</style>