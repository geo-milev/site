import { cacheExchange, Client, fetchExchange } from "@urql/svelte";
import {
    PUBLIC_SERVER_GRAPHQL_ENDPOINT,
    PUBLIC_SERVER_URL,
} from "$env/static/public";

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

    const form = (
        await (
            await fetch(
                PUBLIC_SERVER_URL + "/api/forms?where[title][equals]=ContactUs"
            )
        ).json()
    ).docs[0];

    return Object.assign(
        { Form: form },
        (await client.query(QUERY, { title: "Свържи се с нас" })).data
    );
}
