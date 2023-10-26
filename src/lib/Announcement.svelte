<script>
	import OpenInNew from "$lib/OpenInNew.svelte";

	export let announcement;
</script>

<div class="announcement">
	<a href="{announcement.link}">{announcement.text}<div class="open-in-new"><OpenInNew /></div></a>
</div>

<style>
	.announcement {
		background-color: #7D0B09;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		pointer-events: auto;
        min-height: 28px;
	}

	.announcement a {
        font-family: 'Roboto', serif;
        font-weight: 300;
        font-size: 18px;
        line-height: 18px;
        text-transform: none;
        color: #FFFFFF;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		text-decoration: none;
	}

	.announcement .open-in-new {
		margin-left: 5px;
        height: 18px;
        width: 18px;
	}

	.announcement a:hover {
		color: white;
		text-decoration: underline;
	}

    .announcement .open-in-new :global(svg) {
        fill: white;
        height: 18px;
        width: 18px;
    }
</style>
