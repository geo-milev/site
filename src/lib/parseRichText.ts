import sanitizeHtml from "sanitize-html";
import { env } from "$env/dynamic/public";

const isNonEmptyString = (s: string) => s && !s.match(/^\s*$/);

const parseRichText = (richText) => {
    if (richText) {
        return richText
            .map((node) => {
                if (node.text && node.text.length > 0) {
                    const sanitizedText = sanitizeHtml(node.text, {
                        allowedTags: [],
                        allowedAttributes: {},
                        disallowedTagsMode: "recursiveEscape",
                    });
                    if (!sanitizedText || sanitizedText == "") return null;

                    let text = sanitizedText;

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

                        let maxWidth;
                        let maxHeight;
                        let isNonImage = false;
                        let buttonText;

                        if (node.fields) {
                            if (node.fields.maxImageSize) {
                                maxWidth = node.fields.maxImageSize.maxWidth;
                                maxHeight = node.fields.maxImageSize.maxHeight;
                            }
                            if (node.fields.isNonImage) {
                                isNonImage = true;
                                buttonText = node.fields.buttonText;
                            }
                        }
                        if (
                            !value.mimeType.startsWith("image/") ||
                            isNonImage
                        ) {
                            let text = "";
                            if (
                                !isNonEmptyString(value.alt) &&
                                !isNonEmptyString(buttonText)
                            )
                                text = "Изтегли";
                            else if (
                                !isNonEmptyString(value.alt) &&
                                isNonEmptyString(buttonText)
                            ) {
                                text = buttonText;
                            } else {
                                text = value.alt;
                            }
                            return `<div class="button"><a href="${src}" target="_blank"><button tabindex="-1">${text}</button></a></div>`;
                        } else {
                            let style = "";

                            if (maxWidth) {
                                style += `max-width: ${maxWidth}px; `;
                            } else {
                                style += "max-width: 100%; ";
                            }
                            if (maxHeight) {
                                style += `max-height: ${maxHeight}px;`;
                            }
                            return `<img src="${src}" alt="${value.alt}" style="${style}" loading="lazy"/>`;
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
