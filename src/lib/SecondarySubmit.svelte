<script>
	export let text;
</script>

<input type="submit" value="{text}" />

<style>
    input[type=submit] {
        background-color: rgba(0, 0, 0, 0);
        border: 2px solid #FFFFFF;
        font-weight: 300;
        font-size: 19px;
        line-height: 22px;
        padding: 0.5rem 3rem;
        color: #FFFFFF;
        text-transform: uppercase;
        font-family: 'Roboto Flex', serif;
        font-style: normal;
        text-align: center;
        cursor: pointer;
        margin-top: 2rem;
        display: flex;
        width: auto;
        font-variation-settings: 'GRAD' -150;
        transition: all 300ms ease-in;
		justify-content: center;
		align-items: center;
    }

    @supports not (font-variation-settings: 'GRAD' 150) {
        input[type=submit] {
            font-weight: 300;
            font-family: 'Roboto', serif;
        }

        input[type=submit]:hover {
            font-weight: 600;
        }
    }

    input[type=submit]:hover {
        color: #000000;
        background-color: #FFFFFF;
        border: 2px solid #FFFFFF;
        font-variation-settings: 'GRAD' 150;
    }
</style>
