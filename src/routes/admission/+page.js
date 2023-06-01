import { env } from "$env/dynamic/public";

export async function load({ fetch }) {
    // Because of the way blocks work, it is more effective to not use GraphQL to fetch the data for admissions

    return {
        admission: (
            await fetch(env.PUBLIC_SERVER_URL + "/api/globals/admission")
        ).json(),
    };
}
