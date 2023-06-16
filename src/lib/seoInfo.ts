import { writable } from "svelte/store";

interface SeoInfo {
    title: string;
    description: string;
    url: string;
    siteName: string;
    imageUrl: string;
    type: string;
    publishDate: string;
}

const seoInfo = writable<SeoInfo>({
    title: undefined,
    description: undefined,
    url: undefined,
    siteName: undefined,
    imageUrl: undefined,
    type: undefined,
    publishDate: undefined,
});

export { seoInfo };
