export async function GET({ url }) {
    const response = new Response(`Sitemap: ${url.origin}/sitemap.xml`);
    response.headers.set("Cache-Control", "max-age=0, s-maxage=3600");
    response.headers.set("Content-Type", "text/plain");
    return response;
}
