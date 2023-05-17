<script>
	import { parseRichText } from "$lib/parseRichText";
	import { setLayout, tertiaryLayout } from "$lib/setLayout";

	setLayout(tertiaryLayout)

	export let data;
</script>

<div class="article-content">
	{@html parseRichText(data.News.content)}
</div>

<style>
</style>