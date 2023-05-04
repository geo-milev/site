<script lang="ts">
	import Button from "$lib/Button.svelte";

	export let href: string = undefined;
	export let action: () => void = undefined;
	export let text: string;
</script>

<div class="content">
	<Button href="{href}" action="{action}" text="{text}" />
</div>


<style>
    .content :global(button) {
        background-color: rgba(0, 0, 0, 0);
        border: 2px solid #FFFFFF;
        font-weight: 300;
        font-size: 19px;
        line-height: 22px;
    }
</style>