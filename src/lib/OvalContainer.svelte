<script>
	export let backgroundColor = "#FFFFFF";
	export let includeTop = true;
	export let includeBottom = true;
</script>

<div class="container" style="--background-color: {backgroundColor}; --top-display: {includeTop ? 'block': 'none'}; --bottom-display: {includeBottom ? 'block': 'none'};">
	<div class="content">
		<slot />
	</div>
</div>

<style>
	.container {
		background-color: var(--background-color);
		width: 100%;
		position: relative;
        overflow-x: clip;
	}

	.container:before {
		content: "";
		width: 106%;
		left: 50%;
		margin-left: -53%;
        height: 8rem;
        border-radius: 50%;
        background-color: white;
		position: absolute;
		top: -4rem;
		display: var(--top-display);
	}

	.container:after {
        content: "";
        width: 106%;
        left: 50%;
        margin-left: -53%;
        height: 8rem;
        border-radius: 50%;
        background-color: #FFFFFF;
        position: absolute;
       	bottom: -4rem;
        display: var(--bottom-display);
	}

	.content {
		position: relative;
		padding: 4rem;
		z-index: 2;
	}
</style>