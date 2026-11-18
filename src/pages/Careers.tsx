"use client";

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import {
    ArrowRight,
    MapPin,
    Clock,
    Briefcase,
    Sparkles,
    Users,
    Zap,
    Globe,
    Code2,
    Smartphone,
    Palette,
    ChevronDown,
    ExternalLink,
    CheckCircle,
    Star,
    Heart,
    Coffee,
    Wifi,
    Shield,
} from "lucide-react";

// ─── Scroll Reveal Hook ─────────────────────────────────────────────────────
function useScrollReveal(threshold = 0.15) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
            { threshold }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold]);
    return { ref, visible };
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
    const { ref, visible } = useScrollReveal();
    return (
        <div
            ref={ref}
            className={`reveal-careers ${visible ? "visible" : ""} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}

// ─── CSS ────────────────────────────────────────────────────────────────────
const styles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-6px); }
  }

  @keyframes slide-up {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes tag-pop {
    0% { transform: scale(0.8); opacity: 0; }
    70% { transform: scale(1.05); }
    100% { transform: scale(1); opacity: 1; }
  }

  .gradient-text { color: #0f172a; }

  .glass-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    box-shadow: 0 1px 2px rgba(15,23,42,0.04);
    transition: all 0.3s ease;
  }
  .glass-card:hover {
    border-color: #bfdbfe;
    box-shadow: 0 10px 30px -12px rgba(15,23,42,0.15);
  }

  .shimmer-btn { position: relative; overflow: hidden; }

  .reveal-careers {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1);
  }
  .reveal-careers.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .job-card {
    position: relative;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 20px;
    box-shadow: 0 1px 3px rgba(15,23,42,0.05);
    transition: all 0.35s cubic-bezier(0.16,1,0.3,1);
    overflow: hidden;
    cursor: pointer;
  }
  .job-card:hover {
    border-color: #bfdbfe;
    transform: translateY(-4px);
    box-shadow: 0 24px 50px -20px rgba(15,23,42,0.22);
  }

  .apply-btn {
    position: relative;
    overflow: hidden;
    background: #eff6ff;
    border: 1px solid #bfdbfe;
    color: #1d4ed8;
    transition: all 0.25s ease;
  }
  .apply-btn:hover {
    background: #1d4ed8;
    border-color: #1d4ed8;
    color: #ffffff;
    box-shadow: 0 8px 20px -6px rgba(29,78,216,0.45);
  }

  .perk-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    box-shadow: 0 1px 2px rgba(15,23,42,0.04);
    transition: all 0.3s ease;
  }
  .perk-card:hover {
    border-color: #bfdbfe;
    box-shadow: 0 12px 30px -14px rgba(15,23,42,0.2);
    transform: translateY(-2px);
  }

  .floating { animation: float 6s ease-in-out infinite; }

  .dot-ping { position: relative; }
  .dot-ping::after {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    border: 2px solid #22c55e;
    animation: ping 1.5s cubic-bezier(0,0,0.2,1) infinite;
  }
  @keyframes ping {
    75%, 100% { transform: scale(2); opacity: 0; }
  }

  .tag-badge {
    animation: tag-pop 0.4s cubic-bezier(0.34,1.56,0.64,1) both;
  }

  @media (prefers-reduced-motion: reduce) {
    .floating, .tag-badge, .dot-ping::after { animation: none !important; }
    .reveal-careers { opacity: 1; transform: none; transition: none; }
  }
`;

// ─── Job Data ────────────────────────────────────────────────────────────────
const jobOpenings = [
    {
        id: 1,
        title: "UI/UX Designer",
        icon: Palette,
        department: "Design",
        location: "Remote / Agra, IN",
        type: "Full-time",
        experience: "2–4 years",
        salary: "₹6–12 LPA",
        badge: "Urgent",
        badgeColor: "bg-orange-50 text-orange-700 border-orange-200",
        iconBg: "from-pink-50 to-rose-100",
        iconColor: "text-pink-600",
        accentColor: "rgba(244,114,182,0.15)",
        desc: "We're looking for a creative UI/UX Designer who can craft beautiful, intuitive experiences for the NearWe mobile app and web platform.",
        responsibilities: [
            "Design end-to-end user flows and high-fidelity prototypes in Figma",
            "Build and maintain the NearWe design system",
            "Collaborate closely with developers for pixel-perfect implementation",
            "Conduct user research, usability testing, and iterate based on feedback",
        ],
        skills: ["Figma", "Adobe XD", "Prototyping", "Design Systems", "Mobile-First Design"],
    },
    {
        id: 2,
        title: "App Developer",
        icon: Smartphone,
        department: "Engineering",
        location: "Remote / Agra, IN",
        type: "Full-time",
        experience: "2–5 years",
        salary: "₹8–18 LPA",
        badge: "Hot",
        badgeColor: "bg-cyan-50 text-cyan-700 border-cyan-200",
        iconBg: "from-cyan-50 to-blue-100",
        iconColor: "text-cyan-700",
        accentColor: "rgba(34,211,238,0.15)",
        desc: "Build the NearWe mobile experience that connects thousands of people to their communities. You'll work on React Native or Flutter, shipping features that matter.",
        responsibilities: [
            "Develop and maintain cross-platform mobile app (React Native / Flutter)",
            "Integrate REST APIs and Firebase real-time services",
            "Optimize app performance, load times, and battery usage",
            "Work closely with design and backend teams in agile sprints",
        ],
        skills: ["React Native", "Flutter", "Firebase", "REST APIs", "App Store / Play Store"],
    },
    {
        id: 3,
        title: "Backend Developer",
        icon: Code2,
        department: "Engineering",
        location: "Remote / Agra, IN",
        type: "Full-time",
        experience: "3–6 years",
        salary: "₹10–20 LPA",
        badge: "Open",
        badgeColor: "bg-green-50 text-green-700 border-green-200",
        iconBg: "from-green-50 to-teal-100",
        iconColor: "text-green-700",
        accentColor: "rgba(74,222,128,0.12)",
        desc: "Own the server-side of NearWe — architect scalable APIs, handle real-time data, and make sure everything is fast, secure, and production-ready.",
        responsibilities: [
            "Design and build RESTful APIs using Node.js / PHP",
            "Manage and optimize MongoDB and MySQL databases",
            "Set up Docker containers, CI/CD pipelines, and cloud infrastructure",
            "Implement authentication, authorization, and security hardening",
        ],
        skills: ["Node.js", "PHP", "MongoDB", "MySQL", "Docker", "Azure DevOps"],
    },
];

// ─── Perks ───────────────────────────────────────────────────────────────────
const perks = [
    { icon: Wifi, label: "Remote Friendly", desc: "Work from wherever you're most productive." },
    { icon: Zap, label: "Cutting-Edge Stack", desc: "React, Node, Flutter, Docker — always modern." },
    { icon: Heart, label: "Health Benefits", desc: "Medical coverage for you and your family." },
    { icon: Star, label: "Equity & Bonuses", desc: "Participate in NearWe's growth with ESOPs." },
    { icon: Coffee, label: "Flexible Hours", desc: "We care about output, not clocking in." },
    { icon: Globe, label: "Real Impact", desc: "Help build communities across 50+ cities." },
];

// ─── Main Component ──────────────────────────────────────────────────────────
export default function CareersPage() {
    const [heroVisible, setHeroVisible] = useState(false);
    const [expandedJob, setExpandedJob] = useState<number | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const t = setTimeout(() => setHeroVisible(true), 100);
        return () => clearTimeout(t);
    }, []);

    const handleApply = (jobTitle: string) => {
        const subject = encodeURIComponent(`Application: ${jobTitle} — NearWe`);
        const body = encodeURIComponent(
            `Hi NearWe Team,\n\nI am interested in applying for the ${jobTitle} position.\n\nPlease find my details below:\n\nName:\nLinkedIn / Portfolio:\nYears of Experience:\nCurrent CTC:\nExpected CTC:\nNotice Period:\n\nBest regards`
        );
        window.location.href = `mailto:support@nearwe.in?subject=${subject}&body=${body}`;
    };

    return (
        <>
            <style>{styles}</style>
            <Helmet>
                <title>Careers — NearWe | Join Our Team</title>
                <meta name="description" content="Join NearWe and help build the future of local communities. Open roles in design, mobile, and backend engineering." />
            </Helmet>

            <div className="bg-white text-slate-900 overflow-x-hidden min-h-screen">

                <SiteHeader />

                {/* ── Hero ── */}
                <section className="relative pt-36 pb-20 px-4 sm:px-6 text-center overflow-hidden border-b border-slate-200 bg-gradient-to-b from-blue-50/70 to-white" style={{ zIndex: 1 }}>
                    <div
                        className={`transition-all duration-1000 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                    >
                        {/* Badge */}
                        <div
                            className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-slate-200 shadow-sm rounded-full mb-6"
                            style={{ animation: heroVisible ? "slide-up 0.6s both" : "none" }}
                        >
                            <span className="w-2 h-2 rounded-full bg-green-500 dot-ping" />
                            <span className="text-slate-700 text-sm font-semibold">We're Hiring — 3 Open Positions</span>
                        </div>

                        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.08]">
                            <span className="gradient-text">Build the Future</span>
                            <br />
                            <span className="text-blue-700">of Community.</span>
                        </h1>

                        <p className="text-slate-600 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
                            Join a small, passionate team building technology that connects real people to real experiences.
                            Meaningful work. Real ownership. Remote-friendly.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <button
                                onClick={() => document.getElementById("openings")?.scrollIntoView({ behavior: "smooth" })}
                                className="group relative px-8 py-4 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-md shadow-lg shadow-blue-900/15 flex items-center justify-center gap-2 transition-colors duration-300"
                            >
                                See Open Roles
                                <ChevronDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
                            </button>
                            <button
                                onClick={() => navigate("/contact")}
                                className="px-8 py-4 border border-slate-300 bg-white hover:border-slate-400 hover:bg-slate-50 text-slate-800 font-semibold rounded-md transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                <Users className="w-5 h-5" /> Learn About Us
                            </button>
                        </div>
                    </div>

                    {/* Floating stat pills */}
                    <div className="mt-16 flex flex-wrap justify-center gap-4">
                        {[
                            { icon: Globe, label: "50+ Cities" },
                            { icon: Users, label: "10K+ Users" },
                            { icon: Sparkles, label: "AI-Powered" },
                            { icon: Zap, label: "Fast-Growing" },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="glass-card flex items-center gap-2 px-4 py-2 rounded-full floating"
                                style={{ animationDelay: `${i * 0.4}s` }}
                            >
                                <item.icon className="w-4 h-4 text-blue-700" />
                                <span className="text-sm text-slate-700 font-medium">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── Perks ── */}
                <section className="py-20 px-4 sm:px-6 relative" style={{ zIndex: 1 }}>
                    <div className="max-w-5xl mx-auto">
                        <Reveal className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-200 rounded-full mb-4">
                                <span className="text-blue-700 text-xs font-semibold uppercase tracking-widest">Why NearWe</span>
                            </div>
                            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-4">Life at NearWe</h2>
                            <p className="text-slate-600 max-w-xl mx-auto">We believe great products come from happy, empowered teams.</p>
                        </Reveal>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {perks.map((perk, i) => (
                                <Reveal key={i} delay={i * 80}>
                                    <div className="perk-card p-5 sm:p-6 h-full">
                                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-3">
                                            <perk.icon className="w-5 h-5 text-blue-700" />
                                        </div>
                                        <h3 className="font-semibold text-slate-900 text-sm sm:text-base mb-1">{perk.label}</h3>
                                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{perk.desc}</p>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Job Openings ── */}
                <section id="openings" className="py-20 px-4 sm:px-6 relative" style={{ zIndex: 1 }}>
                    {/* Beam */}
                    <div
                        className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"
                        
                    />

                    <div className="max-w-4xl mx-auto">
                        <Reveal className="text-center mb-14">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-200 rounded-full mb-4">
                                <Briefcase className="w-4 h-4 text-blue-700" />
                                <span className="text-blue-700 text-xs font-semibold uppercase tracking-widest">Current Openings</span>
                            </div>
                            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-4">Open Positions</h2>
                            <p className="text-slate-600 max-w-xl mx-auto">
                                3 roles available. All positions are remote-friendly with option to be based in Agra, India.
                            </p>
                        </Reveal>

                        <div className="flex flex-col gap-6">
                            {jobOpenings.map((job, i) => (
                                <Reveal key={job.id} delay={i * 120}>
                                    <div
                                        className="job-card"
                                        onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                                    >
                                        {/* Accent glow */}
                                        <div
                                            className="absolute top-0 left-0 w-1 h-full rounded-l-[20px]"
                                            style={{ background: `linear-gradient(to bottom, ${job.accentColor.replace("0.15", "0.8")}, transparent)` }}
                                        />

                                        <div className="p-6 sm:p-8">
                                            {/* Header row */}
                                            <div className="flex items-start justify-between gap-4 mb-4">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${job.iconBg} flex items-center justify-center shrink-0`}>
                                                        <job.icon className={`w-6 h-6 ${job.iconColor}`} />
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">{job.title}</h3>
                                                            <span className={`tag-badge text-xs font-bold px-2.5 py-0.5 rounded-full border ${job.badgeColor}`}>
                                                                {job.badge}
                                                            </span>
                                                        </div>
                                                        <span className="text-sm text-slate-500 font-medium">{job.department}</span>
                                                    </div>
                                                </div>

                                                {/* Apply button — visible always on desktop */}
                                                <button
                                                    className="apply-btn shrink-0 hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold"
                                                    onClick={(e) => { e.stopPropagation(); handleApply(job.title); }}
                                                >
                                                    Apply <ExternalLink className="w-3.5 h-3.5" />
                                                </button>
                                            </div>

                                            {/* Meta chips */}
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {[
                                                    { icon: MapPin, label: job.location },
                                                    { icon: Clock, label: job.type },
                                                    { icon: Briefcase, label: job.experience },
                                                    { icon: Sparkles, label: job.salary },
                                                ].map((meta, j) => (
                                                    <div key={j} className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-200 rounded-full text-xs font-medium text-slate-600">
                                                        <meta.icon className="w-3 h-3 text-slate-400" />
                                                        {meta.label}
                                                    </div>
                                                ))}
                                            </div>

                                            <p className="text-slate-600 text-sm leading-relaxed">{job.desc}</p>

                                            {/* Expand indicator */}
                                            <div className="flex items-center gap-2 mt-4">
                                                <span className="text-xs text-blue-700 font-semibold">
                                                    {expandedJob === job.id ? "Hide details" : "View details"}
                                                </span>
                                                <ChevronDown
                                                    className={`w-4 h-4 text-blue-700 transition-transform duration-300 ${expandedJob === job.id ? "rotate-180" : ""}`}
                                                />
                                            </div>
                                        </div>

                                        {/* Expanded details */}
                                        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedJob === job.id ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}>
                                            <div className="px-6 sm:px-8 pb-8 border-t border-slate-100 bg-slate-50/60 pt-6">
                                                <div className="grid sm:grid-cols-2 gap-6">
                                                    {/* Responsibilities */}
                                                    <div>
                                                        <h4 className=" font-semibold text-slate-900 text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                                                            <CheckCircle className="w-4 h-4 text-blue-700" />
                                                            Responsibilities
                                                        </h4>
                                                        <ul className="space-y-2">
                                                            {job.responsibilities.map((r, j) => (
                                                                <li key={j} className="flex items-start gap-2 text-sm text-slate-700">
                                                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                                                                    {r}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>

                                                    {/* Skills */}
                                                    <div>
                                                        <h4 className=" font-semibold text-slate-900 text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                                                            <Zap className="w-4 h-4 text-blue-700" />
                                                            Skills & Stack
                                                        </h4>
                                                        <div className="flex flex-wrap gap-2">
                                                            {job.skills.map((skill, j) => (
                                                                <span
                                                                    key={j}
                                                                    className="px-3 py-1 bg-white border border-slate-200 hover:border-blue-300 text-slate-700 rounded-full text-xs font-medium transition-colors duration-200"
                                                                >
                                                                    {skill}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Apply CTA inside expanded */}
                                                <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-slate-200">
                                                    <p className="text-slate-500 text-sm">
                                                        Send your resume to{" "}
                                                        <span className="font-medium text-blue-700">support@nearwe.in</span>
                                                    </p>
                                                    <button
                                                        className="shimmer-btn apply-btn flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold"
                                                        onClick={(e) => { e.stopPropagation(); handleApply(job.title); }}
                                                    >
                                                        Apply for {job.title} <ArrowRight className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>

                        {/* No role fits? */}
                        <Reveal delay={400}>
                            <div className="mt-8 glass-card rounded-2xl p-6 sm:p-8 text-center relative overflow-hidden">
                                <div
                                    className="absolute top-0 left-0 w-full h-px"
                                    style={{ background: "linear-gradient(90deg, transparent, rgba(29,78,216,0.35), transparent)" }}
                                />
                                <Shield className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Don't See Your Role?</h3>
                                <p className="text-slate-500 text-sm mb-4">
                                    We're always looking for exceptional people. Drop us your portfolio and tell us how you'd contribute.
                                </p>
                                <button
                                    onClick={() => handleApply("General Application")}
                                    className="inline-flex items-center gap-2 px-6 py-2.5 border border-slate-300 bg-white hover:border-slate-400 hover:bg-slate-50 text-slate-800 text-sm font-semibold rounded-md transition-all duration-300"
                                >
                                    Send Open Application <ExternalLink className="w-4 h-4" />
                                </button>
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* ── CTA Banner ── */}
                <section className="py-24 px-4 sm:px-6 relative" style={{ zIndex: 1 }}>
                    <div className="max-w-4xl mx-auto">
                        <Reveal>
                            <div className="rounded-3xl p-8 sm:p-14 text-center relative overflow-hidden bg-gradient-to-br from-blue-800 to-blue-950 text-white shadow-xl shadow-blue-900/20">
                                {/* Corner accents */}
                                {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map((pos, i) => (
                                    <div
                                        key={i}
                                        className={`absolute ${pos} w-8 h-8`}
                                        style={{
                                            borderTop: i < 2 ? "1px solid rgba(255,255,255,0.25)" : "none",
                                            borderBottom: i >= 2 ? "1px solid rgba(255,255,255,0.25)" : "none",
                                            borderLeft: i % 2 === 0 ? "1px solid rgba(255,255,255,0.25)" : "none",
                                            borderRight: i % 2 === 1 ? "1px solid rgba(255,255,255,0.25)" : "none",
                                        }}
                                    />
                                ))}
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 rounded-full mb-6">
                                    <span className="text-blue-100 text-xs font-semibold uppercase tracking-widest">🌟 Join the Mission</span>
                                </div>
                                <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-5">
                                    Help Us Connect Communities
                                </h2>
                                <p className="text-blue-100 max-w-xl mx-auto mb-8 leading-relaxed">
                                    NearWe is at the intersection of local discovery, social connection, and smart technology. Be part of something that affects real people every day.
                                </p>
                                <button
                                    onClick={() => document.getElementById("openings")?.scrollIntoView({ behavior: "smooth" })}
                                    className="group relative inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-blue-50 text-slate-900 font-semibold rounded-md transition-colors duration-300"
                                >
                                    View All Openings
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                </button>
                            </div>
                        </Reveal>
                    </div>
                </section>

                <SiteFooter />
            </div>
        </>
    );
}