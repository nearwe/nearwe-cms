"use client";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Globe,
    Smartphone,
    Server,
    Paintbrush,
    ShoppingCart,
    Cloud,
    Search,
    GitBranch,
    Database,
    Shield,
    Layers,
    ArrowRight,
    CheckCircle,
    Zap,
    Star,
    MessageCircle,
} from "lucide-react";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";



export const services = [
    {
        icon: Globe,
        title: "Web Development",
        tag: "Core",
        desc: "Full-stack web apps built for speed, scale, and SEO. From landing pages to complex SaaS platforms — React, Next.js, Node.js, PHP.",
        highlights: [
            "React / Next.js frontends",
            "Node.js & PHP backends",
            "REST API architecture",
            "Performance & Core Web Vitals",
        ],
        gradient: "from-cyan-50 to-blue-100",
        iconColor: "text-cyan-600",
        border: "border-slate-200",
        tagColor: "bg-cyan-50 text-cyan-700 border-cyan-200",
    },
    {
        icon: Smartphone,
        title: "Mobile App Development",
        tag: "Mobile",
        desc: "Cross-platform iOS & Android apps using React Native and Flutter. Ship once, run everywhere — with native-level performance.",
        highlights: [
            "React Native & Flutter",
            "iOS & Android publishing",
            "Real-time features",
            "Secure API integration",
        ],
        gradient: "from-blue-50 to-indigo-100",
        iconColor: "text-blue-600",
        border: "border-slate-200",
        tagColor: "bg-blue-50 text-blue-700 border-blue-200",
    },
    {
        icon: ShoppingCart,
        title: "WordPress & E-commerce",
        tag: "CMS",
        desc: "Custom WordPress themes, plugins, and WooCommerce stores built for conversions, speed, and easy management.",
        highlights: [
            "Custom themes & plugins",
            "WooCommerce setup",
            "Performance optimization",
            "SEO-first architecture",
        ],
        gradient: "from-orange-50 to-amber-100",
        iconColor: "text-orange-600",
        border: "border-slate-200",
        tagColor: "bg-orange-50 text-orange-700 border-orange-200",
    },
    {
        icon: Paintbrush,
        title: "UI/UX Design",
        tag: "Design",
        desc: "End-to-end design workflows — from wireframes to pixel-perfect prototypes. Figma, Adobe XD, Photoshop, and Illustrator.",
        highlights: [
            "Wireframing & prototyping",
            "Design systems",
            "Figma & Adobe XD",
            "Design-to-code handoff",
        ],
        gradient: "from-pink-50 to-rose-100",
        iconColor: "text-pink-600",
        border: "border-slate-200",
        tagColor: "bg-pink-50 text-pink-700 border-pink-200",
    },
    {
        icon: Cloud,
        title: "Cloud & DevOps",
        tag: "DevOps",
        desc: "CI/CD pipelines, Docker containerization, cloud infrastructure setup, domain & DNS management — production-ready from day one.",
        highlights: [
            "Azure DevOps CI/CD",
            "Docker & containerization",
            "Server & DNS management",
            "Nginx / Apache config",
        ],
        gradient: "from-sky-50 to-blue-100",
        iconColor: "text-sky-600",
        border: "border-slate-200",
        tagColor: "bg-sky-50 text-sky-700 border-sky-200",
    },
    {
        icon: Search,
        title: "SEO & Performance",
        tag: "Growth",
        desc: "Technical SEO audits, Core Web Vitals optimization, CDN strategies, and caching setups that drive organic traffic and rankings.",
        highlights: [
            "Technical SEO audits",
            "Core Web Vitals fixes",
            "CDN & caching strategies",
            "Analytics & Search Console",
        ],
        gradient: "from-green-50 to-emerald-100",
        iconColor: "text-green-600",
        border: "border-slate-200",
        tagColor: "bg-green-50 text-green-700 border-green-200",
    },
    {
        icon: Database,
        title: "Database Architecture",
        tag: "Backend",
        desc: "Robust, optimized database design and management using MongoDB and MySQL for fast, reliable, and scalable data layers.",
        highlights: [
            "MongoDB & MySQL",
            "Schema design & indexing",
            "Query optimization",
            "Data migration support",
        ],
        gradient: "from-violet-50 to-purple-100",
        iconColor: "text-violet-600",
        border: "border-slate-200",
        tagColor: "bg-violet-50 text-violet-700 border-violet-200",
    },
    {
        icon: Shield,
        title: "Security & Authentication",
        tag: "Security",
        desc: "Secure auth systems, role-based access control, API security best practices, and payment gateway integrations done right.",
        highlights: [
            "JWT & OAuth2 auth",
            "Role-based access control",
            "Payment gateway integration",
            "API security hardening",
        ],
        gradient: "from-red-50 to-rose-100",
        iconColor: "text-red-600",
        border: "border-slate-200",
        tagColor: "bg-red-50 text-red-700 border-red-200",
    },
    {
        icon: Layers,
        title: "SaaS Product Development",
        tag: "Product",
        desc: "Got a product idea? We take it from concept to a fully containerized, scalable SaaS — architecture, development, and launch.",
        highlights: [
            "End-to-end product builds",
            "Scalable SaaS architecture",
            "Multi-tenant systems",
            "Subscription & billing setup",
        ],
        gradient: "from-teal-50 to-cyan-100",
        iconColor: "text-teal-600",
        border: "border-slate-200",
        tagColor: "bg-teal-50 text-teal-700 border-teal-200",
    },
    {
        icon: GitBranch,
        title: "API Development & Integration",
        tag: "Backend",
        desc: "Clean, well-documented REST APIs and seamless third-party integrations — Firebase, payment systems, analytics, and more.",
        highlights: [
            "RESTful API design",
            "Third-party integrations",
            "Firebase & real-time APIs",
            "Postman documentation",
        ],
        gradient: "from-amber-50 to-yellow-100",
        iconColor: "text-amber-600",
        border: "border-slate-200",
        tagColor: "bg-amber-50 text-amber-700 border-amber-200",
    },
    {
        icon: Server,
        title: "Server & Infrastructure Setup",
        tag: "DevOps",
        desc: "Full server provisioning, environment configuration, and ongoing infrastructure management so your app stays online and fast.",
        highlights: [
            "VPS & cloud provisioning",
            "Multi-service Docker setups",
            "SSL & domain configuration",
            "Monitoring & uptime",
        ],
        gradient: "from-slate-50 to-gray-100",
        iconColor: "text-slate-600",
        border: "border-slate-200",
        tagColor: "bg-slate-50 text-slate-700 border-slate-200",
    },
    {
        icon: MessageCircle,
        title: "Tech Consulting & Code Review",
        tag: "Consulting",
        desc: "Need a second opinion on your architecture? We provide expert reviews, mentoring for dev teams, and strategic tech planning.",
        highlights: [
            "Architecture consulting",
            "Code quality audits",
            "Team mentoring",
            "Tech stack recommendations",
        ],
        gradient: "from-indigo-50 to-blue-100",
        iconColor: "text-indigo-600",
        border: "border-slate-200",
        tagColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
    },
];

const stats = [
    { value: "7+", label: "Years Experience" },
    { value: "50+", label: "Projects Delivered" },
    { value: "15+", label: "Technologies" },
    { value: "100%", label: "Client Satisfaction" },
];

const techStack = [
    "React.js", "Next.js", "Node.js", "React Native", "Flutter",
    "PHP", "WordPress", "MongoDB", "MySQL", "Docker",
    "Azure DevOps", "Figma", "Tailwind CSS", "Firebase", "Git",
];

export default function ServicesAgencyPage() {
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="bg-white text-slate-900 font-sans min-h-screen overflow-hidden">
            <SiteHeader />

            {/* HERO */}
            <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-blue-50/70 to-white pt-36 pb-20 px-4 sm:px-6 text-center">
                <div
                    className="pointer-events-none absolute inset-0"
                    aria-hidden="true"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(29,78,216,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(29,78,216,0.05) 1px, transparent 1px)",
                        backgroundSize: "56px 56px",
                        maskImage: "radial-gradient(ellipse at top, black 30%, transparent 75%)",
                        WebkitMaskImage: "radial-gradient(ellipse at top, black 30%, transparent 75%)",
                    }}
                />
                <div
                    className={`relative transition-all duration-1000 transform ${
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                >
                    <div className="mb-8 inline-flex rounded-lg border border-slate-200 bg-white p-1 shadow-sm" role="tablist" aria-label="Service type">
                        <button
                            type="button"
                            role="tab"
                            aria-selected="true"
                            onClick={() => navigate("/companyservices")}
                            className="rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white"
                        >
                            Company Services
                        </button>
                        <button
                            type="button"
                            role="tab"
                            aria-selected="false"
                            onClick={() => navigate("/services?tab=app")}
                            className="rounded-md px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:text-slate-900"
                        >
                            App Services
                        </button>
                    </div>

                    <div className="flex justify-center">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-200 rounded-full mb-6">
                            <Zap className="w-4 h-4 text-blue-700" />
                            <span className="text-blue-700 font-semibold text-sm">
                                Full Stack Development Services
                            </span>
                        </div>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.08] max-w-5xl mx-auto text-slate-900">
                        We Build. We Ship.{" "}
                        <span className="bg-gradient-to-r from-blue-700 to-sky-600 bg-clip-text text-transparent">
                            You Scale.
                        </span>
                    </h1>

                    <p className="text-slate-600 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
                        From idea to production — web apps, mobile apps, design, DevOps, and everything in between.
                        7+ years of experience. Real results.
                    </p>

                    <button
                        type="button"
                        onClick={() => window.location.href = "mailto:kevinponds007@gmail.com"}
                        className="group inline-flex items-center gap-2 px-8 py-4 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-md shadow-lg shadow-blue-900/15 transition-all duration-300"
                    >
                        Get Quotation By NearWe AI
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </section>

            {/* STATS */}
            <section className="py-14 px-4 sm:px-6 bg-white">
                <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    {stats.map((s, i) => (
                        <div key={i} className={`text-center p-6 sm:p-8 ${i % 2 ? "border-l" : ""} ${i > 1 ? "border-t md:border-t-0" : ""} ${i === 2 ? "md:border-l" : ""} border-slate-200`}>
                            <div className="text-3xl sm:text-4xl font-bold tracking-tight text-blue-700 mb-1">
                                {s.value}
                            </div>
                            <div className="text-slate-600 text-sm font-medium">{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* SERVICES GRID */}
            <section className="px-4 sm:px-6 py-20 max-w-7xl mx-auto">
                <div className="text-center mb-14">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">Capabilities</p>
                    <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4 text-slate-900">
                        What We Do
                    </h2>
                    <p className="text-slate-600 text-lg">
                        A complete range of services to take your product from zero to launch
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, i) => (
                        <div
                            key={i}
                            className="group relative p-7 bg-white border border-slate-200 rounded-2xl shadow-sm
                                hover:border-blue-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/70
                                transition-all duration-300"
                        >
                            <div className="relative z-10">
                                <div className="flex items-start justify-between mb-5">
                                    <div className={`w-12 h-12 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center ring-1 ring-slate-200/70 group-hover:scale-105 transition-transform duration-300`}>
                                        <service.icon className={`w-6 h-6 ${service.iconColor}`} />
                                    </div>
                                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${service.tagColor}`}>
                                        {service.tag}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold tracking-tight text-slate-900 mb-3">
                                    {service.title}
                                </h3>

                                <p className="text-slate-600 text-sm leading-relaxed mb-5">
                                    {service.desc}
                                </p>

                                <ul className="space-y-2 border-t border-slate-100 pt-5">
                                    {service.highlights.map((h, j) => (
                                        <li key={j} className="flex items-start gap-2 text-sm text-slate-700">
                                            <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                                            {h}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* TECH STACK */}
            <section className="py-20 px-4 sm:px-6 bg-slate-50 border-y border-slate-200">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-slate-900">
                        Our Tech Stack
                    </h2>
                    <p className="text-slate-600 mb-10">The tools and technologies we work with every day</p>

                    <div className="flex flex-wrap justify-center gap-3">
                        {techStack.map((tech, i) => (
                            <span
                                key={i}
                                className="px-5 py-2 bg-white border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-700 rounded-full text-sm font-medium shadow-sm transition-all duration-200 cursor-default"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* WHY US */}
            <section className="py-20 px-4 sm:px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-slate-900">
                            Why Work With Us
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: Star,
                                title: "7+ Years of Real Experience",
                                desc: "Not just tutorials and side projects — actual production systems, real clients, and shipped products.",
                                color: "text-amber-600 bg-amber-50",
                            },
                            {
                                icon: Zap,
                                title: "Full-Cycle Ownership",
                                desc: "We handle design, development, deployment, and everything in between — one team, zero handoff chaos.",
                                color: "text-blue-700 bg-blue-50",
                            },
                            {
                                icon: Shield,
                                title: "Built to Last",
                                desc: "Clean code, proper architecture, security best practices — your codebase won't turn into a nightmare.",
                                color: "text-emerald-600 bg-emerald-50",
                            },
                        ].map((item, i) => (
                            <div key={i} className="p-7 bg-white border border-slate-200 rounded-2xl text-center shadow-sm">
                                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 ${item.color}`}>
                                    <item.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="px-4 sm:px-6 pb-24">
                <div className="relative max-w-6xl mx-auto overflow-hidden rounded-3xl bg-gradient-to-br from-blue-800 to-blue-950 px-6 py-16 text-center text-white shadow-xl shadow-blue-900/20 sm:px-12">
                    <div className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full bg-sky-400/20 blur-[90px]" aria-hidden="true" />
                    <div className="relative max-w-3xl mx-auto">
                        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-6">
                            Have a Project in Mind?
                        </h2>
                        <p className="text-lg sm:text-xl text-blue-100 mb-10">
                            Let's talk about what you're building. We'll figure out the best path forward together.
                        </p>

                        <button
                            type="button"
                            onClick={() => window.location.href = "mailto:kevinponds007@gmail.com"}
                            className="group inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-blue-50 text-slate-900 font-semibold rounded-md transition-all duration-300 text-lg"
                        >
                            Get in Touch
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <p className="mt-6 text-blue-200 text-sm">
                            Or email directly at{" "}
                            <a href="mailto:support@nearwe.in" className="text-white font-medium hover:text-blue-100 underline underline-offset-4">
                                support@nearwe.in
                            </a>
                        </p>
                    </div>
                </div>
            </section>

            <SiteFooter />
        </div>
    );
}
