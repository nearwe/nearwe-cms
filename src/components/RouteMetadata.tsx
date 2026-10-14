import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

type PageMetadata = {
    title: string;
    description: string;
};

const metadataByPath = require("../utils/routeMetadata.json") as Record<string, PageMetadata>;

export default function RouteMetadata() {
    const { pathname } = useLocation();
    const normalizedPath = pathname.replace(/\/+$/, "") || "/";
    const page = metadataByPath[normalizedPath] ?? metadataByPath["/"];
    const pageUrl = `https://www.nearwe.in${normalizedPath === "/" ? "" : normalizedPath}`;

    return (
        <Helmet>
            <title>{page.title}</title>
            <meta name="description" content={page.description} />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="NearWe Labs" />
            <meta property="og:title" content={page.title} />
            <meta property="og:description" content={page.description} />
            <meta property="og:url" content={pageUrl} />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content={page.title} />
            <meta name="twitter:description" content={page.description} />
            <link rel="canonical" href={pageUrl} />
        </Helmet>
    );
}