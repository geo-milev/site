<script lang="ts">
	import Button from "$lib/Button.svelte";

	export let href: string = undefined;
	export let action: () => void = undefined;
	export let text: string;
	export let color = "#FFFFFF";
</script>

<div class="content-button" style="--color: {color}">
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
        font-family: 'Roboto Flex', serif;
        font-variation-settings: 'GRAD' -150;
    }

    .content-button :global(button:hover) {
        color: #000000;
        background-color: #FFFFFF;
        border: 2px solid #FFFFFF;
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
