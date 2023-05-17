<script lang="ts">
	import { secondaryLayout, setLayout } from "../../lib/setLayout";

	setLayout(secondaryLayout)

	export let data;

	const dateFormatOptions: Intl.DateTimeFormatOptions = {hour: '2-digit', minute: '2-digit', hour12: false}
	const workingHoursStart = new Date(data.Contact.workingHours.workingHoursStart)
		.toLocaleTimeString('bg', dateFormatOptions)

	const workingHoursEnd = new Date(data.Contact.workingHours.workingHoursEnd)
		.toLocaleTimeString('bg', dateFormatOptions)
</script>

<div class="container">
	<div class="header-container">
		<h1>Контакти</h1>
		<div class="line"></div>
	</div>
	<div class="main">
		<div class="map">
			<iframe width="90%"
					height="500px"
					style="border:0"
					loading="lazy"
					allowfullscreen
					src="{data.Contact.locationInfo.locationLink}">
			</iframe>
		</div>
		<div class="contact-info">
			<div class="contact-item">
				<h2>Работно Време</h2>
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
		background-color: rgba(255, 255, 255, 0.31);
		margin-top: -1px;
	}

	h1 {
        font-family: 'Alegreya', serif;
        font-style: normal;
        font-weight: 700;
        font-size: 40px;
        line-height: 54px;
        text-align: center;
		border-bottom: 2px #FFFFFF solid;
		margin: 0;
		padding-bottom: 2rem;
        color: #FFFFFF;
	}

	.main {
		display: flex;
		flex-direction: row;
		width: 100%;
		gap: 2rem;
	}

	.map {
		width: 100%;
		display: flex;
		justify-content: center;
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
        color: #FFFFFF;
	}

    .contact-item span {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 300;
        font-size: 23px;
        line-height: 28px;

        color: #FFFFFF;
    }

    .contact-item span a {
        color: #FFFFFF;
    }
</style>