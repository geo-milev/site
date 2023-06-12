import { env } from "$env/dynamic/public";

export async function load({ fetch, data, url }) {
    const res = await fetch(
        env.PUBLIC_SERVER_URL +
            `/api/pages-seo-data?where[relativeUrl][equals]=${url.pathname}`
    );

    const json = await res.json();

    if (json.docs.length !== 1) {
        return {
            seoData: undefined,
            ...data,
        };
    }

    const remoteSeoData = json.docs[0];

    return {
        seoData: remoteSeoData,
        ...data,
    };
}
