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

    return (await client.query(QUERY, {})).data;
}
