import { redirect } from "@sveltejs/kit";
import { env } from "$env/dynamic/public";

export async function GET({ params }) {
    throw redirect(308, `${env.PUBLIC_SERVER_URL}/media/${params.id}`);
}
