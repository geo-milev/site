import { Handle } from "@sveltejs/kit";

// This lovely piece of code is needed because of SvelteKit's custom fetch function on the server side
// For some reason, it drops all incoming headers, including content-type
// Another lovely thing is that GraphQL clients assume that any non-json content means something went wrong
// Most clients however (including urql), don't even try to parse response content,
// instead checking the content-type header for "application/json" which causes some problems to arise if for some
// unknown reason the header was dropped
// Here, a custom function is supplied which runs on every SSR request and allows only the content-type header to remain
export const handle: Handle = async ({ event, resolve }) => {
    return resolve(event, {
        filterSerializedResponseHeaders: (name: string) =>
            name === "content-type",
    });
};
