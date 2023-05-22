import { cacheExchange, Client, fetchExchange } from "@urql/svelte";
import { PUBLIC_SERVER_GRAPHQL_ENDPOINT } from "$env/static/public";

export async function load({ fetch }) {
    const client = new Client({
        url: PUBLIC_SERVER_GRAPHQL_ENDPOINT,
        exchanges: [cacheExchange, fetchExchange],
        fetch: fetch,
    });

    const QUERY = `
     	query {
            AboutUs {
                aboutUs {
                    title
                    text
                    image {
                        url
                        alt
                    }
                }
                history {
                    title
                    events {
                        year
                        title
                        text
                        image {
                            url
                            alt
                        }
                    }
                }
            }
        }
    `;

    return (await client.query(QUERY, {})).data;
}
