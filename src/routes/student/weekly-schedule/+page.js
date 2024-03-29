import { cacheExchange, Client, fetchExchange } from "@urql/svelte";
import { env } from "$env/dynamic/public";

export async function load({ fetch, url }) {
    const client = new Client({
        url: env.PUBLIC_SERVER_URL + "/api/graphql",
        exchanges: [cacheExchange, fetchExchange],
        fetch: fetch,
    });

    let className = url.searchParams.get("className");

    const QUERY = `
     	query {
            WeeklySchedules(limit: 50) {
                docs {
                    class
                }
            }
            Schedule {
                dailySchedule {
                    text
                    file {
                        url
                        alt
                    }
                    bigBreak {
                        after
                    }
                    hours {
                        num
                        hour {
                            hourStart
                            hourEnd
                        }
                    }
                }
                weeklySchedule {
                    year
                    weeklySchedulesAutofill {
                        maxNumberOfLessons
                    }
                    file {
                        url
                        alt
                    }
                }
            }
        }
    `;

    return Object.assign({ className }, (await client.query(QUERY, {})).data);
}
