import { env } from "$env/dynamic/public";

export async function GET() {
    const res = await (
        await fetch(env.PUBLIC_SERVER_URL + `/api/globals/main-info`)
    ).json();
    const file = await (
        await fetch(env.PUBLIC_SERVER_URL + res.favicon.url)
    ).blob();
    const response = new Response(file);
    response.headers.set("Content-Type", "image/x-icon");
    return response;
}
