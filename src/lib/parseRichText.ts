import sanitizeHtml from "sanitize-html";
import { env } from "$env/dynamic/public";

const parseRichText = (richText) => {
    if (richText) {
        return richText
            .map((node) => {
                if (node.text && node.text.length > 0) {
                    const sanitizedText = sanitizeHtml(node.text, {
                        disallowedTagsMode: "recursiveEscape",
                    });
                    if (!sanitizedText || sanitizedText == "") return null;

                    let text = `<span>${sanitizedText}</span>`;

                    if (node.bold) {
                        text = `<strong>${text}</strong>`;
                    }

                    if (node.code) {
                        text = `<div class="code-container"><pre><code>${text}</code></pre></div>`;
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
                        const src = env.PUBLIC_SERVER_URL + value.url;
                        if (node.fields) {
                            if (node.fields.isNonImage) {
                                return `<div class="button"><a href="${src}" target="_blank"><button tabindex="-1">${node.fields.buttonText}</button></a></div>`;
                            }
                        }
                        if (value.mimeType.startsWith("image/")) {
                            return `<img src="${src}" alt="${value.alt}" style="width: 100%" loading="lazy"/>`;
                        } else {
                            if (value.alt.match(/^\s*$/)) value.alt = "Изтегли";
                            return `<div class="button"><a href="${src}" target="_blank"><button tabindex="-1">${value.alt}</button></a></div>`;
                        }
                    }
                    case "indent": {
                        return `<div style="padding-left: 2rem">${parseRichText(
                            node.children
                        )}</div>`;
                    }
                    case "center": {
                        return `<div class="center-align">${parseRichText(
                            node.children
                        )}</div>`;
                    }
                    case "left": {
                        return `<div class="left-align">${parseRichText(
                            node.children
                        )}</div>`;
                    }
                    case "right": {
                        return `<div class="right-align">${parseRichText(
                            node.children
                        )}</div>`;
                    }
                    case "justify": {
                        return `<div class="justify-align">${parseRichText(
                            node.children
                        )}</div>`;
                    }
                    case "blockquote": {
                        return `<blockquote>${parseRichText(
                            node.children
                        )}</blockquote>`;
                    }
                    default: {
                        const parsed = parseRichText(node.children);
                        if (parsed && parsed != "") return `<p>${parsed}</p>`;
                        return "";
                    }
                }
            })
            .join("");
    }

    return "";
};

export { parseRichText };
