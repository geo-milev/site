<script lang="ts">
	import Button from "$lib/Button.svelte";

	export let href: string = undefined;
	export let action: () => void = undefined;
	export let text: string;
	export let active = false;
</script>

<div class="content-button" class:active={active}>
	<Button href="{href}" action="{action}" text="{text}" />
</div>


<style>
    .content-button :global(button) {
        background-color: rgba(0, 0, 0, 0);
        border: 2px solid var(--accent);
        font-weight: 300;
        font-size: 19px;
        line-height: 22px;
		color: var(--background-text);
        font-family: 'Roboto Flex Variable', serif;
        font-variation-settings: 'GRAD' -150;
    }

    .content-button :global(button:hover) {
        color: var(--secondary-text);
        background-color: var(--secondary);
        border: 2px solid var(--accent);
        font-variation-settings: 'GRAD' 150;
    }
    .content-button.active :global(button) {
        color: var(--secondary-text);
        background-color: var(--secondary);
        border: 2px solid var(--accent);
        font-variation-settings: 'GRAD' 150;
    }


    @supports not (font-variation-settings: 'GRAD' 150) {
        .content-button :global(button) {
            font-weight: 300;
            font-family: 'Roboto', serif;
        }

        .content-button :global(button:hover) {
			font-weight: 600;
        }
    }
</style>
