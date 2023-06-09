import { env } from "$env/dynamic/public";
import { error } from "@sveltejs/kit";

export async function load({ fetch, params }) {
    const res = await fetch(env.PUBLIC_SERVER_URL + `/api/news/${params.id}`);

    if (res.status === 404) {
        throw error(404);
    }

    return {
        News: await res.json(),
    };
}
