<script lang="ts">
	import Curve from "$lib/Curve.svelte";
	import PhoneIcon from "$lib/PhoneIcon.svelte";
	import MailIcon from "$lib/MailIcon.svelte";
	import IconLink from "$lib/IconLink.svelte";

	export let address: string;
	export let schoolName: string;
	export let phone: string;
	export let email: string;
	export let logoHref: string;
	export let logoHrefAlt: string;
</script>

<footer>
	<div class="curve">
		<Curve />
	</div>
	<div class="content">
		<div class="logo">
			<img alt="{logoHrefAlt}" src="{logoHref}"/>
		</div>
		<h1>
			{schoolName}
		</h1>
		<h2>{address}</h2>
		<h3>Контакти</h3>
		<div class="links">
			<IconLink href="tel:{phone}" text="{phone}"><PhoneIcon /></IconLink>
			<IconLink href="mailto:{email}" text="{email}"><MailIcon /></IconLink>
		</div>
		<h4>
			<a href="/about-us">За нас</a>
		</h4>
	</div>
</footer>

<style>
    .curve {
        display: flex;
        position: relative;
        top: 10px;
    }

    footer {
        display: flex;
        flex-direction: column;
    }

    .content {
        position: relative;
        display: flex;
        flex-direction: column;
        padding-bottom: 3rem;
        justify-content: flex-start;
        align-items: center;
        background-color: #151515;
    }

    .logo {
        width: auto;
        height: auto;
        position: relative;
        top: -5.5rem;
    }

    h1 {
        color: #FFFFFF;
        font-size: 24px;
        line-height: 33px;
        text-align: center;
        font-weight: normal;
        font-family: Alegreya, serif;
        margin: 1.5rem 0 0;
        max-width: 35rem;
        text-transform: uppercase;
        position: relative;
        top: -5rem;
    }

    h2 {
        color: #FFFFFF;
        font-size: 20px;
        line-height: 23px;
        text-align: center;
        font-family: Roboto, serif;
        font-weight: 100;
        position: relative;
        top: -5rem;
		margin: 0;
		padding: 1.5rem;
		border-bottom: rgba(255, 255, 255, 0.31) 1px solid;
    }

    h3 {
        color: #FFFFFF;
        font-size: 20px;
        line-height: 23px;
        text-align: center;
        font-family: Roboto, serif;
        font-weight: 700;
        position: relative;
        top: -5rem;
        margin: 0;
        padding: 1.5rem;
        border-top: #FFFFFF 1px solid;
    }

	.links {
		display: flex;
		justify-content: space-between;
		min-width: 40%;
		max-width: 70%;
        position: relative;
        top: -5rem;
        padding-bottom: 2rem;
		padding-left: 1.5rem;
        padding-right: 1.5rem;
        border-bottom: rgba(255, 255, 255, 0.31) 1px solid;
	}

	a {
        text-decoration: none;
		color: #FFFFFF;
        font-size: 20px;
        line-height: 23px;
        text-align: center;
        font-family: Roboto, serif;
        font-weight: 400;
	}

	h4 {
        position: relative;
        top: -5rem;
        margin: 0;
        padding: 1.5rem;
        border-top: #FFFFFF 1px solid;
	}
</style>