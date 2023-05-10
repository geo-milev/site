import { cacheExchange, Client, fetchExchange } from "@urql/svelte";
import { PUBLIC_SERVER_GRAPHQL_ENDPOINT } from "$env/static/public";

export async function load() {
    const client = new Client({
        url: PUBLIC_SERVER_GRAPHQL_ENDPOINT,
        exchanges: [cacheExchange, fetchExchange],
    });

    const QUERY = `
     	query {
            allNews(limit: 10, sort: "-publishDate") {
                docs {
                  title
                  description
                  postImage {
                    url
                    alt
                  }
                  publishDate
                  id
                }
            }
        }
    `;

    return (await client.query(QUERY, {})).data;
}
