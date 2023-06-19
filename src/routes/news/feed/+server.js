import { env } from "$env/dynamic/public";

export async function GET() {
    const res = await (await fetch(env.PUBLIC_SERVER_URL + `/api/rss`)).text();
    const response = new Response(res);
    response.headers.set("Cache-Control", "max-age=0, s-maxage=3600");
    response.headers.set("Content-Type", "application/rss+xml");
    return response;
}
