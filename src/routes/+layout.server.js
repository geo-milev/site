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
            MainInfo {
                name
                logo {
                    url
                    alt
                    width
                }
                seoAutofillImage {
                    url
                    alt
                }
                favicon {
                    url
                }
                favicons {
                    size
                    favicon {
                        url
                    }
                }
            }
            Navigation {
                sections {
                    key
                    href
                    subsections {
                        key
                        href
                    }
                }
            }
            Contact {
                locationInfo {
                  address
                }
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
                socialMedia {
                    socialMediaTitle
                    icon {
                        url
                        alt
                    }
                    link
                }
            }
        }
    `;

    return (await client.query(QUERY, {})).data;
}
