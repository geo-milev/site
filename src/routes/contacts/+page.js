import { cacheExchange, Client, fetchExchange } from "@urql/svelte";
import { env } from "$env/dynamic/public";

export async function load({ fetch }) {
    const client = new Client({
        url: env.PUBLIC_SERVER_URL + "/api/graphql",
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
                env.PUBLIC_SERVER_URL +
                    "/api/forms?where[title][equals]=ContactUs"
            )
        ).json()
    ).docs[0];

    return Object.assign(
        { Form: form },
        (await client.query(QUERY, { title: "Свържи се с нас" })).data
    );
}
