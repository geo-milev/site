import { cacheExchange, Client, fetchExchange } from "@urql/svelte";
import { env } from "$env/dynamic/public";

export async function load({ fetch, params }) {
    const client = new Client({
        url: env.PUBLIC_SERVER_URL + "/api/graphql",
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
