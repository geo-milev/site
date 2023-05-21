import { PUBLIC_IMAGE_ENDPOINT } from "$env/static/public";
import sanitizeHtml from "sanitize-html";

const parseRichText = (richText) => {
    if (richText) {
        return richText
            .map((node) => {
                if (node.text && node.text.length > 0) {
                    const sanitizedText = sanitizeHtml(node.text);
                    if (!sanitizedText) return null;

                    let text = `<span>${sanitizedText}</span>`;

                    if (node.bold) {
                        text = `<strong>${text}</strong>`;
                    }

                    if (node.code) {
                        text = `<pre><code>${text}</code></pre>`;
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
                        return `<div class="header-container"><h1>${parseRichText(
                            node.children
                        )}</h1></div>`;
                    case "h2":
                        return `<div class="header-container"><h2>${parseRichText(
                            node.children
                        )}</h2></div>`;
                    case "h3":
                        return `<div class="header-container"><h3>${parseRichText(
                            node.children
                        )}</h3></div>`;
                    case "h4":
                        return `<div class="header-container"><h4>${parseRichText(
                            node.children
                        )}</h4></div>`;
                    case "h5":
                        return `<div class="header-container"><h5>${parseRichText(
                            node.children
                        )}</h5></div>`;
                    case "h6":
                        return `<div class="header-container"><h6>${parseRichText(
                            node.children
                        )}</h6></div>`;
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
                        return `<div style="padding-left: 2rem">${parseRichText(
                            node.children
                        )}</div>`;
                    }
                    case "relationship": {
                        if (node.relationTo === "news") {
                            return `<a href="${node.value.id}" target="_blank">${node.value.title}</a>`;
                        } else return "";
                    }
                    default: {
                        const parsed = parseRichText(node.children);
                        if (parsed) return `<p>${parsed}</p>`;
                        return "";
                    }
                }
            })
            .join("");
    }

    return "";
};

export { parseRichText };
