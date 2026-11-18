import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { BrandMark } from "./SiteHeader";

const COLUMNS = [
    {
        title: "Company",
        links: [
            { label: "About Us", to: "/aboutus" },
            { label: "Careers", to: "/careers" },
            { label: "Portfolio", to: "/portfolio" },
            { label: "Contact", to: "/contact" },
        ],
    },
    {
        title: "Offerings",
        links: [
            { label: "IT Services", to: "/companyservices" },
            { label: "Products", to: "/products" },
            { label: "Wayyo", to: "/wayyo" },
            { label: "NearWe App", to: "/nearwe-app" },
            { label: "Vestora AI", to: "/vestora-ai" },
        ],
    },
    {
        title: "Legal",
        links: [
            { label: "Privacy Policy", to: "/privacy" },
            { label: "Terms & Conditions", to: "/terms" },
            { label: "Child Safety", to: "/child-safety" },
            { label: "Advertise", to: "/advertise" },
        ],
    },
];

/** Global light footer used across all NearWe Labs pages (except Wayyo). */
export default function SiteFooter() {
    return (
        <footer className="border-t border-slate-200 bg-slate-50">
            <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
                    <div className="lg:col-span-2">
                        <Link to="/" aria-label="NearWe Labs home">
                            <BrandMark />
                        </Link>
                        <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600">
                            AI-first IT consulting, engineering services and SaaS products — helping startups and enterprises build, launch and scale.
                        </p>
                        <div className="mt-5 space-y-2 text-sm text-slate-600">
                            <a href="mailto:support@nearwe.in" className="flex items-center gap-2 hover:text-blue-700">
                                <Mail className="h-4 w-4 text-slate-400" /> support@nearwe.in
                            </a>
                        </div>
                    </div>

                    {COLUMNS.map((col) => (
                        <div key={col.title}>
                            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-900">{col.title}</h4>
                            <ul className="space-y-2.5 text-sm">
                                {col.links.map((l) => (
                                    <li key={l.to}>
                                        <Link to={l.to} className="text-slate-600 transition-colors hover:text-blue-700">
                                            {l.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-6 text-sm text-slate-500 sm:flex-row">
                    <p>© {new Date().getFullYear()} NearWe Labs. All rights reserved.</p>
                    <div className="flex gap-5">
                        <Link to="/privacy" className="hover:text-blue-700">Privacy</Link>
                        <Link to="/terms" className="hover:text-blue-700">Terms</Link>
                        <Link to="/contact" className="hover:text-blue-700">Contact</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
