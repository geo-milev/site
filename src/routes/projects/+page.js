import { cacheExchange, Client, fetchExchange } from "@urql/svelte";
import { env } from "$env/dynamic/public";

export async function load({ fetch }) {
    const client = new Client({
        url: env.PUBLIC_SERVER_URL + "/api/graphql",
        exchanges: [cacheExchange, fetchExchange],
        fetch: fetch,
    });

    const QUERY = `
     	query($page: Int!) {
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
        }
    `;

    return (await client.query(QUERY, { page: 1 })).data;
}
