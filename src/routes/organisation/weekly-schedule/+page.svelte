<script lang="ts">
	import { secondaryLayout, setLayout } from "../../../lib/setLayout";
	import { getContextClient } from "@urql/svelte";
	import SecondaryButton from "$lib/SecondaryButton.svelte";
	import { onMount } from "svelte";
	import { env } from "$env/dynamic/public";
	import { classNumberNames } from "../../../lib/classNumberNames";

	setLayout(secondaryLayout)

	export let data;
	let client = getContextClient()

	const dateFormatOptions: Intl.DateTimeFormatOptions = {hour: '2-digit', minute: '2-digit', hour12: false}

	const classes = data.WeeklySchedules.docs.map((val) => val.class)

	const classNumbers = [...new Set(classes.map((val) => {
		return val.match(/\d+/)[0]
	}))].sort((a, b) => a - b)

	const classLetters = [...new Set(classes.map((val) => {
		return val.match(/[A-Za-zА-Яа-я]/)[0]
	}))].sort()

	let classNumberSelect;
	let classLetterSelect;
	let currentClassNumber;
	let currentClassLetter;
	let days = [];
	const maxNumberOfLessons = data.Schedule.weeklySchedule.weeklySchedulesAutofill.maxNumberOfLessons

	const changeSchedule = () => {
		currentClassNumber = classNumberSelect.value
		currentClassLetter = classLetterSelect.value

		setSchedule(currentClassNumber + currentClassLetter)
	}

	const isLetterDisabled = (classNumber: string, classLetter: string) => {
		return classNumberSelect && !classes.includes(classNumber + classLetter)
	}

	const hours = data.Schedule.dailySchedule.hours.slice(0)
	hours.splice(data.Schedule.dailySchedule.bigBreak.after, 0, {});

	const setSchedule = (className: string) => {
		client.query(
			`query($className: String!) {
					WeeklySchedules(where: { class: { equals: $className }}) {
						docs {
							days {
    							day
   								hours {
    								num
   									subject {
    									shortName
    								}
    							}
    						}
						}
					}
				}
   		 	`, { className }).then((data) => {
					days = data.data.WeeklySchedules.docs[0].days
		})
	}

	onMount(() => {
		if (data.className) {
			let classNumber = data.className.match(/\d+/)[0]
			if (classNumber && classNumbers.indexOf(classNumber) !== -1) {
				classNumberSelect.value = classNumber
				let classLetter = data.className.match(/[A-Za-zА-Яа-я]/)[0]
				if (classLetter &&
					classLetters.indexOf(classLetter) !== -1 &&
					!isLetterDisabled(classNumber, classLetter)) {
					classLetterSelect.value = classLetter
				}
			}
		}
		changeSchedule()
	})
</script>

<div class="container">
	<div class="header-container">
		<h1>Седмично разписание</h1>
		<div class="line"></div>
	</div>
	<div class="daily-schedule-container">
		<div class="daily-schedule">
			<table>
				<thead>
				<tr>
					<td>Час</td>
					<td>Начало</td>
					<td>Край</td>
				</tr>
				</thead>
				{#each hours as hour}
					<tr>
						{#if hour.num}
							<td>{hour.num}</td>
							<td>{new Date(hour.hour.hourStart).toLocaleTimeString('bg', dateFormatOptions)}</td>
							<td>{new Date(hour.hour.hourEnd).toLocaleTimeString('bg', dateFormatOptions)}</td>
						{:else}
							<td></td>
							<td></td>
							<td></td>
						{/if}
					</tr>
				{/each}
			</table>
		</div>
		<div class="daily-schedule-info">
			<h2>Организация на учебния ден</h2>
			<div class="note">
				<h3>Забележка: </h3>
				<p>{data.Schedule.dailySchedule.text}</p>
			</div>
			<SecondaryButton
				href="{env.PUBLIC_SERVER_URL + data.Schedule.dailySchedule.file.url}"
				text="Изтегли"></SecondaryButton>
		</div>
	</div>
	<div class="header-container">
		<h1>Твоята програма</h1>
		<div class="line"></div>
	</div>
	<div class="weekly-schedule-container">
		<div class="class-selector">
			<label for="class">Въведи своя клас:</label>

			<div class="class-selects">
				<select name="classNumber" id="classNumber" bind:this={classNumberSelect} on:change={changeSchedule}>
					{#each classNumbers as classNumber}
						<option value="{classNumber}">{classNumberNames[classNumber - 1]}</option>
					{/each}
				</select>
				<select name="class" id="class" bind:this={classLetterSelect} on:change={changeSchedule}>
					{#each classLetters as classLetter}
						<option value="{classLetter}"
								disabled="{isLetterDisabled(currentClassNumber, classLetter)}">
							{classLetter}</option>
					{/each}
				</select>
			</div>
		</div>
		<div class="weekly-schedule">
			<table>
				<thead>
					<tr>
						{#each days as day}
							<td>{day.day}</td>
						{/each}
					</tr>
				</thead>
				{#each Array(maxNumberOfLessons) as _, index}
					<tr>
						{#each days as day}
							<td>
								{#if day.hours[index] && day.hours[index].subject}
									{day.hours[index].subject.shortName}
								{/if}
							</td>
						{/each}
					</tr>
				{/each}
			</table>
		</div>
		<SecondaryButton
			href="{env.PUBLIC_SERVER_URL + data.Schedule.weeklySchedule.file.url}"
			text="Изтегли"></SecondaryButton>
	</div>
</div>


<style>
	.container {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 3rem;
		margin-top: 1rem;
	}

    .header-container {
        display: flex;
        width: auto;
        flex-direction: column;
        align-items: center;
        margin-bottom: 4rem;
    }

    .line {
        width: 30rem;
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
        padding-bottom: 1rem;
        color: #FFFFFF;
    }

	.daily-schedule-container {
		width: 100%;
		display: flex;
	}

	.daily-schedule {
		width: 100%;
		display: flex;
		margin-left: 3rem;
        margin-right: 3rem;
		justify-content: center;
		align-items: center;
		margin-bottom: 3rem;
	}

	.daily-schedule-info {
		width: 100%;
        display: flex;
		flex-direction: column;
		gap: 3rem;
	}

	.daily-schedule-info h2 {
        font-family: 'Alegreya', serif;
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 33px;
		margin: 0;
		padding: 0;
        color: #FFFFFF;
	}

    .daily-schedule-info h3 {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        color: #FFFFFF;
        margin: 0 0 1rem;
    }

    .daily-schedule-info p {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 300;
        font-size: 24px;
        line-height: 28px;
        color: #FFFFFF;
		margin-bottom: 1rem;
    }

	table {
        table-layout: fixed;
        width: 75%;
        border-collapse: collapse;
        border: 3px solid #FFFFFF;
	}

	thead td {
        font-family: 'Alegreya', serif;
        font-style: normal;
        font-weight: 400;
        font-size: 32px;
        line-height: 44px;
        text-align: center;
        color: #FFFFFF;
    }

	td {
		padding: 1rem;
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 20px;
        text-align: center;
        color: #FFFFFF;
        border: 3px solid #FFFFFF;
    }

	.weekly-schedule-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 2rem;
	}

	.weekly-schedule-container label {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 300;
        font-size: 20px;
        line-height: 24px;
        text-align: center;
        color: #FFFFFF;
    }

	.class-selector {
		display: flex;
		flex-direction: column;
        justify-content: center;
        align-items: center;
		gap: 0.5rem;
	}

	.class-selects {
        display: flex;
        justify-content: space-around;
        align-items: center;
        gap: 0.5rem;
		width: 100%;
		padding: 1rem;
	}

    .class-selects select {
        display: flex;
        justify-content: space-around;
        align-items: center;
        gap: 0.5rem;
		width: 100%;
		background-color: rgba(0, 0, 0, 0);
		border: 1px solid #FFFFFF;
		color: #FFFFFF;
        font-size: 16px;
        line-height: 20px;
        font-family: 'Roboto', serif;
        font-weight: 300;
    }

    .class-selects select:first-child {
		flex: 0 0 80%;
	}

    .class-selects select:last-child {
		flex: 0 0 20%;
	}

    .class-selects option {
        font-family: 'Roboto', serif;
        font-weight: 300;
        font-size: 16px;
        line-height: 20px;
        color: #151515;
    }

    .class-selects option:disabled {
        font-family: 'Roboto', serif;
        font-weight: 300;
        font-size: 16px;
        line-height: 20px;
        color: #FFFFFF;
    }

	.weekly-schedule {
		width: 100%;
		display: flex;
        justify-content: center;
        align-items: center;
	}

    @media only screen and (max-width: 700px) {
      .header-container {
        width: 90%;
      }

          .line {
        width: 10rem;
      }
    }

    @media only screen and (max-width: 1275px) {
        thead td {
            font-family: 'Alegreya', serif;
            font-style: normal;
            font-weight: 400;
            font-size: 22px;
            line-height: 33px;
            text-align: center;
            color: #FFFFFF;
        }
    }

    @media only screen and (max-width: 1070px) {
       	.daily-schedule-container {
			flex-direction: column-reverse;
			gap: 3rem;
            justify-content: center;
            align-items: center;
		}

		.daily-schedule {
			margin: 0;
		}

		.daily-schedule-info {
			justify-content: center;
			align-items: center;
			width: 90%;
			gap: 1rem;
		}

		.container {
			gap: 1rem;
		}

		.header-container {
			margin-bottom: 2rem;
		}

        .weekly-schedule table {
            width: 100%;
        }
    }

    @media only screen and (max-width: 750px) {
        .weekly-schedule {
			      display: block;
            overflow-x: auto;
            white-space: nowrap;
            width: 100vw;
        }

        .weekly-schedule table {
            min-width: 50rem;
        }
    }
</style>
