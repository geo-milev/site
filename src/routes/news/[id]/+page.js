import { cacheExchange, Client, fetchExchange } from "@urql/svelte";
import { PUBLIC_SERVER_GRAPHQL_ENDPOINT } from "$env/static/public";

export async function load({ fetch, params }) {
    const client = new Client({
        url: PUBLIC_SERVER_GRAPHQL_ENDPOINT,
        exchanges: [cacheExchange, fetchExchange],
        fetch: fetch,
    });

    const QUERY = `
     	query($id: String!) {
            News(id: $id) {
                title
                description
                content
                postImage {
                    url
                    alt
                }
                publishDate
            }
        }
    `;

    return (await client.query(QUERY, { id: params.id })).data;
}
