<script>
	export let richText;
	export let isCentered = false;
</script>

<div class="markup-content"
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
        color: var(--background-text);
        margin: 0;
        padding: 1rem;
    }

    :global(.markup-content .header-container) {
        display: flex;
        align-items: center;
        padding-right: 2rem;
        border-bottom: 1px var(--primary-semi-transparent) solid;
        width: auto;
        justify-content: flex-start;
        padding-left: 0;
        margin-top: 1rem;
    }

    :global(.markup-content a) {
        color: var(--background-text);
    }

    :global(.markup-content a, .markup-content p, .markup-content span) {
        overflow-wrap: anywhere;
        word-wrap: anywhere;
		hyphens: auto;
    }

    :global(.markup-content img) {
        object-fit: contain;
        width: 100%;
        max-width: 50rem;
		height: 100%;
		max-height: 25rem;
    }

    :global(.markup-content) {
        text-align: left;
        font-family: 'Roboto', serif;
        font-style: normal;
        font-weight: 300;
        font-size: 20px;
        line-height: 23px;
        color: var(--background-text);
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
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
		color: var(--background-text);
    }

    :global(.markup-content .code-container) {
        width: 100%;
        overflow-x: auto;
    }

    .markup-content {
        display: flex;
        max-width: min(50rem, 100%);
        flex-direction: column;
        align-items: flex-start;
    }

    :global(.markup-content div) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
		margin-top: 0.5rem;
    }

	.markup-content :global(button) {
        padding: 0.5rem 3rem;
        text-transform: uppercase;
        font-family: 'Roboto', serif;
        font-style: normal;
        text-align: center;
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0);
        border: 2px solid var(--secondary);
        font-weight: 300;
        font-size: 19px;
        line-height: 22px;
        color: var(--secondary);
		margin-bottom: 1rem;
        transition: all 300ms ease-in;
		margin-top: 1rem;
	}

    .markup-content :global(button:hover) {
        background-color: var(--secondary);
        border: 2px solid var(--secondary);
        color: var(--secondary-text);
    }

	.markup-content :global(.button) {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.markup-content :global(> *) {
        color: var(--background-text);
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

    .markup-content.centered :global(pre) {
        text-align: left !important;
    }

    .markup-content.centered :global(div.code-container) {
        align-items: start;
    }

    :global(.markup-content div.center-align) {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
    }

    :global(.markup-content div.right-align) {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        text-align: right;
    }

    :global(.markup-content div.justify-align) {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
    }

    :global(.markup-content div.left-align) {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        text-align: left;
    }

    :global(.markup-content .center-align .header-container) {
        padding-left: 2rem;
        padding-right: 2rem;
    }

    :global(.markup-content .right-align .header-container) {
        padding-left: 2rem;
        padding-right: 0;
    }

    :global(.markup-content .justify-align .header-container) {
        padding-left: 2rem;
    }

    :global(.markup-content .left-align .header-container) {
        padding-right: 2rem;
        padding-left: 0;
    }
	:global(.markup-content blockquote) {
		border-left: 1px solid var(--background-text);
		padding-left: 1rem;
	}
</style>
