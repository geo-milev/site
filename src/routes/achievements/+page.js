import { cacheExchange, Client, fetchExchange } from "@urql/svelte";
import { env } from "$env/dynamic/public";
import {
    AchievementCategory,
    getAchievementQuery,
} from "$lib/getAchievementsQuerу";

export async function load({ fetch }) {
    const client = new Client({
        url: env.PUBLIC_SERVER_URL + "/api/graphql",
        exchanges: [cacheExchange, fetchExchange],
        fetch: fetch,
    });

    const res = await Promise.all([
        client.query(getAchievementQuery(AchievementCategory.Olympiads), {}),
        client.query(getAchievementQuery(AchievementCategory.Sports), {}),
        client.query(getAchievementQuery(AchievementCategory.Arts), {}),
    ]);

    return {
        olympiads: res[0].data.allNews.docs,
        sports: res[1].data.allNews.docs,
        arts: res[2].data.allNews.docs,
    };
}
