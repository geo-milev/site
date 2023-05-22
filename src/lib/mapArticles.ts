import { env } from "$env/dynamic/public";

const mapArticles = (docs) => {
    return docs.map((article) => {
        return {
            title: article.title,
            description: article.description,
            image: {
                url: env.PUBLIC_SERVER_URL + article.postImage.url,
                alt: article.postImage.alt,
            },
            href: "/news/" + article.id,
            date: new Date(article.publishDate),
        };
    });
};

export { mapArticles };
