import { env } from "$env/dynamic/public";
import { error } from "@sveltejs/kit";

export async function load({ fetch, params }) {
    const res = (
        await fetch(env.PUBLIC_SERVER_URL + `/api/news/${params.id}`)
    ).json();

    if (!res) {
        throw error(404);
    }

    return {
        News: res,
    };
}
