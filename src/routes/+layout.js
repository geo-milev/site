import { cacheExchange, Client, fetchExchange } from "@urql/svelte";
import { PUBLIC_SERVER_GRAPHQL_ENDPOINT } from "$env/static/public";

export async function load() {
    const client = new Client({
        url: PUBLIC_SERVER_GRAPHQL_ENDPOINT,
        exchanges: [cacheExchange, fetchExchange],
    });

    const QUERY = `
     	query {
            MainInfo {
                name
                logo {
                    url
                    alt
                }
            }
            Contact {
                address
                workingHours {
                    workingHoursStart
                    workingHoursEnd
                }
                emails {
                    mainEmail
                    secondaryEmail
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
