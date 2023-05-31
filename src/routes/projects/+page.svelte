<script lang="ts">
	import SecondaryButton from "$lib/SecondaryButton.svelte";
	import { fly } from "svelte/transition";
	import { secondaryLayout, setLayout } from "../../lib/setLayout";
	import { getContextClient } from "@urql/svelte";
	import Project from "$lib/Project.svelte";

	setLayout(secondaryLayout)

	export let data;

	let projects = data.Projects.docs

	let remainProjects = data.Projects.hasNextPage
	let page = 1;
	let client = getContextClient()

	const requestMoreProjects = () => {
		page++;
		client.query(
			`query($page: Int!) {
				Projects(page: $page, limit: 10) {
					docs {
						name
						description
						image {
							url
							alt
						}
						article {
							id
						}
					}
					hasNextPage
				}
			}`, { page }).then(result => {
					projects = projects.concat(result.data.Projects.docs)
					remainProjects = result.data.hasNextPage
				})
	}
</script>

<div class="container">
	<div class="header-container">
		<h1>Проекти</h1>
		<div class="line"></div>
	</div>
	<div class="projects-container">
		{#each projects as project}
			<div class="project-preview" in:fly={{ duration: 300 }}>
				<Project project="{project}"></Project>
			</div>
		{/each}
	</div>
	{#if remainProjects}
		<SecondaryButton text="Виж още" action="{requestMoreProjects}" />
		{:else}
		<span class="no-more-projects">Това са всички проекти.</span>
	{/if}
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 3rem;
		gap: 3rem;
		padding-left: 2rem;
		padding-right: 2rem;
	}

	h1 {
        font-family: 'Alegreya', serif;
        font-style: normal;
        font-weight: 700;
        font-size: 40px;
        line-height: 54px;
        text-align: center;
        color: #FFFFFF;
		max-width: 30rem;
		margin-bottom: 0;
		padding-bottom: 2rem;
		border-bottom: #FFFFFF 2px solid;
	}

    .header-container {
        display: flex;
        width: auto;
        flex-direction: column;
        align-items: center;
        margin-bottom: 1rem;
    }

    .line {
        width: 20rem;
        height: 1px;
        background-color: rgba(255, 255, 255, 0.31);
        margin-top: -1px;
    }

	.no-more-projects {
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 18px;
        text-align: center;
        color: #FFFFFF
	}

	.projects-container {
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		gap: 4rem;
	}

	.project-preview {
		max-width: 40rem;
	}
</style>