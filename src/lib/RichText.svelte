<script>
	export let richText;
	export let isCentered = false;
	export let buttonColor = "#FFFFFF";
	export let textColor = "#FFFFFF"
	export let headerLineColor = "#FFFFFF"
</script>

<div class="markup-content" style="--color: {buttonColor}; --text-color: {textColor}; --header-line: {headerLineColor}"
	 class:centered={isCentered}>
	{@html richText}
</div>

<style>
	.markup-content {
		width: 100%;
	}

    :global(.markup-content h1,
	.markup-content h2,
	.markup-content h3,
	.markup-content h4,
	.markup-content h5,
	.markup-content h6) {
        font-family: 'Alegreya', serif;
        font-style: normal;
        font-weight: 400;
        color: var(--text-color);
        border-bottom: 2px var(--header-line) solid;
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

    :global(.markup-content a) {
        color: var(--color)
    }

    :global(.markup-content img) {
        object-fit: contain;
        width: 100%;
        max-width: 40rem;
		height: 100%;
		max-height: 40rem;
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
		color: var(--text-color);
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
		margin-bottom: 1rem;
		margin-top: 1rem;
	}

	.markup-content :global(> *) {
        color: var(--text-color);
	}

    :global(.markup-content.centered) {
		width: 100%;
		max-width: 100%;
    }

	.markup-content.centered :global(> *) {
		text-align: center;
		justify-content: center;
		align-items: center;
	}

    .markup-content.centered {
        justify-content: center;
        align-items: center;
    }

	.markup-content.centered :global(.header-container) {
        padding-right: 2rem;
		padding-left: 2rem;
    }

	.markup-content.centered :global(li) {
		text-align: left !important;
	}

	.markup-content.centered :global(p) {
		text-indent: 0;
	}

    .markup-content.centered :global(pre) {
        text-align: left !important;
    }

    .markup-content.centered :global(div.code-container) {
        align-items: start;
    }



    :global(div.center-align) {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
    }

    :global(div.right-align) {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        text-align: right;
    }

    :global(div.justify-align) {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
    }

    :global(div.left-align) {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        text-align: left;
    }

    :global(.center-align .header-container) {
        padding-left: 2rem;
        padding-right: 2rem;
    }

    :global(.right-align .header-container) {
        padding-left: 2rem;
        padding-right: 0;
    }

    :global(.justify-align .header-container) {
        padding-left: 2rem;
    }

    :global(.left-align .header-container) {
        padding-right: 2rem;
        padding-left: 0;
    }
</style>
