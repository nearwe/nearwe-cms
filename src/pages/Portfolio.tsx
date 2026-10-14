import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowDownRight, ArrowRight, Bot, BriefcaseBusiness, Building2, Code2, Database, MapPin, Workflow } from "lucide-react";

const clients = [
    { name: "Cresco", detail: "Business client", logo: "/assets/cresco.png" },
    { name: "Cloudflare", detail: "Technology client", logo: "https://cdn.simpleicons.org/cloudflare/F38020", style: "text-2xl font-bold tracking-tight text-white" },
    { name: "Salesforce", detail: "Business client", logo: "/assets/Salesforce-Logo.png" },
    { name: "Leading oil corporation", detail: "India · Energy", style: "text-sm font-bold uppercase tracking-[0.12em] text-white" },
    { name: "Oracle", detail: "United States · Technology", logo: "/assets/Oracle-Logo-1.png" },
];

const work = [
    {
        number: "01",
        category: "CUSTOM BUSINESS SOFTWARE",
        title: "Purpose-built platforms for real workflows",
        description: "Custom web software designed around each business: clear operational workflows, role-based access, and integrations that fit the way teams already work.",
        Icon: Code2,
        tags: ["Custom web apps", "API integrations", "Business workflows"],
    },
    {
        number: "02",
        category: "CRM & CUSTOMER OPERATIONS",
        title: "Customer relationships, all in one place",
        description: "CRM implementations and tailored customer-management tools that help teams organize accounts, track conversations, and keep work moving.",
        Icon: BriefcaseBusiness,
        tags: ["CRM", "Sales operations", "Data management"],
    },
    {
        number: "03",
        category: "CMS & ADMIN SYSTEMS",
        title: "Content and operations made manageable",
        description: "Flexible CMS experiences and secure admin dashboards for managing content, users, categories, reporting, and day-to-day operations.",
        Icon: Database,
        tags: ["CMS", "Admin dashboards", "Reporting"],
    },
];

const products = [
    { name: "NearWe", detail: "Local events and community", href: "/nearwe-app", Icon: MapPin, accent: "text-cyan-200" },
    { name: "Vestora AI", detail: "AI-powered market intelligence", href: "/vestora-ai", Icon: Bot, accent: "text-emerald-200" },
    { name: "Wayyo", detail: "Windows desktop automation", href: "/wayyo", Icon: Workflow, accent: "text-violet-200" },
];

export default function Portfolio() {
    return (
        <main className="min-h-screen overflow-hidden bg-[#090d17] px-4 py-8 text-white sm:px-6 sm:py-12">
            <Helmet>
                <title>Portfolio | NearWe Labs</title>
                <meta name="description" content="Explore custom CRM, CMS, business software, and products built by NearWe Labs." />
                <meta property="og:title" content="Portfolio | NearWe Labs" />
                <meta property="og:description" content="Custom software, client work, and products from NearWe Labs." />
                <link rel="canonical" href="https://nearwe.in/portfolio" />
            </Helmet>

            <div className="mx-auto max-w-6xl">
                <header className="mb-16 flex items-center justify-between gap-4 border-b border-white/10 pb-5">
                    <Link to="/" className="font-semibold text-white transition hover:text-cyan-300">NearWe <span className="text-gray-500">Labs</span></Link>
                    <Link to="/contact" className="inline-flex items-center gap-1 text-sm text-gray-300 transition hover:text-white">Start a project <ArrowRight className="h-4 w-4" /></Link>
                </header>

                <section className="relative mb-20 grid gap-10 border-b border-white/10 pb-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
                    <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-12 h-64 w-64 rounded-full bg-cyan-400/[0.08] blur-3xl" />
                    <div className="relative">
                        <p className="mb-5 text-xs font-bold uppercase tracking-[0.16em] text-cyan-300">Selected work · NearWe Labs</p>
                        <h1 className="max-w-3xl text-4xl font-bold leading-[1.08] sm:text-6xl">Software built around the way work gets done.</h1>
                    </div>
                    <div className="relative">
                        <p className="max-w-xl text-base leading-relaxed text-gray-400">From CRM and CMS platforms to custom business software and our own products, we turn complex needs into useful digital tools.</p>
                        <a href="#selected-work" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 transition hover:text-white">Explore selected work <ArrowDownRight className="h-4 w-4" /></a>
                    </div>
                </section>

                <section aria-labelledby="clients-heading" className="mb-20">
                    <div className="mb-7 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
                        <div>
                            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-300">Collaborations</p>
                            <h2 id="clients-heading" className="text-xl font-semibold">Clients we’ve worked with</h2>
                        </div>
                        <p className="text-xs text-gray-500">Selected client names and sectors</p>
                    </div>
                    <div className="grid grid-cols-2 border-l border-t border-white/10 sm:grid-cols-3 lg:grid-cols-5">
                        {clients.map((client) => (
                            <div key={client.name} className="flex min-h-28 flex-col justify-center gap-2 border-b border-r border-white/10 bg-white/[0.02] px-5 py-5 sm:px-6">
                                {client.logo ? <img src={client.logo} alt={`${client.name} logo`} className={`h-20 w-auto max-w-[150px] object-contain object-left ${client.name === "Cresco" ? "brightness-0 invert" : ""}`} /> : <span className={client.style}>{client.name}</span>}
                                <span className="text-[10px] uppercase tracking-[0.12em] text-gray-500">{client.detail}</span>
                            </div>
                        ))}
                    </div>
                </section>

                <section id="selected-work" aria-labelledby="work-heading" className="mb-20 scroll-mt-8">
                    <div className="mb-8 flex items-end justify-between gap-4">
                        <div>
                            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-300">What we build</p>
                            <h2 id="work-heading" className="text-2xl font-bold sm:text-3xl">Client work, made practical.</h2>
                        </div>
                        <Building2 className="mb-1 hidden h-6 w-6 text-gray-500 sm:block" />
                    </div>
                    <div className="divide-y divide-white/10 border-y border-white/10">
                        {work.map(({ number, category, title, description, Icon, tags }) => (
                            <article key={number} className="grid gap-5 py-7 sm:grid-cols-[56px_1fr_auto] sm:gap-7 sm:py-9">
                                <span className="pt-1 font-mono text-xs text-cyan-300">{number}</span>
                                <div>
                                    <p className="mb-2 text-[10px] font-bold tracking-[0.14em] text-gray-500">{category}</p>
                                    <h3 className="text-xl font-semibold sm:text-2xl">{title}</h3>
                                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-400">{description}</p>
                                    <ul className="mt-5 flex flex-wrap gap-2">
                                        {tags.map((tag) => <li key={tag} className="border border-white/10 px-2.5 py-1 text-[11px] text-gray-400">{tag}</li>)}
                                    </ul>
                                </div>
                                <Icon className="hidden h-6 w-6 text-cyan-200/70 sm:mt-1 sm:block" aria-hidden="true" />
                            </article>
                        ))}
                    </div>
                </section>

                <section aria-labelledby="products-heading" className="mb-20">
                    <div className="mb-7">
                        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-cyan-300">Built in-house</p>
                        <h2 id="products-heading" className="text-2xl font-bold sm:text-3xl">Our products, out in the world.</h2>
                    </div>
                    <div className="grid border-l border-t border-white/10 md:grid-cols-3">
                        {products.map(({ name, detail, href, Icon, accent }) => (
                            <Link key={name} to={href} className="group border-b border-r border-white/10 bg-white/[0.02] p-6 transition-colors hover:bg-white/[0.045] sm:p-7">
                                <div className="mb-8 flex items-center justify-between">
                                    <Icon className={`h-6 w-6 ${accent}`} aria-hidden="true" />
                                    <ArrowRight className="h-4 w-4 text-gray-600 transition group-hover:translate-x-1 group-hover:text-cyan-200" />
                                </div>
                                <h3 className="text-xl font-semibold">{name}</h3>
                                <p className="mt-2 text-sm text-gray-400">{detail}</p>
                            </Link>
                        ))}
                    </div>
                </section>

                <section className="flex flex-col justify-between gap-5 border-t border-white/10 pt-7 sm:flex-row sm:items-center">
                    <div><h2 className="text-lg font-semibold">Have a project in mind?</h2><p className="mt-1 text-sm text-gray-400">Let’s shape the right solution for your team.</p></div>
                    <Link to="/contact" className="inline-flex w-fit items-center gap-2 bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-200">Talk to our team <ArrowRight className="h-4 w-4" /></Link>
                </section>
            </div>
        </main>
    );
}