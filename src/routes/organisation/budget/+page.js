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
            AvailableBudget {
                years {
                    year
                    budgets {
                        id
                        name
                        isYearly
                        yearly {
                            url
                        }
                        yearlyQuarters {
                            first {
                                url
                            }
                            second {
                                url
                            }
                            third {
                                url
                            }
                            fourth {
                                url
                            }
                        }
                    }
                }
              }
        }
    `;

    return (await client.query(QUERY, {})).data;
}
