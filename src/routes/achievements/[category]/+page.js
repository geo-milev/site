import { cacheExchange, Client, fetchExchange } from "@urql/svelte";
import { env } from "$env/dynamic/public";
import { error } from "@sveltejs/kit";
import {
    categories,
    getAchievementQueryWithPagination,
} from "$lib/getAchievementsQuerу";

export async function load({ fetch, params }) {
    const client = new Client({
        url: env.PUBLIC_SERVER_URL + "/api/graphql",
        exchanges: [cacheExchange, fetchExchange],
        fetch: fetch,
    });

    if (!categories.includes(params.category)) {
        throw error(404, {
            message: "Not found",
        });
    }

    return {
        articles: (
            await client.query(
                getAchievementQueryWithPagination(params.category),
                {
                    page: 0,
                }
            )
        ).data,
        category: params.category,
    };
}
