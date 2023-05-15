<script>
	import { parseRichText } from "$lib/parseRichText";
	import { secondaryLayout, setLayout } from "$lib/setLayout";

	setLayout(secondaryLayout)

	export let data;
</script>

<div class="article-content">
	{@html parseRichText(data.News.content)}
</div>

<style>
	.article-content {
		color: white;
	}
</style>