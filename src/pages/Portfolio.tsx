import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowDownRight, ArrowRight, Bot, BriefcaseBusiness, Building2, Code2, Database, MapPin, Workflow } from "lucide-react";
import { clients } from "../components/ClientsCarousel";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

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
    { name: "NearWe", detail: "Local events and community", href: "/nearwe-app", Icon: MapPin, accent: "text-sky-700 bg-sky-50" },
    { name: "Vestora AI", detail: "AI-powered market intelligence", href: "/vestora-ai", Icon: Bot, accent: "text-emerald-700 bg-emerald-50" },
    { name: "Wayyo", detail: "Windows desktop automation", href: "/wayyo", Icon: Workflow, accent: "text-indigo-700 bg-indigo-50" },
];

export default function Portfolio() {
    return (
        <main className="min-h-screen overflow-hidden bg-white text-slate-900">
            <Helmet>
                <title>Portfolio | NearWe Labs</title>
                <meta name="description" content="Explore custom CRM, CMS, business software, and products built by NearWe Labs." />
                <meta property="og:title" content="Portfolio | NearWe Labs" />
                <meta property="og:description" content="Custom software, client work, and products from NearWe Labs." />
                <link rel="canonical" href="https://nearwe.in/portfolio" />
            </Helmet>

            <SiteHeader />
            <div className="border-b border-slate-200 bg-gradient-to-b from-blue-50/70 to-white px-4 pt-36 sm:px-6">
            <div className="mx-auto max-w-6xl">
                <section className="relative grid gap-10 pb-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
                    <div className="relative">
                        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">Selected work · NearWe Labs</p>
                        <h1 className="max-w-3xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl">Software built around the way work gets done.</h1>
                    </div>
                    <div className="relative">
                        <p className="max-w-xl text-lg leading-relaxed text-slate-600">From CRM and CMS platforms to custom business software and our own products, we turn complex needs into useful digital tools.</p>
                        <a href="#selected-work" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 transition hover:text-blue-900">Explore selected work <ArrowDownRight className="h-4 w-4" /></a>
                    </div>
                </section>
            </div>
            </div>

            <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
                <section aria-labelledby="clients-heading" className="mb-20">
                    <div className="mb-7 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
                        <div>
                            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-700">Collaborations</p>
                            <h2 id="clients-heading" className="text-2xl font-bold tracking-tight">Clients we’ve worked with</h2>
                        </div>
                        <p className="text-xs text-slate-500">Selected client names and sectors</p>
                    </div>
                    <div className="grid grid-cols-2 overflow-hidden rounded-2xl border-l border-t border-slate-200 sm:grid-cols-3 lg:grid-cols-6">
                        {clients.map((client) => (
                            <div key={client.name} className="flex min-h-28 flex-col justify-center gap-2 border-b border-r border-slate-200 bg-white px-5 py-5 transition-colors hover:bg-slate-50 sm:px-6">
                                {client.logo ? <img src={client.logo} alt={`${client.name} logo`} className="h-20 w-auto max-w-[150px] object-contain object-left" /> : <span className={client.style}>{client.name}</span>}
                                <span className="text-[10px] uppercase tracking-[0.12em] text-slate-500">{client.detail}</span>
                            </div>
                        ))}
                    </div>
                </section>

                <section id="selected-work" aria-labelledby="work-heading" className="mb-20 scroll-mt-24">
                    <div className="mb-8 flex items-end justify-between gap-4">
                        <div>
                            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-700">What we build</p>
                            <h2 id="work-heading" className="text-2xl font-bold tracking-tight sm:text-3xl">Client work, made practical.</h2>
                        </div>
                        <Building2 className="mb-1 hidden h-6 w-6 text-slate-400 sm:block" />
                    </div>
                    <div className="divide-y divide-slate-200 border-y border-slate-200">
                        {work.map(({ number, category, title, description, Icon, tags }) => (
                            <article key={number} className="grid gap-5 py-7 sm:grid-cols-[56px_1fr_auto] sm:gap-7 sm:py-9">
                                <span className="pt-1 font-mono text-sm font-semibold text-blue-700">{number}</span>
                                <div>
                                    <p className="mb-2 text-[11px] font-semibold tracking-[0.14em] text-slate-500">{category}</p>
                                    <h3 className="text-xl font-semibold sm:text-2xl">{title}</h3>
                                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">{description}</p>
                                    <ul className="mt-5 flex flex-wrap gap-2">
                                        {tags.map((tag) => <li key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-medium text-slate-600">{tag}</li>)}
                                    </ul>
                                </div>
                                <Icon className="hidden h-6 w-6 text-blue-600 sm:mt-1 sm:block" aria-hidden="true" />
                            </article>
                        ))}
                    </div>
                </section>

                <section aria-labelledby="products-heading" className="mb-20">
                    <div className="mb-7">
                        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-blue-700">Built in-house</p>
                        <h2 id="products-heading" className="text-2xl font-bold tracking-tight sm:text-3xl">Our products, out in the world.</h2>
                    </div>
                    <div className="grid gap-5 md:grid-cols-3">
                        {products.map(({ name, detail, href, Icon, accent }) => (
                            <Link key={name} to={href} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-200/70 sm:p-7">
                                <div className="mb-8 flex items-center justify-between">
                                    <span className={`grid h-11 w-11 place-items-center rounded-xl ${accent}`}><Icon className="h-5 w-5" aria-hidden="true" /></span>
                                    <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-1 group-hover:text-blue-700" />
                                </div>
                                <h3 className="text-xl font-semibold">{name}</h3>
                                <p className="mt-2 text-sm text-slate-600">{detail}</p>
                            </Link>
                        ))}
                    </div>
                </section>

                <section className="flex flex-col justify-between gap-5 rounded-2xl bg-slate-900 px-6 py-8 text-white sm:flex-row sm:items-center sm:px-10">
                    <div><h2 className="text-xl font-semibold">Have a project in mind?</h2><p className="mt-1 text-sm text-slate-300">Let’s shape the right solution for your team.</p></div>
                    <Link to="/contact" className="inline-flex w-fit items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-blue-50">Talk to our team <ArrowRight className="h-4 w-4" /></Link>
                </section>
            </div>
            <SiteFooter />
        </main>
    );
}