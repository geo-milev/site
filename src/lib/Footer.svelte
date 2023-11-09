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
			Създадено от
		</h4>
		<div class="names">
			<span>Михаил Михов</span>
			<span>Никола Ганчев</span>
			<span>Пламен Желев</span>
		</div>
	</div>
</footer>

<style>
    .curve {
        display: flex;
        position: relative;
        top: 10px;
		--background: var(--main-background);
    }

    footer {
        display: flex;
        flex-direction: column;
    }

    .content {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        background-color: var(--main-background);
    }

    .logo {
        width: auto;
        height: auto;
        position: relative;
        top: -5.5rem;
        user-select: none;
    }

    h1 {
        color: var(--main-background-text);
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
        color: var(--main-background-text);
        font-size: 20px;
        line-height: 23px;
        text-align: center;
        font-family: Roboto, serif;
        font-weight: 100;
        position: relative;
        top: -5rem;
		margin: 0;
		padding: 1.5rem;
		border-bottom: var(--main-primary-semi-transparent) 1px solid;
    }

    h3 {
        color: var(--main-background-text);
        font-size: 20px;
        line-height: 23px;
        text-align: center;
        font-family: Roboto, serif;
        font-weight: 700;
        position: relative;
        top: -5rem;
        margin: 0;
        padding: 1.5rem;
        border-top: var(--main-background-text) 1px solid;
    }

	.links {
		display: flex;
		justify-content: space-between;
		min-width: 40%;
		max-width: 100%;
        position: relative;
        top: -5rem;
        padding-bottom: 2rem;
		padding-left: 1.5rem;
        padding-right: 1.5rem;
        border-bottom: var(--main-primary-semi-transparent) 1px solid;
	}

	h4 {
        position: relative;
        top: -5rem;
        margin: 0;
        padding: 1.5rem;
        border-top: var(--main-background-text) 1px solid;
        color: var(--main-background-text);
        font-size: 20px;
        line-height: 23px;
        text-align: center;
        font-family: Roboto, serif;
        font-weight: 700;
	}

	.names {
        position: relative;
        top: -5rem;
        margin: 0;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-evenly;
		align-items: center;
		min-width: 60%;
		max-width: 100%;
		gap: 2rem;
		padding-top: 0.5rem;
	}

	.names span {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 100;
        font-size: 24px;
        line-height: 28px;
        text-align: center;
        color: var(--main-background-text);
	}

    @media only screen and (max-width: 1050px) {
		.links {
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 1rem;
		}

		.logo {
            top: -3.5rem;
		}
    }
</style>
