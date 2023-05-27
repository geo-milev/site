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
            FormFiles(page: $page, limit: 15) {
                docs {
                    name
                    file {
                        url
                        filename
                    }
                }
                hasNextPage
            }
        }
    `;

    return (await client.query(QUERY, { page: 1 })).data;
}
