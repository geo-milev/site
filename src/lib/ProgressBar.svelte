<script>
	import { afterNavigate } from "$app/navigation";
	import { navigating } from "$app/stores";

	let loadingBarPercentage = 0;

	$: if ($navigating) {
		setTimeout(() => {
			if ($navigating) {
				loadingBarPercentage = 30;
			}
		}, 300)
	}

	afterNavigate(() => {
		if (loadingBarPercentage > 0) {
			loadingBarPercentage = 100;
			setTimeout(() => {
				loadingBarPercentage = 0;
			}, 100)
		}
	})
</script>

<div class="progress-bar" style="--loading-bar-scale: scaleX({loadingBarPercentage}%)"></div>

<style>
    .progress-bar {
        width: 100%;
        height: 1px;
        border-radius: 1px;
        background-color: #FFFFFF;
        position: absolute;
        top: 0;
        transform: var(--loading-bar-scale);
        transform-origin: left;
    }
</style>
