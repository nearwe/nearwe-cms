"use client";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
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
    MapPin,
    Users,
    Calendar,
    Sparkles,
    Bell,
} from "lucide-react";

import iosLogo from "../assets/logo/ios.png";
import playstoreLogo from "../assets/logo/playstore.png";

// ─────────────────────────────────────────────
// COMPANY SERVICES DATA
// ─────────────────────────────────────────────
const companyServices = [
    {
        icon: Globe,
        title: "Web Development",
        tag: "Core",
        desc: "Full-stack web apps built for speed, scale, and SEO. From landing pages to complex SaaS platforms — React, Next.js, Node.js, PHP.",
        highlights: ["React / Next.js frontends", "Node.js & PHP backends", "REST API architecture", "Performance & Core Web Vitals"],
        gradient: "from-cyan-500/20 to-blue-500/10",
        iconColor: "text-cyan-400",
        border: "border-cyan-500/30",
        tagColor: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
    },
    {
        icon: Smartphone,
        title: "Mobile App Development",
        tag: "Mobile",
        desc: "Cross-platform iOS & Android apps using React Native and Flutter. Ship once, run everywhere — with native-level performance.",
        highlights: ["React Native & Flutter", "iOS & Android publishing", "Real-time features", "Secure API integration"],
        gradient: "from-blue-500/20 to-indigo-500/10",
        iconColor: "text-blue-400",
        border: "border-blue-500/30",
        tagColor: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    },
    {
        icon: ShoppingCart,
        title: "WordPress & E-commerce",
        tag: "CMS",
        desc: "Custom WordPress themes, plugins, and WooCommerce stores built for conversions, speed, and easy management.",
        highlights: ["Custom themes & plugins", "WooCommerce setup", "Performance optimization", "SEO-first architecture"],
        gradient: "from-orange-500/20 to-amber-500/10",
        iconColor: "text-orange-400",
        border: "border-orange-500/30",
        tagColor: "bg-orange-500/15 text-orange-400 border-orange-500/30",
    },
    {
        icon: Paintbrush,
        title: "UI/UX Design",
        tag: "Design",
        desc: "End-to-end design workflows — from wireframes to pixel-perfect prototypes. Figma, Adobe XD, Photoshop, and Illustrator.",
        highlights: ["Wireframing & prototyping", "Design systems", "Figma & Adobe XD", "Design-to-code handoff"],
        gradient: "from-pink-500/20 to-rose-500/10",
        iconColor: "text-pink-400",
        border: "border-pink-500/30",
        tagColor: "bg-pink-500/15 text-pink-400 border-pink-500/30",
    },
    {
        icon: Cloud,
        title: "Cloud & DevOps",
        tag: "DevOps",
        desc: "CI/CD pipelines, Docker containerization, cloud infrastructure setup, domain & DNS management — production-ready from day one.",
        highlights: ["Azure DevOps CI/CD", "Docker & containerization", "Server & DNS management", "Nginx / Apache config"],
        gradient: "from-sky-500/20 to-blue-500/10",
        iconColor: "text-sky-400",
        border: "border-sky-500/30",
        tagColor: "bg-sky-500/15 text-sky-400 border-sky-500/30",
    },
    {
        icon: Search,
        title: "SEO & Performance",
        tag: "Growth",
        desc: "Technical SEO audits, Core Web Vitals optimization, CDN strategies, and caching setups that drive organic traffic and rankings.",
        highlights: ["Technical SEO audits", "Core Web Vitals fixes", "CDN & caching strategies", "Analytics & Search Console"],
        gradient: "from-green-500/20 to-emerald-500/10",
        iconColor: "text-green-400",
        border: "border-green-500/30",
        tagColor: "bg-green-500/15 text-green-400 border-green-500/30",
    },
    {
        icon: Database,
        title: "Database Architecture",
        tag: "Backend",
        desc: "Robust, optimized database design and management using MongoDB and MySQL for fast, reliable, and scalable data layers.",
        highlights: ["MongoDB & MySQL", "Schema design & indexing", "Query optimization", "Data migration support"],
        gradient: "from-violet-500/20 to-purple-500/10",
        iconColor: "text-violet-400",
        border: "border-violet-500/30",
        tagColor: "bg-violet-500/15 text-violet-400 border-violet-500/30",
    },
    {
        icon: Shield,
        title: "Security & Authentication",
        tag: "Security",
        desc: "Secure auth systems, role-based access control, API security best practices, and payment gateway integrations done right.",
        highlights: ["JWT & OAuth2 auth", "Role-based access control", "Payment gateway integration", "API security hardening"],
        gradient: "from-red-500/20 to-rose-500/10",
        iconColor: "text-red-400",
        border: "border-red-500/30",
        tagColor: "bg-red-500/15 text-red-400 border-red-500/30",
    },
    {
        icon: Layers,
        title: "SaaS Product Development",
        tag: "Product",
        desc: "Got a product idea? We take it from concept to a fully containerized, scalable SaaS — architecture, development, and launch.",
        highlights: ["End-to-end product builds", "Scalable SaaS architecture", "Multi-tenant systems", "Subscription & billing setup"],
        gradient: "from-teal-500/20 to-cyan-500/10",
        iconColor: "text-teal-400",
        border: "border-teal-500/30",
        tagColor: "bg-teal-500/15 text-teal-400 border-teal-500/30",
    },
    {
        icon: GitBranch,
        title: "API Development & Integration",
        tag: "Backend",
        desc: "Clean, well-documented REST APIs and seamless third-party integrations — Firebase, payment systems, analytics, and more.",
        highlights: ["RESTful API design", "Third-party integrations", "Firebase & real-time APIs", "Postman documentation"],
        gradient: "from-amber-500/20 to-yellow-500/10",
        iconColor: "text-amber-400",
        border: "border-amber-500/30",
        tagColor: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    },
    {
        icon: Server,
        title: "Server & Infrastructure Setup",
        tag: "DevOps",
        desc: "Full server provisioning, environment configuration, and ongoing infrastructure management so your app stays online and fast.",
        highlights: ["VPS & cloud provisioning", "Multi-service Docker setups", "SSL & domain configuration", "Monitoring & uptime"],
        gradient: "from-slate-400/20 to-gray-500/10",
        iconColor: "text-slate-400",
        border: "border-slate-500/30",
        tagColor: "bg-slate-500/15 text-slate-400 border-slate-500/30",
    },
    {
        icon: MessageCircle,
        title: "Tech Consulting & Code Review",
        tag: "Consulting",
        desc: "Need a second opinion on your architecture? We provide expert reviews, mentoring for dev teams, and strategic tech planning.",
        highlights: ["Architecture consulting", "Code quality audits", "Team mentoring", "Tech stack recommendations"],
        gradient: "from-indigo-500/20 to-blue-500/10",
        iconColor: "text-indigo-400",
        border: "border-indigo-500/30",
        tagColor: "bg-indigo-500/15 text-indigo-400 border-indigo-500/30",
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

// ─────────────────────────────────────────────
// APP SERVICES DATA
// ─────────────────────────────────────────────
const appServices = [
    {
        icon: MapPin,
        title: "Event Discovery",
        tag: "Core",
        desc: "Find events happening around you in real time. Filter by category, distance, date, or vibe — and never miss something worth showing up for.",
        highlights: ["Real-time location-based search", "Advanced filters by category & date", "Save and bookmark events"],
        gradient: "from-cyan-500/20 to-blue-500/10",
        iconColor: "text-cyan-400",
        border: "border-cyan-500/30",
    },
    {
        icon: Users,
        title: "Community Connect",
        tag: "Social",
        desc: "Meet people who share your interests. Build your local circle, follow profiles, and grow a network that actually means something.",
        highlights: ["Interest-based matchmaking", "Follow & connect with locals", "Build your community circle"],
        gradient: "from-blue-500/20 to-indigo-500/10",
        iconColor: "text-blue-400",
        border: "border-blue-500/30",
    },
    {
        icon: Calendar,
        title: "Event Hosting",
        tag: "Creator",
        desc: "Create and manage your own events in minutes. Set capacity, share details, and invite people — all from your phone.",
        highlights: ["Easy event creation flow", "Attendee management tools", "Share across platforms"],
        gradient: "from-teal-500/20 to-cyan-500/10",
        iconColor: "text-teal-400",
        border: "border-teal-500/30",
    },
    {
        icon: Sparkles,
        title: "Smart Recommendations",
        tag: "AI",
        desc: "Our AI learns your preferences and surfaces events and people you'll actually care about — personalized to you, not the crowd.",
        highlights: ["Personalized event feed", "Learns from your activity", "Improves over time"],
        gradient: "from-violet-500/20 to-blue-500/10",
        iconColor: "text-violet-400",
        border: "border-violet-500/30",
    },
    {
        icon: Bell,
        title: "Smart Notifications",
        tag: "Utility",
        desc: "Stay in the loop without the noise. Get timely alerts for events you care about, friend activity, and community updates.",
        highlights: ["Customizable alert preferences", "Event reminders & countdowns", "Community activity digest"],
        gradient: "from-amber-500/20 to-orange-500/10",
        iconColor: "text-amber-400",
        border: "border-amber-500/30",
    },
    {
        icon: MessageCircle,
        title: "In-App Messaging",
        tag: "Social",
        desc: "Chat with attendees before events, coordinate with your group, and keep the conversation going after the moment passes.",
        highlights: ["Event group chats", "Direct messaging", "Media & location sharing"],
        gradient: "from-pink-500/20 to-rose-500/10",
        iconColor: "text-pink-400",
        border: "border-pink-500/30",
    },
    {
        icon: Shield,
        title: "Safe & Trusted",
        tag: "Trust",
        desc: "Every profile is verified. Every event is moderated. NearWe is built so you can connect with confidence.",
        highlights: ["Profile verification system", "Event & content moderation", "Report & block tools"],
        gradient: "from-green-500/20 to-emerald-500/10",
        iconColor: "text-green-400",
        border: "border-green-500/30",
    },
    {
        icon: Zap,
        title: "Instant RSVP",
        tag: "Core",
        desc: "One tap to confirm your spot. Manage all your upcoming plans from a single dashboard, and get reminders so you never miss out.",
        highlights: ["One-tap RSVP", "Personal event dashboard", "Automatic reminders"],
        gradient: "from-cyan-500/20 to-sky-500/10",
        iconColor: "text-sky-400",
        border: "border-sky-500/30",
    },
];

const appTagColors: Record<string, string> = {
    Core: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
    Social: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    Creator: "bg-teal-500/15 text-teal-400 border-teal-500/30",
    AI: "bg-violet-500/15 text-violet-400 border-violet-500/30",
    Utility: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    Trust: "bg-green-500/15 text-green-400 border-green-500/30",
};

// ─────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────
type Tab = "company" | "app";

export default function ServicesPage() {
    const [isVisible, setIsVisible] = useState(false);
    // ✅ Default tab = company services
    const [activeTab, setActiveTab] = useState<Tab>("company");
    const navigate = useNavigate();

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <>
            <Helmet>
                <title>NearWe Services - Company & App</title>
                <meta name="description" content="Explore NearWe's company development services and app features including event discovery, community connect, smart recommendations, and more." />
                <meta property="og:title" content="NearWe Services - Company & App" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://nearwe.in/services" />
                <meta name="robots" content="index, follow" />
            </Helmet>

            <div className="bg-[#0a0e1a] text-white font-sans min-h-screen overflow-hidden">

                {/* ── Navbar ── */}
                <nav className="fixed top-0 w-full z-50 bg-[#0a0e1a]/80 backdrop-blur-md border-b border-cyan-500/10">
                    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                        <button
                            onClick={() => navigate("/")}
                            className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
                        >
                            NearWe
                        </button>

                        <div className="flex items-center gap-2">
                            {/* Tab Switcher Pills */}
                            <div className="flex items-center bg-[#11141c] border border-cyan-500/20 rounded-full p-1 mr-2">
                                <button
                                    onClick={() => setActiveTab("company")}
                                    className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                                        activeTab === "company"
                                            ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-black shadow-lg shadow-cyan-500/20"
                                            : "text-gray-400 hover:text-white"
                                    }`}
                                >
                                    Company Services
                                </button>
                                <button
                                    onClick={() => setActiveTab("app")}
                                    className={`px-5 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                                        activeTab === "app"
                                            ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-black shadow-lg shadow-cyan-500/20"
                                            : "text-gray-400 hover:text-white"
                                    }`}
                                >
                                    App Services
                                </button>
                            </div>

                            <button
                                onClick={() => navigate("/")}
                                className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold rounded-full transition-all duration-300"
                            >
                                Download
                            </button>
                        </div>
                    </div>
                </nav>

                {/* ── Background Glows ── */}
                <div className="fixed inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-32 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute top-64 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />
                    <div className="absolute bottom-32 left-1/3 w-72 h-72 bg-violet-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "3s" }} />
                </div>

                {/* ══════════════════════════════════════════
                    COMPANY SERVICES TAB
                ══════════════════════════════════════════ */}
                {activeTab === "company" && (
                    <div
                        className={`transition-all duration-500 ${
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                        }`}
                    >
                        {/* Hero */}
                        <section className="relative pt-36 pb-16 px-6 text-center">
                            <div className="inline-flex items-center gap-2 px-5 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-6">
                                <Zap className="w-4 h-4 text-cyan-400" />
                                <span className="text-cyan-400 font-semibold text-sm">
                                    Full Stack Development Services
                                </span>
                            </div>

                            <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-tight max-w-5xl mx-auto">
                                <span className="bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
                                    We Build. We Ship.{" "}
                                </span>
                                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                                    You Scale.
                                </span>
                            </h1>

                            <p className="text-gray-300 text-xl max-w-2xl mx-auto leading-relaxed mb-12">
                                From idea to production — web apps, mobile apps, design, DevOps, and everything in between.
                                7+ years of experience. Real results.
                            </p>

                            <button
                                onClick={() => (window.location.href = "mailto:kevinponds007@gmail.com")}
                                className="group inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-black font-bold rounded-full transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/40"
                            >
                                Get Quotation By NearWe AI
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </section>

                        {/* Stats */}
                        <section className="py-12 px-6">
                            <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
                                {stats.map((s, i) => (
                                    <div key={i} className="text-center p-6 bg-[#11141c] border border-cyan-500/15 rounded-2xl">
                                        <div className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-1">
                                            {s.value}
                                        </div>
                                        <div className="text-gray-400 text-sm font-medium">{s.label}</div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Services Grid */}
                        <section className="px-6 py-16 max-w-7xl mx-auto">
                            <div className="text-center mb-14">
                                <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
                                    What We Do
                                </h2>
                                <p className="text-gray-400 text-lg">
                                    A complete range of services to take your product from zero to launch
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {companyServices.map((service, i) => (
                                    <div
                                        key={i}
                                        className={`group relative p-7 bg-[#11141c] border ${service.border} rounded-2xl
                                            hover:border-cyan-400/50 hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/10
                                            transition-all duration-300`}
                                    >
                                        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                                        <div className="relative z-10">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                    <service.icon className={`w-6 h-6 ${service.iconColor}`} />
                                                </div>
                                                <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${service.tagColor}`}>
                                                    {service.tag}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                                            <p className="text-gray-400 text-sm leading-relaxed mb-5">{service.desc}</p>
                                            <ul className="space-y-2">
                                                {service.highlights.map((h, j) => (
                                                    <li key={j} className="flex items-start gap-2 text-sm text-gray-300">
                                                        <CheckCircle className="w-4 h-4 text-cyan-500 mt-0.5 shrink-0" />
                                                        {h}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Tech Stack */}
                        <section className="py-16 px-6 bg-[#0d1120]">
                            <div className="max-w-5xl mx-auto text-center">
                                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
                                    Our Tech Stack
                                </h2>
                                <p className="text-gray-400 mb-10">The tools and technologies we work with every day</p>
                                <div className="flex flex-wrap justify-center gap-3">
                                    {techStack.map((tech, i) => (
                                        <span
                                            key={i}
                                            className="px-5 py-2 bg-[#11141c] border border-cyan-500/20 hover:border-cyan-500/50 text-gray-300 hover:text-cyan-300 rounded-full text-sm font-medium transition-all duration-200 cursor-default"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Why Us */}
                        <section className="py-20 px-6">
                            <div className="max-w-5xl mx-auto">
                                <div className="text-center mb-14">
                                    <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
                                        Why Work With Us
                                    </h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {[
                                        { icon: Star, title: "7+ Years of Real Experience", desc: "Not just tutorials and side projects — actual production systems, real clients, and shipped products.", color: "text-amber-400" },
                                        { icon: Zap, title: "Full-Cycle Ownership", desc: "We handle design, development, deployment, and everything in between — one team, zero handoff chaos.", color: "text-cyan-400" },
                                        { icon: Shield, title: "Built to Last", desc: "Clean code, proper architecture, security best practices — your codebase won't turn into a nightmare.", color: "text-green-400" },
                                    ].map((item, i) => (
                                        <div key={i} className="p-7 bg-[#11141c] border border-cyan-500/15 rounded-2xl text-center">
                                            <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center mx-auto mb-4">
                                                <item.icon className={`w-7 h-7 ${item.color}`} />
                                            </div>
                                            <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                                            <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* CTA */}
                        <section className="py-24 px-6 bg-gradient-to-r from-[#0a0e1a] via-[#1a1f2e] to-[#0a0e1a]">
                            <div className="max-w-3xl mx-auto text-center">
                                <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
                                    Have a Project in Mind?
                                </h2>
                                <p className="text-xl text-gray-300 mb-10">
                                    Let's talk about what you're building. We'll figure out the best path forward together.
                                </p>
                                <button
                                    onClick={() => (window.location.href = "mailto:kevinponds007@gmail.com")}
                                    className="group inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-black font-bold rounded-full transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/40 text-lg"
                                >
                                    Get in Touch
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                                <p className="mt-6 text-gray-500 text-sm">
                                    Or email directly at{" "}
                                    <a href="mailto:support@nearwe.in" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4">
                                        support@nearwe.in
                                    </a>
                                </p>
                            </div>
                        </section>
                    </div>
                )}

                {/* ══════════════════════════════════════════
                    APP SERVICES TAB
                ══════════════════════════════════════════ */}
                {activeTab === "app" && (
                    <div
                        className={`transition-all duration-500 ${
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                        }`}
                    >
                        {/* Hero */}
                        <section className="relative pt-36 pb-20 px-6 text-center">
                            <div className="inline-flex items-center gap-2 px-5 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-6">
                                <Zap className="w-4 h-4 text-cyan-400" />
                                <span className="text-cyan-400 font-semibold text-sm">What NearWe Offers</span>
                            </div>

                            <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-tight max-w-4xl mx-auto">
                                <span className="bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
                                    Everything You Need to Connect.
                                </span>
                            </h1>

                            <p className="text-gray-300 text-xl max-w-2xl mx-auto leading-relaxed">
                                NearWe brings a full suite of tools to help you discover, host, and build meaningful connections — all in one place.
                            </p>
                        </section>

                        {/* Services Grid */}
                        <section className="px-6 pb-24 max-w-7xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {appServices.map((service, i) => (
                                    <div
                                        key={i}
                                        style={{ animationDelay: `${i * 80}ms` }}
                                        className={`group relative p-7 bg-[#11141c] border ${service.border} rounded-2xl
                                            hover:border-cyan-400/50 hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/10
                                            transition-all duration-300`}
                                    >
                                        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                                        <div className="relative z-10">
                                            <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full border mb-4 ${appTagColors[service.tag] ?? "bg-gray-500/10 text-gray-400 border-gray-500/30"}`}>
                                                {service.tag}
                                            </span>
                                            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                                <service.icon className={`w-6 h-6 ${service.iconColor}`} />
                                            </div>
                                            <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                                            <p className="text-gray-400 text-sm leading-relaxed mb-5">{service.desc}</p>
                                            <ul className="space-y-2">
                                                {service.highlights.map((h, j) => (
                                                    <li key={j} className="flex items-start gap-2 text-sm text-gray-300">
                                                        <CheckCircle className="w-4 h-4 text-cyan-500 mt-0.5 shrink-0" />
                                                        {h}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* CTA */}
                        <section className="py-24 px-6 bg-gradient-to-r from-[#0a0e1a] via-[#1a1f2e] to-[#0a0e1a]">
                            <div className="max-w-4xl mx-auto text-center">
                                <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
                                    Ready to Join?
                                </h2>
                                <p className="text-xl text-gray-300 mb-12">
                                    Download NearWe and start experiencing all these features today.
                                </p>
                                <div className="flex justify-center gap-4 flex-wrap">
                                    <button
                                        onClick={() => window.open("https://apps.apple.com", "_blank")}
                                        className="flex items-center gap-3 px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold rounded-full shadow-lg hover:shadow-cyan-500/40 transition"
                                    >
                                        <img src={iosLogo} className="w-6 h-6" alt="iOS" />
                                        App Store
                                    </button>
                                    <button
                                        onClick={() => window.open("https://play.google.com/store/apps/details?id=YOUR_APP_ID", "_blank")}
                                        className="flex items-center gap-3 px-8 py-4 border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black transition rounded-full"
                                    >
                                        <img src={playstoreLogo} className="w-6 h-6" alt="Play Store" />
                                        Google Play
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>
                )}

                {/* ── Footer (shared) ── */}
                <footer className="py-8 px-6 bg-[#0a0e1a] border-t border-cyan-500/10 text-center text-gray-400">
                    <p>© {new Date().getFullYear()} NearWe. Connecting communities worldwide.</p>
                    <p className="mt-2 text-sm flex justify-center items-center gap-3">
                        <span>support@nearwe.in</span>
                        <span className="opacity-40">|</span>
                        <button
                            onClick={() => navigate("/aboutus")}
                            className="text-cyan-400 hover:text-cyan-300 transition underline underline-offset-4"
                        >
                            About Us
                        </button>
                    </p>
                </footer>
            </div>
        </>
    );
}