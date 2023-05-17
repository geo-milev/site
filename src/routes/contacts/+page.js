import { cacheExchange, Client, fetchExchange } from "@urql/svelte";
import { PUBLIC_SERVER_GRAPHQL_ENDPOINT } from "$env/static/public";

export async function load({ fetch }) {
    const client = new Client({
        url: PUBLIC_SERVER_GRAPHQL_ENDPOINT,
        exchanges: [cacheExchange, fetchExchange],
        fetch,
    });

    const QUERY = `
     	query {
            Contact {
                locationInfo {
                  address
                  locationLink
                }
                workingHours {
                    workingHoursStart
                    workingHoursEnd
                }
                emails {
                    mainEmail
                }
                phones {
                    principalPhone
                    assistantPrincipalPhone
                }
            }
        }
    `;

    return (await client.query(QUERY, {})).data;
}
