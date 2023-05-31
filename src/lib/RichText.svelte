<script>
	export let richText;
	export let isCentered = false;
	export let buttonColor = "#FFFFFF";
</script>

<div class="markup-content" style="--color: {buttonColor}">
	{@html richText}
</div>

<style>
    :global(.markup-content h1,
	.markup-content h2,
	.markup-content h3,
	.markup-content h4,
	.markup-content h5,
	.markup-content h6) {
        font-family: 'Alegreya', serif;
        font-style: normal;
        font-weight: 400;
        color: #000000;
        border-bottom: 2px #7D0B09 solid;
        margin: 0;
        padding: 1rem;
    }

    :global(.markup-content .header-container) {
        display: flex;
        align-items: center;
        padding-right: 2rem;
        border-bottom: 1px rgba(124, 20, 22, 0.33) solid;
        width: auto;
        justify-content: flex-start;
        padding-left: 0;
        margin-top: 1rem;
    }

    :global(.markup-content img) {
        object-fit: contain;
        max-width: 50vw;
        max-height: 50vh;
    }

    :global(.markup-content) {
        text-align: left;
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 300;
        font-size: 16px;
        line-height: 19px;
        color: #000000;
    }

    :global(.markup-content img) {
        align-self: center;
        justify-self: center;
        margin-top: 1rem;
    }

    :global(.markup-content pre) {
        overflow-x: auto;
    }

    :global(.markup-content p) {
        text-indent: 1rem;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
    }

    :global(.markup-content .code-container) {
        width: 100%;
        overflow-x: auto;
    }

    .markup-content {
        display: flex;
        max-width: min(40rem, 100%);
        flex-direction: column;
        align-items: flex-start;
    }

    :global(.markup-content div) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

	.markup-content :global(button) {
        background-color: #7D0B09;
        padding: 0.5rem 3rem;
        text-transform: uppercase;
        font-family: 'Roboto', serif;
        font-style: normal;
        text-align: center;
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0);
        border: 2px solid var(--color);
        font-weight: 300;
        font-size: 19px;
        line-height: 22px;
        color: var(--color);
	}
</style>
