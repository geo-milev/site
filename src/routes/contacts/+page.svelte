<script lang="ts">
	import { secondaryLayout, setLayout } from "../../lib/setLayout";
	import { enhance } from '$app/forms';
	import SecondarySubmit from "$lib/SecondarySubmit.svelte";

	setLayout(secondaryLayout)

	export let data;

	const dateFormatOptions: Intl.DateTimeFormatOptions = {hour: '2-digit', minute: '2-digit', hour12: false}
	const workingHoursStart = new Date(data.Contact.workingHours.workingHoursStart)
		.toLocaleTimeString('bg', dateFormatOptions)

	const workingHoursEnd = new Date(data.Contact.workingHours.workingHoursEnd)
		.toLocaleTimeString('bg', dateFormatOptions)

	const formHtml = data.Form.fields.map((value) => {
		let type = "text";
		if (value.blockType === "email") type = "email"
		if (value.blockType === "textarea") {
			return`<label for="${value.name}">${value.label}</label>
					<textarea name="${value.name}"
						form="contactUsForm" rows="10" style="resize: none;"
						required="${value.required}"
						id="${value.name}"
						placeholder="Въведи ${value.label.toLowerCase()}..."></textarea>`
		}

		return `<label for="${value.name}">${value.label}</label>
				<input type="${type}"
				id="${value.name}"
				name="${value.name}"
				placeholder="Въведи ${value.label.toLowerCase()}..."
				required="${value.required}">`
	}).join("")


	/** @type {import('./$types').ActionData} */
	export let form;
</script>

<div class="container">
	<div class="header-container">
		<h1>Контакти</h1>
		<div class="line"></div>
	</div>
	<div class="main">
		<div class="map">
			<iframe width="90%"
					height="100%"
					style="border:0"
					loading="lazy"
					allowfullscreen
					title="Адрес: {data.Contact.locationInfo.address}"
					src="{data.Contact.locationInfo.locationLink}">
			</iframe>
		</div>
		<div class="contact-info">
			<div class="contact-item">
				<h2>Работно време</h2>
				<span>{workingHoursStart} - {workingHoursEnd}</span>
			</div>
			<div class="contact-item">
				<h2>Имейли</h2>
				<span>
					<a href="mailto:{data.Contact.emails.mainEmail}">
						{data.Contact.emails.mainEmail}
					</a>
				</span>
			</div>
			<div class="contact-item">
				<h2>Телефон</h2>
				<span> Директор -
					<a href="tel:{data.Contact.phones.principalPhone}">
						{data.Contact.phones.principalPhone}
					</a>
				</span>
				<span> Заместник-директор -
					<a href="tel:{data.Contact.phones.assistantPrincipalPhone}">
						{data.Contact.phones.assistantPrincipalPhone}
					</a>
				</span>
			</div>
		</div>
	</div>
	<div class="form">
		<div class="header-container">
			{#if form?.success}
				<h1>Поздравления!</h1>
				{:else}
				<h1>Свържи се с нас</h1>
			{/if}
			<div class="line"></div>
		</div>
		{#if form?.success}
			<p class="send-message">Изпратихте съобщение на екипът на ППМГ “Гео Милев!</p>
		{:else}
			<form method="POST" action="/contacts" id="contactUsForm" use:enhance>
				{@html formHtml}
				<input type="hidden" name="formId" value="{data.Form.id}"/>
			</form>
			<div class="submit">
				<SecondarySubmit text="{data.Form.submitButtonLabel}"></SecondarySubmit>
			</div>
		{/if}
	</div>
</div>

<style>
	.container {
        display: flex;
		flex-direction: column;
        margin: 1rem 2rem 4rem;
    }

	.header-container {
		display: flex;
		width: auto;
		flex-direction: column;
		align-items: center;
		margin-bottom: 4rem;
	}

	.line {
		width: 20rem;
		height: 1px;
		background-color: var(--primary-semi-transparent);
		margin-top: -1px;
	}

	h1 {
        font-family: 'Alegreya', serif;
        font-style: normal;
        font-weight: 700;
        font-size: 40px;
        line-height: 54px;
        text-align: center;
		border-bottom: 2px var(--background-text) solid;
		margin: 0;
		padding-bottom: 2rem;
        color: var(--background-text);
	}

	.main {
		display: flex;
		flex-direction: row;
		width: 100%;
		gap: 2rem;
        margin-bottom: 4rem;
	}

	.map {
		width: 100%;
		display: flex;
		justify-content: center;
		height: 30rem;
	}

	.contact-info {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.contact-item {
		display: flex;
		flex-direction: column;
	}

	.contact-item h2 {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 700;
        font-size: 30px;
        line-height: 35px;
        color: var(--background-text);
	}

    .contact-item span {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 300;
        font-size: 23px;
        line-height: 28px;

        color: var(--background-text);
    }

    .contact-item span a {
        color: var(--background-text);
    }

	.form {
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.form form {
		width: min(30rem, 100%);
        color: var(--background-text);
		display: flex;
		flex-direction: column;
    }

	/*
		Since the form is dynamically built, SvelteKit detects most of its fields as unused css and drops it
		:global needs to be used for this reason
	*/

    #contactUsForm :global(input) {
        background-color: var(--secondary);
		margin-bottom: 1.5rem;
		min-height: 1.5rem;
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
		color: var(--secondary-text);
		border: 1px solid var(--secondary-text);
	}

    #contactUsForm :global(label) {
		width: 100%;
		text-align: center;
		font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: var(--background-text);
        margin-bottom: 0.5rem;
    }

    #contactUsForm  :global(textarea) {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        border: 1px solid var(--background-accent);
        background-color: var(--secondary);
        color: var(--secondary-text);
    }

	.submit {
		display: flex;
        width: min(30rem, 100%);
        flex-direction: column;
	}

	.send-message {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 300;
        font-size: 26px;
        line-height: 33px;
        text-align: center;
        color: var(--background-text);
    }

    @media only screen and (max-width: 1050px) {
		.main {
			flex-direction: column-reverse;
			justify-content: center;
			align-items: center;
		}

		.contact-item {
			text-align: center;
		}
    }

    @media only screen and (max-width: 520px) {
		.header-container {
			margin-bottom: 1rem;
		}

		.contact-info {
			gap: 1rem;
		}

		.map {
			height: 25rem;
		}
    }
</style>
