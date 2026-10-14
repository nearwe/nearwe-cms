const fs = require("fs");
const path = require("path");
const metadataByPath = require("../src/utils/routeMetadata.json");

const buildDirectory = path.resolve(__dirname, "../build");
const templatePath = path.join(buildDirectory, "index.html");

function escapeAttribute(value) {
    return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function replaceMeta(html, attribute, name, content) {
    const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const tagPattern = new RegExp(`<meta\\s+${attribute}="${escapedName}"[^>]*>`, "i");
    const tag = html.match(tagPattern)?.[0];

    if (!tag) {
        throw new Error(`Missing ${attribute} metadata tag: ${name}`);
    }

    const updatedTag = tag.replace(/content="[^"]*"/i, `content="${escapeAttribute(content)}"`);
    return html.replace(tagPattern, updatedTag);
}

function createRouteHtml(template, route, page) {
    const pageUrl = `https://www.nearwe.in${route === "/" ? "" : route}`;
    let html = template.replace(/<title>[^<]*<\/title>/i, `<title>${escapeAttribute(page.title)}</title>`);
    html = replaceMeta(html, "name", "description", page.description);
    html = replaceMeta(html, "property", "og:title", page.title);
    html = replaceMeta(html, "property", "og:description", page.description);
    html = replaceMeta(html, "property", "og:url", pageUrl);
    html = replaceMeta(html, "name", "twitter:title", page.title);
    html = replaceMeta(html, "name", "twitter:description", page.description);

    const canonicalPattern = /<link rel="canonical" href="[^"]*"\s*\/?\s*>/i;
    if (canonicalPattern.test(html)) {
        html = html.replace(canonicalPattern, `<link rel="canonical" href="${pageUrl}" />`);
    } else {
        html = html.replace(/<\/head>/i, `<link rel="canonical" href="${pageUrl}" /></head>`);
    }

    return html;
}

if (!fs.existsSync(templatePath)) {
    throw new Error(`Build output not found: ${templatePath}`);
}

const template = fs.readFileSync(templatePath, "utf8");

for (const [route, page] of Object.entries(metadataByPath)) {
    const outputPath = route === "/"
        ? templatePath
        : path.join(buildDirectory, route.slice(1), "index.html");

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, createRouteHtml(template, route, page));
}

console.log(`Generated route-specific HTML for ${Object.keys(metadataByPath).length} routes.`);