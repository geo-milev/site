import { PUBLIC_IMAGE_ENDPOINT } from "$env/static/public";

const mapArticles = (docs) => {
    return docs.map((article) => {
        return {
            title: article.title,
            description: article.description,
            image: {
                url: PUBLIC_IMAGE_ENDPOINT + article.postImage.url,
                alt: article.postImage.alt,
            },
            href: "/news/" + article.id,
            date: new Date(article.publishDate),
        };
    });
};

export { mapArticles };
