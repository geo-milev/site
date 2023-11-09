<script>
	import OpenInNew from "$lib/OpenInNew.svelte";

	export let announcements;
</script>
<div class="container">
	{#each announcements as announcement}
		<div class="announcement">
			{#if announcement.href}
				<a href="{announcement.href}">{announcement.text}<div class="open-in-new"><OpenInNew /></div></a>
				{:else}
				<span>{announcement.text}</span>
			{/if}
		</div>
	{/each}
</div>

<style>
	.container {
		min-height: 2.5rem;
		display: flex;
		flex-wrap: wrap;
		width: 100%;
        background-color: #7D0B09;
		align-items: center;
		justify-content: space-between;
		gap: 0.5rem;
	}

	.announcement {
		display: flex;
		justify-content: center;
		align-items: center;
        min-height: 28px;
		padding-left: 1rem;
        padding-right: 1rem;
        flex: 1 1 auto;
		height: 100%;
		text-align: center;
	}

	.announcement:first-child {
		border-left: none;
	}

	.announcement a {
        pointer-events: auto;
	}

	.announcement a, .announcement span {
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
