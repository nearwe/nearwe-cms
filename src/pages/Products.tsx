import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Bot, MapPin, Workflow } from "lucide-react";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

const products = [
    {
        name: "NearWe App",
        type: "COMMUNITY PLATFORM",
        description: "Discover nearby events, communities and experiences, and make meaningful connections in your city.",
        href: "/nearwe-app",
        action: "Explore NearWe App",
        Icon: MapPin,
        color: "cyan",
    },
    {
        name: "Vestora AI",
        type: "AI TRADING INTELLIGENCE",
        description: "Explore an AI intelligence platform for market analysis, portfolios, risk, signals and approval-led execution.",
        href: "/vestora-ai",
        action: "Explore Vestora AI",
        Icon: Bot,
        color: "emerald",
    },
    {
        name: "Wayyo",
        type: "WINDOWS AUTOMATION · AVAILABLE NOW",
        description: "Build visual workflows that schedule actions and handle repetitive desktop tasks locally on your Windows PC.",
        href: "/wayyo#download",
        action: "Download Wayyo",
        Icon: Workflow,
        color: "violet",
    },
];

const tone: Record<string, { tile: string }> = {
    cyan: { tile: "bg-sky-50 text-sky-700 ring-sky-100" },
    emerald: { tile: "bg-emerald-50 text-emerald-700 ring-emerald-100" },
    violet: { tile: "bg-indigo-50 text-indigo-700 ring-indigo-100" },
};

export default function Products() {
    return (
        <main className="min-h-screen bg-white text-slate-900">
            <Helmet>
                <title>Products | NearWe Labs</title>
                <meta name="description" content="Explore products built by NearWe Labs: NearWe App, Vestora AI and Wayyo, a Windows desktop automation workspace." />
                <meta property="og:title" content="Products by NearWe Labs" />
                <meta property="og:description" content="Community, AI and desktop automation products built by NearWe Labs." />
                <link rel="canonical" href="https://nearwe.in/products" />
            </Helmet>
            <SiteHeader />

            <section className="border-b border-slate-200 bg-gradient-to-b from-blue-50/70 to-white px-4 pb-16 pt-36 sm:px-6">
                <div className="mx-auto max-w-6xl">
                    <div className="max-w-3xl">
                        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">Made at NearWe Labs</p>
                        <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-6xl">Products for a more connected, capable world.</h1>
                        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">From discovering what is happening nearby to automating the work you repeat, explore the products our team is building.</p>
                    </div>
                </div>
            </section>

            <section className="px-4 py-16 sm:px-6">
                <div className="mx-auto max-w-6xl">
                    <div aria-label="NearWe Labs products" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {products.map(({ name, type, description, href, action, Icon, color }) => (
                            <article key={name} className="group flex min-h-[320px] flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-200/70">
                                <div className="mb-8 flex items-start justify-between gap-3">
                                    <span className={`grid h-12 w-12 place-items-center rounded-xl ring-1 ${(tone[color] ?? tone.cyan).tile}`}>
                                        <Icon className="h-6 w-6" />
                                    </span>
                                    {name === "Wayyo" && <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">AVAILABLE</span>}
                                </div>
                                <p className="mb-2 text-[11px] font-semibold tracking-[0.12em] text-slate-500">{type}</p>
                                <h2 className="text-2xl font-bold tracking-tight">{name}</h2>
                                <p className="mb-7 mt-3 flex-1 text-sm leading-relaxed text-slate-600">{description}</p>
                                <Link to={href} className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-blue-700 transition hover:text-blue-900">
                                    {action} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </article>
                        ))}
                    </div>

                    <div className="mt-16 flex flex-col justify-between gap-5 rounded-2xl bg-slate-900 px-6 py-8 text-white sm:flex-row sm:items-center sm:px-10">
                        <div><h2 className="text-xl font-semibold">Building something with us?</h2><p className="mt-1 text-sm text-slate-300">Reach out to discuss a product, partnership or client project.</p></div>
                        <Link to="/contact" className="inline-flex w-fit items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-blue-50">Contact NearWe <ArrowRight className="h-4 w-4" /></Link>
                    </div>
                </div>
            </section>

            <SiteFooter />
        </main>
    );
}
