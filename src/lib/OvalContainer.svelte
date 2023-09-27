<script>
	export let includeTop = true;
	export let includeBottom = true;
</script>

<div class="container" style="--top-display: {includeTop ? 'block': 'none'}; --bottom-display: {includeBottom ? 'block': 'none'};">
	<div class="content">
		<slot />
	</div>
</div>

<style>
	.container {
		background-color: #FFFFFF;
		width: 100%;
		position: relative;
        overflow-x: clip;
	}

    @media only screen and (max-width: 1050px) {
        .content {
            padding: 2rem !important;
        }

		.container:before {
            clip-path: ellipse(50% 30% at 50% 50%);
		}

        .container:after {
            clip-path: ellipse(50% 30% at 50% 50%);
        }
    }

	.container:before {
		content: "";
		width: 100%;
		left: 50%;
		margin-left: -50%;
        height: 8rem;
        background-color: white;
		position: absolute;
		top: -4rem;
		display: var(--top-display);
		clip-path: ellipse(50% 40% at 50% 50%);
	}

	.container:after {
        content: "";
        width: 109%;
        left: 50%;
        margin-left: -50%;
        height: 8rem;
        background-color: #FFFFFF;
        position: absolute;
       	bottom: -4rem;
        display: var(--bottom-display);
		clip-path: ellipse(50% 40% at 50% 50%);
	}

	.content {
		position: relative;
		padding: 4rem;
		z-index: 2;
	}
</style>
