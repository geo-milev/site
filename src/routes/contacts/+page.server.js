import { PUBLIC_SERVER_URL } from "$env/static/public";

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const queryData = {
            form: data.get("formId"),
            submissionData: [],
        };

        for (const [key, value] of data.entries()) {
            if (key !== "formId") {
                queryData.submissionData.push({
                    field: key,
                    value: value,
                });
            }
        }

        const response = await fetch(
            PUBLIC_SERVER_URL + "/api/form-submissions",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(queryData),
            }
        );
        return { success: response.ok };
    },
};
