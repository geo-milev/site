<script lang="ts">
	import { secondaryLayout, setLayout } from "../../lib/setLayout";
	import { PUBLIC_IMAGE_ENDPOINT } from "$env/static/public";
	import Timeline from "$lib/Timeline.svelte";
	import EventView from "$lib/EventView.svelte";

	setLayout(secondaryLayout)

	export let data;
</script>

<div class="container">
	<div class="about-us">
		<div class="text">
			<div class="header-container">
				<h1>{data.AboutUs.aboutUs.title}</h1>
			</div>
			<div class="line"></div>
			<p>{data.AboutUs.aboutUs.text}</p>
		</div>
		<img src="{PUBLIC_IMAGE_ENDPOINT + data.AboutUs.aboutUs.image.url}"
			 alt="{data.AboutUs.aboutUs.image.alt}">
	</div>
	<div class="history">
		<div class="header-container">
			<h1>{data.AboutUs.history.title}</h1>
			<div class="line"></div>
		</div>
		<Timeline componentProps="{data.AboutUs.history.events
									.sort((a, b) => {return a.year - b.year})
									.map((val) => ({ event: val }))}"
				  timelineTextProperty="year"
				  component="{EventView}"></Timeline>
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 4rem;
		gap: 5rem;
		padding-right: 3rem;
		padding-left: 3rem;
	}

	.about-us {
		width: 100%;
		display: flex;
		gap: 10rem;
	}

    .line {
        height: 1px;
        background-color: rgba(255, 255, 255, 0.31);
        margin-top: -1px;
    }

	.about-us .line {
        width: 50%;
	}

    .about-us .text {
        width: 100%;
        display: flex;
		flex-direction: column;
    }

	h1 {
        border-bottom: 2px #FFFFFF solid;
        margin: 0;
        font-family: 'Alegreya', serif;
        font-style: normal;
        font-weight: 700;
        font-size: 40px;
        line-height: 54px;
        color: #FFFFFF;
	}

	.about-us .text h1 {
        padding-bottom: 0.5rem;
	}

	.about-us .text p {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 300;
        font-size: 16px;
        line-height: 19px;
        color: #FFFFFF;

    }

	.about-us .header-container {
		width: auto;
		display: flex;
	}

    .about-us img {
		width: 100%;
      	object-fit: contain;
    }

	.history {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

    .history .line {
        width: 20rem;
    }

    .history h1 {
        padding-bottom: 1rem;
    }

    .history .header-container {
        width: auto;
        display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
    }
</style>