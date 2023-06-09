import { cacheExchange, Client, fetchExchange } from "@urql/svelte";
import { env } from "$env/dynamic/public";

export async function load({ fetch, url }) {
    const client = new Client({
        url: env.PUBLIC_SERVER_URL + "/api/graphql",
        exchanges: [cacheExchange, fetchExchange],
        fetch: fetch,
    });

    let classNumber = url.searchParams.get("class");

    const QUERY = `
     	query {
            BooksInfo {
                year
                file {
                    url
                }
                classes {
                    class
                }
            }
        }
    `;

    return Object.assign({ classNumber }, (await client.query(QUERY, {})).data);
}
