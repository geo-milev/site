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
            allNews(page: 1, limit: 10, sort: "-publishDate", where: {_status: {equals: published}}) {
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
