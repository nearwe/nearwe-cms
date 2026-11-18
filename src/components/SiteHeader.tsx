import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowRight, Menu, X } from "lucide-react";
import nearweLogo from "../assets/logo/logo-removebg.png";

export const SITE_NAV = [
    { label: "Services", to: "/companyservices" },
    { label: "Products", to: "/products" },
    { label: "Portfolio", to: "/portfolio" },
    { label: "About", to: "/aboutus" },
    { label: "Careers", to: "/careers" },
    { label: "Contact", to: "/contact" },
];

export function BrandMark({ className = "" }: { className?: string }) {
    return (
        <span className={`inline-flex items-center gap-2.5 ${className}`}>
            <img src={nearweLogo} alt="" className="h-8 w-auto object-contain brightness-0" />
            <span className="text-[17px] font-bold tracking-tight text-slate-900">
                NearWe <span className="font-semibold text-blue-700">Labs</span>
            </span>
        </span>
    );
}

/** Global light header used across all NearWe Labs pages (except Wayyo). */
export default function SiteHeader() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => setOpen(false), [pathname]);

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    const linkCls = ({ isActive }: { isActive: boolean }) =>
        `relative px-3.5 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
            isActive ? "text-blue-700" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
        }`;

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 border-b bg-white/90 backdrop-blur-xl transition-shadow duration-300 ${
                scrolled || open ? "border-slate-200 shadow-[0_1px_12px_rgba(15,23,42,0.06)]" : "border-slate-200/70"
            }`}
        >
            <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6" aria-label="Main">
                <Link to="/" aria-label="NearWe Labs home">
                    <BrandMark />
                </Link>

                <div className="hidden items-center gap-1 lg:flex">
                    {SITE_NAV.map((item) => (
                        <NavLink key={item.to} to={item.to} className={linkCls}>
                            {item.label}
                        </NavLink>
                    ))}
                </div>

                <div className="hidden items-center gap-2 lg:flex">
                    <Link
                        to="/contact"
                        className="inline-flex items-center gap-1.5 rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-800"
                    >
                        Talk to us <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                <button
                    type="button"
                    className="rounded-md p-2 text-slate-700 hover:bg-slate-100 lg:hidden"
                    onClick={() => setOpen((o) => !o)}
                    aria-label={open ? "Close menu" : "Open menu"}
                    aria-expanded={open}
                >
                    {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </nav>

            <div className={`overflow-hidden transition-all duration-300 lg:hidden ${open ? "max-h-[32rem]" : "max-h-0"}`}>
                <div className="flex flex-col gap-1 border-t border-slate-200 bg-white px-4 pb-5 pt-3">
                    {SITE_NAV.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                `rounded-md px-4 py-3 text-sm font-medium transition-colors ${
                                    isActive ? "bg-blue-50 text-blue-700" : "text-slate-700 hover:bg-slate-50"
                                }`
                            }
                        >
                            {item.label}
                        </NavLink>
                    ))}
                    <div className="mt-3">
                        <Link to="/contact" className="block rounded-md bg-blue-700 py-3 text-center text-sm font-semibold text-white">
                            Talk to us
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
