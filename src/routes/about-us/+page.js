import { cacheExchange, Client, fetchExchange } from "@urql/svelte";
import { env } from "$env/dynamic/public";

export async function load({ fetch }) {
    const client = new Client({
        url: env.PUBLIC_SERVER_URL + "/api/graphql",
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
