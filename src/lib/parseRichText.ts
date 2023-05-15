import { PUBLIC_IMAGE_ENDPOINT } from "$env/static/public";

const parseRichText = (richText) => {
    if (richText) {
        return richText
            .map((node) => {
                if (node.text && node.text.length > 0) {
                    let text = `<span>${node.text}</span>`;

                    if (node.bold) {
                        text = `<strong>${text}</strong>`;
                    }

                    if (node.code) {
                        text = `<code}>${text}</code>`;
                    }

                    if (node.italic) {
                        text = `<em>${text}</em>`;
                    }

                    if (node.underline) {
                        text = `<u>${text}</u>`;
                    }

                    if (node.strikethrough) {
                        text = `<s>${text}</s>`;
                    }

                    return text;
                }

                if (!node) {
                    return null;
                }

                switch (node.type) {
                    case "h1":
                        return `<h1>${parseRichText(node.children)}</h1>`;
                    case "h2":
                        return `<h2>${parseRichText(node.children)}</h2>`;
                    case "h3":
                        return `<h3>${parseRichText(node.children)}</h3>`;
                    case "h4":
                        return `<h4>${parseRichText(node.children)}</h4>`;
                    case "h5":
                        return `<h5>${parseRichText(node.children)}</h5>`;
                    case "h6":
                        return `<h6>${parseRichText(node.children)}</h6>`;
                    case "ul":
                        return `<ul>${parseRichText(node.children)}</ul>`;
                    case "ol":
                        return `<ol>${parseRichText(node.children)}</ol>`;
                    case "li":
                        return `<li>${parseRichText(node.children)}</li>`;
                    case "link":
                        return `<a href=${node.url} ${
                            node.newTab ? 'target="_blank"' : ""
                        }>${parseRichText(node.children)}</a>`;
                    case "upload": {
                        const value = node.value;
                        const src = PUBLIC_IMAGE_ENDPOINT + value.url;
                        if (value.mimeType.startsWith("image/")) {
                            return `<img src="${src}" alt="${value.alt}" style="width: 100%"/>`;
                        } else {
                            return `<a href="${src}" target="_blank">${value.alt}</a>`;
                        }
                    }
                    case "indent": {
                        return `<div style="padding-left: 1rem">${parseRichText(
                            node.children
                        )}</div>`;
                    }
                    case "relationship": {
                        if (node.relationTo === "news") {
                            return `<a href="${node.value.id}" target="_blank">${node.value.title}</a>`;
                        } else return "";
                    }
                    default:
                        return `<p>${parseRichText(node.children)}</p>`;
                }
            })
            .join("");
    }

    return "";
};

export { parseRichText };
