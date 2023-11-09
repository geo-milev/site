<script lang="ts">
	export let href: string = undefined;
	export let action: () => void = undefined;
	export let text: string;
	export let target: string = undefined;
</script>

{#if href}
	<a href="{href}">
		<button tabindex="-1">{text}</button>
	</a>
{:else}
	<button on:click={action}>{text}</button>
{/if}

<style>
	button {
		background-color: var(--primary);
		border: 2px solid var(--primary);
        padding: 0.5rem 3rem;
        color: var(--primary-text);
		text-transform: uppercase;
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 15px;
        text-align: center;
		cursor: pointer;
		transition: all 300ms ease-in;
    }

	button:hover {
		color: var(--secondary-text);
		background-color: var(--secondary);
	}
</style>
