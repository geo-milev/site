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

    client.query(QUERY, {}).subscribe((data) => {
        console.log(data.error);
    });

    return {};
}
