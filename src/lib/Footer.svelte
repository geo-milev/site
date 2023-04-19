<script>
	import Logo from "$lib/Logo.svelte";
	import Curve from "$lib/Curve.svelte";
</script>

<svelte:head>
	<link
		href="https://fonts.googleapis.com/css2?family=Alegreya&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div>
	<Curve />
	<footer>
		<div class="logo">
			<Logo />
		</div>
		<h1>
			Профилирана природоматематическа гимназия "Гео Милев"
		</h1>
	</footer>
</div>

<style>
	footer {
		position: relative;
		display: flex;
		flex-direction: column;
		padding-bottom: 10rem;
		justify-content: flex-start;
		align-items: center;
		background-color: #151515;
	}

	.logo {
		width: auto;
		height: auto;
		position: relative;
		top: -5rem;
	}

	h1 {
		color: #FFFFFF;
		font-size: 24px;
		line-height: 33px;
		text-align: center;
		font-weight: normal;
        font-family: Alegreya, serif;
        margin: 1.5rem 0 0;
		width: 50%;
        text-transform: uppercase;
        position: relative;
        top: -5rem;
    }
</style>