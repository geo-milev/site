<script lang="ts">
	import Button from "$lib/Button.svelte";

	export let href: string = undefined;
	export let action: () => void = undefined;
	export let text: string;
	export let color = "#FFFFFF";
	export let hoverColor = "#FFFFFF"
	export let hoverTextColor = "#000000"
	export let active = false;
</script>

<div class="content-button" style="--color: {color};
--hover-color: {hoverColor};
--hover-text-color: {hoverTextColor}" class:active={active}>
	<Button href="{href}" action="{action}" text="{text}" />
</div>


<style>
    .content-button :global(button) {
        background-color: rgba(0, 0, 0, 0);
        border: 2px solid var(--color);
        font-weight: 300;
        font-size: 19px;
        line-height: 22px;
		color: var(--color);
        font-family: 'Roboto Flex Variable', serif;
        font-variation-settings: 'GRAD' -150;
    }

    .content-button :global(button:hover) {
        color: var(--hover-text-color);
        background-color: var(--hover-color);
        border: 2px solid var(--hover-color);
        font-variation-settings: 'GRAD' 150;
    }
    .content-button.active :global(button) {
        color: var(--hover-text-color);
        background-color: var(--hover-color);
        border: 2px solid var(--hover-color);
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
