import { cacheExchange, Client, fetchExchange } from "@urql/svelte";
import { PUBLIC_SERVER_GRAPHQL_ENDPOINT } from "$env/static/public";

export async function load() {
    const client = new Client({
        url: PUBLIC_SERVER_GRAPHQL_ENDPOINT,
        exchanges: [cacheExchange, fetchExchange],
    });

    const QUERY = `
     	query {
            Slideshow {
				slides {
				  text
				  image {
					url
				  }
				  button {
					text
					href
				  }
				}
			}
			WhatIsStudied {
				profiles {
				  image {
					url
					alt
				  }
				  name
				  description
				}
				text
				header
			}
			VideoSection {
				header
				text
				video
			}
        }
    `;

    return (await client.query(QUERY, {})).data;
}
