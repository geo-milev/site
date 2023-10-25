import { env } from "$env/dynamic/public";

export async function load({ fetch, data, url }) {
    const res = fetch(
        env.PUBLIC_SERVER_URL +
            `/api/pages-seo-data?where[relativeUrl][equals]=${url.pathname}`
    );
    const resAnnouncements = fetch(
        env.PUBLIC_SERVER_URL + `/api/announcements?limit=3&sort=editedAt`
    );

    const [seoText, announcementsText] = await Promise.all([
        res,
        resAnnouncements,
    ]);

    const [seoJson, announcementJson] = await Promise.all([
        seoText.json(),
        announcementsText.json(),
    ]);

    if (seoJson.docs.length !== 1) {
        return {
            seoData: undefined,
            announcementData: announcementJson,
            ...data,
        };
    }

    const remoteSeoData = seoJson.docs[0];

    return {
        seoData: remoteSeoData,
        announcementData: announcementJson,
        pathname: url.pathname,
        href: url.href,
        ...data,
    };
}
