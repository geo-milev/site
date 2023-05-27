<script lang="ts">
	import Button from "$lib/Button.svelte";

	export let href: string = undefined;
	export let action: () => void = undefined;
	export let text: string;
	export let color = "#FFFFFF";
</script>

<div class="content" style="--color: {color}">
	<Button href="{href}" action="{action}" text="{text}" />
</div>


<style>
    .content :global(button) {
        background-color: rgba(0, 0, 0, 0);
        border: 2px solid var(--color);
        font-weight: 300;
        font-size: 19px;
        line-height: 22px;
		color: var(--color);
    }
</style>