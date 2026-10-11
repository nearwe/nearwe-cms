import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Bot, MapPin, Workflow } from "lucide-react";

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

export default function Products() {
    return (
        <main className="min-h-screen overflow-hidden bg-[#090d17] px-4 py-10 text-white sm:px-6 sm:py-14">
            <Helmet>
                <title>Products | NearWe Labs</title>
                <meta name="description" content="Explore products built by NearWe Labs: NearWe App, Vestora AI and Wayyo, a Windows desktop automation workspace." />
                <meta property="og:title" content="Products by NearWe Labs" />
                <meta property="og:description" content="Community, AI and desktop automation products built by NearWe Labs." />
                <link rel="canonical" href="https://nearwe.in/products" />
            </Helmet>

            <div className="mx-auto max-w-6xl">
                <header className="mb-16 flex items-center justify-between gap-4 border-b border-white/10 pb-5">
                    <Link to="/" className="font-semibold text-white transition hover:text-cyan-300">NearWe <span className="text-gray-500">Labs</span></Link>
                    <Link to="/contact" className="text-sm text-gray-300 transition hover:text-white">Contact us <ArrowRight className="ml-1 inline h-4 w-4" /></Link>
                </header>

                <section className="mb-12 max-w-3xl">
                    <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-cyan-300">Made at NearWe Labs</p>
                    <h1 className="text-4xl font-bold leading-tight sm:text-6xl">Products for a more connected, capable world.</h1>
                    <p className="mt-5 max-w-2xl text-base leading-relaxed text-gray-400">From discovering what is happening nearby to automating the work you repeat, explore the products our team is building.</p>
                </section>

                <section aria-label="NearWe Labs products" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {products.map(({ name, type, description, href, action, Icon, color }) => (
                        <article key={name} className="flex min-h-[310px] flex-col border border-white/10 bg-white/[0.035] p-6 transition-colors hover:border-white/20 sm:p-7">
                            <div className="mb-8 flex items-start justify-between gap-3">
                                <span className={`grid h-12 w-12 place-items-center rounded-xl border ${color === "cyan" ? "border-cyan-300/20 bg-cyan-300/10 text-cyan-200" : color === "emerald" ? "border-emerald-300/20 bg-emerald-300/10 text-emerald-200" : "border-violet-300/20 bg-violet-300/10 text-violet-200"}`}>
                                    <Icon className="h-6 w-6" />
                                </span>
                                {name === "Wayyo" && <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-200">AVAILABLE</span>}
                            </div>
                            <p className="mb-2 text-[10px] font-bold tracking-[0.12em] text-gray-500">{type}</p>
                            <h2 className="text-2xl font-bold">{name}</h2>
                            <p className="mb-7 mt-3 flex-1 text-sm leading-relaxed text-gray-400">{description}</p>
                            <Link to={href} className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-cyan-200 transition hover:text-white">
                                {action} <ArrowRight className="h-4 w-4" />
                            </Link>
                        </article>
                    ))}
                </section>

                <section className="mt-16 flex flex-col justify-between gap-5 border-t border-white/10 pt-7 sm:flex-row sm:items-center">
                    <div><h2 className="text-lg font-semibold">Building something with us?</h2><p className="mt-1 text-sm text-gray-400">Reach out to discuss a product, partnership or client project.</p></div>
                    <Link to="/contact" className="inline-flex w-fit items-center gap-2 rounded-full bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200">Contact NearWe <ArrowRight className="h-4 w-4" /></Link>
                </section>
            </div>
        </main>
    );
}