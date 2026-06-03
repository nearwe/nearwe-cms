"use client";

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
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
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --cyan: #22d3ee;
    --blue: #3b82f6;
    --dark: #0a0e1a;
    --card: #0d1117;
    --border: rgba(34,211,238,0.15);
  }

  @keyframes pulse-glow {
    0%, 100% { transform: scale(1); opacity: 0.6; }
    50% { transform: scale(1.4); opacity: 1; }
  }

  @keyframes gradient-shift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }

  @keyframes slide-up {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }

  @keyframes beam {
    0% { opacity: 0; transform: translateX(-100%) skewX(-20deg); }
    50% { opacity: 1; }
    100% { opacity: 0; transform: translateX(200%) skewX(-20deg); }
  }

  @keyframes tag-pop {
    0% { transform: scale(0.8); opacity: 0; }
    70% { transform: scale(1.05); }
    100% { transform: scale(1); opacity: 1; }
  }

  @keyframes border-glow {
    0%, 100% { box-shadow: 0 0 0 rgba(34,211,238,0); }
    50% { box-shadow: 0 0 30px rgba(34,211,238,0.15), 0 0 60px rgba(34,211,238,0.05); }
  }

  . { font-family: 'Syne', sans-serif; }
  .font-body { font-family: 'DM Sans', sans-serif; }

  .gradient-text {
    background: linear-gradient(135deg, #fff 0%, #a5f3fc 40%, #22d3ee 70%, #3b82f6 100%);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradient-shift 5s ease infinite;
  }

  .glass-card {
    background: rgba(13,17,23,0.6);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid var(--border);
    transition: all 0.3s ease;
  }
  .glass-card:hover {
    border-color: rgba(34,211,238,0.4);
    background: rgba(34,211,238,0.04);
  }

  .shimmer-btn {
    position: relative;
    overflow: hidden;
  }
  .shimmer-btn::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%);
    animation: shimmer 2.5s infinite;
  }

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
    background: rgba(13,17,23,0.8);
    border: 1px solid rgba(34,211,238,0.12);
    border-radius: 20px;
    transition: all 0.35s cubic-bezier(0.16,1,0.3,1);
    overflow: hidden;
    cursor: pointer;
  }
  .job-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(34,211,238,0.04) 0%, transparent 60%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .job-card:hover {
    border-color: rgba(34,211,238,0.45);
    transform: translateY(-6px);
    box-shadow: 0 24px 60px rgba(34,211,238,0.08), 0 8px 20px rgba(0,0,0,0.4);
    animation: border-glow 2s ease-in-out infinite;
  }
  .job-card:hover::before {
    opacity: 1;
  }

  .apply-btn {
    position: relative;
    overflow: hidden;
    background: linear-gradient(135deg, rgba(34,211,238,0.12), rgba(59,130,246,0.12));
    border: 1px solid rgba(34,211,238,0.3);
    color: #22d3ee;
    transition: all 0.3s ease;
  }
  .apply-btn:hover {
    background: linear-gradient(135deg, #22d3ee, #3b82f6);
    border-color: transparent;
    color: #0a0e1a;
    box-shadow: 0 8px 30px rgba(34,211,238,0.4);
    transform: translateY(-2px);
  }

  .perk-card {
    background: rgba(13,17,23,0.5);
    border: 1px solid rgba(34,211,238,0.08);
    border-radius: 16px;
    transition: all 0.3s ease;
  }
  .perk-card:hover {
    border-color: rgba(34,211,238,0.3);
    background: rgba(34,211,238,0.03);
  }

  .floating { animation: float 6s ease-in-out infinite; }

  .dot-ping {
    position: relative;
  }
  .dot-ping::after {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    border: 2px solid #22d3ee;
    animation: ping 1.5s cubic-bezier(0,0,0.2,1) infinite;
  }
  @keyframes ping {
    75%, 100% { transform: scale(2); opacity: 0; }
  }

  .tag-badge {
    animation: tag-pop 0.4s cubic-bezier(0.34,1.56,0.64,1) both;
  }

  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #0a0e1a; }
  ::-webkit-scrollbar-thumb { background: rgba(34,211,238,0.4); border-radius: 2px; }

  @media (max-width: 640px) {
    .nav-links-careers { display: none; }
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
        badgeColor: "bg-orange-500/20 text-orange-400 border-orange-500/30",
        iconBg: "from-pink-500/20 to-rose-500/10",
        iconColor: "text-pink-400",
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
        badgeColor: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
        iconBg: "from-cyan-500/20 to-blue-500/10",
        iconColor: "text-cyan-400",
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
        badgeColor: "bg-green-500/20 text-green-400 border-green-500/30",
        iconBg: "from-green-500/20 to-teal-500/10",
        iconColor: "text-green-400",
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

            <div className="font-body bg-[#0a0e1a] text-white overflow-x-hidden min-h-screen">

                {/* ── Navbar ── */}
                <nav className="fixed top-0 w-full z-50 bg-[#0a0e1a]/80 backdrop-blur-xl border-b border-cyan-500/10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
                        <button
                            onClick={() => navigate("/")}
                            className="text-2xl  font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
                        >
                            NearWe
                        </button>

                        <div className="nav-links-careers hidden md:flex items-center gap-1">
                            {[
                                { label: "Home", path: "/" },
                                { label: "Services", path: "/companyservices" },
                                { label: "Advertise", path: "/advertise" },
                                { label: "Contact", path: "/contact" },
                            ].map((item) => (
                                <button
                                    key={item.path}
                                    onClick={() => navigate(item.path)}
                                    className="px-3 py-2 text-sm text-gray-400 hover:text-cyan-400 font-medium transition-all duration-200 rounded-lg hover:bg-cyan-500/5 relative group"
                                >
                                    {item.label}
                                    <span className="absolute bottom-1 left-3 right-3 h-px bg-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200" />
                                </button>
                            ))}
                            <div className="w-px h-5 bg-cyan-500/20 mx-2" />
                            <button
                                onClick={() => handleApply("Open Role")}
                                className="shimmer-btn relative overflow-hidden flex items-center gap-2 px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-black text-sm font-bold rounded-full transition-colors duration-200 hover:shadow-lg hover:shadow-cyan-500/40"
                            >
                                Apply Now <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                </nav>

                {/* ── Background Effects ── */}
                <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
                    <div className="absolute top-20 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" style={{ animation: "pulse-glow 4s ease-in-out infinite" }} />
                    <div className="absolute top-64 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" style={{ animation: "pulse-glow 4s ease-in-out infinite", animationDelay: "2s" }} />
                    <div className="absolute bottom-32 left-1/3 w-72 h-72 bg-indigo-500/5 rounded-full blur-3xl" style={{ animation: "pulse-glow 4s ease-in-out infinite", animationDelay: "1s" }} />
                    {/* Grid */}
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: "linear-gradient(rgba(34,211,238,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.025) 1px, transparent 1px)",
                            backgroundSize: "60px 60px",
                        }}
                    />
                </div>

                {/* ── Hero ── */}
                <section className="relative pt-36 pb-20 px-4 sm:px-6 text-center overflow-hidden" style={{ zIndex: 1 }}>
                    <div
                        className={`transition-all duration-1000 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                    >
                        {/* Badge */}
                        <div
                            className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-6 backdrop-blur-sm"
                            style={{ animation: heroVisible ? "slide-up 0.6s both" : "none" }}
                        >
                            <span className="w-2 h-2 rounded-full bg-cyan-400 dot-ping" />
                            <span className="text-cyan-400 text-sm font-semibold">We're Hiring — 3 Open Positions</span>
                        </div>

                        <h1 className=" text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight">
                            <span className="gradient-text">Build the Future</span>
                            <br />
                            <span className="text-white">of Community.</span>
                        </h1>

                        <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
                            Join a small, passionate team building technology that connects real people to real experiences.
                            Meaningful work. Real ownership. Remote-friendly.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <button
                                onClick={() => document.getElementById("openings")?.scrollIntoView({ behavior: "smooth" })}
                                className="shimmer-btn group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-bold rounded-full hover:shadow-2xl hover:shadow-cyan-500/40 flex items-center justify-center gap-2 transition-shadow duration-300"
                            >
                                See Open Roles
                                <ChevronDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
                            </button>
                            <button
                                onClick={() => navigate("/contact")}
                                className="px-8 py-4 border border-cyan-500/40 hover:border-cyan-500 text-cyan-400 hover:text-white font-semibold rounded-full transition-all duration-300 hover:bg-cyan-500/10 flex items-center justify-center gap-2"
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
                                <item.icon className="w-4 h-4 text-cyan-400" />
                                <span className="text-sm text-gray-300 font-medium">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── Perks ── */}
                <section className="py-20 px-4 sm:px-6 relative" style={{ zIndex: 1 }}>
                    <div className="max-w-5xl mx-auto">
                        <Reveal className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-4">
                                <span className="text-cyan-400 text-xs font-semibold uppercase tracking-widest">Why NearWe</span>
                            </div>
                            <h2 className="gradient-text text-4xl sm:text-5xl font-black gradient-text mb-4">Life at NearWe</h2>
                            <p className="text-gray-500 max-w-xl mx-auto">We believe great products come from happy, empowered teams.</p>
                        </Reveal>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {perks.map((perk, i) => (
                                <Reveal key={i} delay={i * 80}>
                                    <div className="perk-card p-5 sm:p-6 h-full">
                                        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-3">
                                            <perk.icon className="w-5 h-5 text-cyan-400" />
                                        </div>
                                        <h3 className=" font-bold text-white text-sm sm:text-base mb-1">{perk.label}</h3>
                                        <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{perk.desc}</p>
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
                        className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"
                        style={{ animation: "beam 5s ease-in-out infinite" }}
                    />

                    <div className="max-w-4xl mx-auto">
                        <Reveal className="text-center mb-14">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-4">
                                <Briefcase className="w-4 h-4 text-cyan-400" />
                                <span className="text-cyan-400 text-xs font-semibold uppercase tracking-widest">Current Openings</span>
                            </div>
                            <h2 className="gradient-text text-4xl sm:text-5xl font-black gradient-text mb-4">Open Positions</h2>
                            <p className="text-gray-500 max-w-xl mx-auto">
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
                                                            <h3 className="gradient-text text-xl sm:text-2xl font-bold text-white">{job.title}</h3>
                                                            <span className={`tag-badge text-xs font-bold px-2.5 py-0.5 rounded-full border ${job.badgeColor}`}>
                                                                {job.badge}
                                                            </span>
                                                        </div>
                                                        <span className="text-sm text-gray-500 font-medium">{job.department}</span>
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
                                                    <div key={j} className="flex items-center gap-1.5 px-3 py-1 bg-white/4 border border-white/8 rounded-full text-xs text-gray-400">
                                                        <meta.icon className="w-3 h-3 text-cyan-500/70" />
                                                        {meta.label}
                                                    </div>
                                                ))}
                                            </div>

                                            <p className="text-gray-400 text-sm leading-relaxed">{job.desc}</p>

                                            {/* Expand indicator */}
                                            <div className="flex items-center gap-2 mt-4">
                                                <span className="text-xs text-cyan-500/60 font-medium">
                                                    {expandedJob === job.id ? "Hide details" : "View details"}
                                                </span>
                                                <ChevronDown
                                                    className={`w-4 h-4 text-cyan-500/60 transition-transform duration-300 ${expandedJob === job.id ? "rotate-180" : ""}`}
                                                />
                                            </div>
                                        </div>

                                        {/* Expanded details */}
                                        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${expandedJob === job.id ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}>
                                            <div className="px-6 sm:px-8 pb-8 border-t border-cyan-500/10 pt-6">
                                                <div className="grid sm:grid-cols-2 gap-6">
                                                    {/* Responsibilities */}
                                                    <div>
                                                        <h4 className=" font-bold text-white text-sm uppercase tracking-widest mb-3 flex items-center gap-2">
                                                            <CheckCircle className="w-4 h-4 text-cyan-400" />
                                                            Responsibilities
                                                        </h4>
                                                        <ul className="space-y-2">
                                                            {job.responsibilities.map((r, j) => (
                                                                <li key={j} className="flex items-start gap-2 text-sm text-gray-400">
                                                                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mt-1.5 shrink-0" />
                                                                    {r}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>

                                                    {/* Skills */}
                                                    <div>
                                                        <h4 className=" font-bold text-white text-sm uppercase tracking-widest mb-3 flex items-center gap-2">
                                                            <Zap className="w-4 h-4 text-cyan-400" />
                                                            Skills & Stack
                                                        </h4>
                                                        <div className="flex flex-wrap gap-2">
                                                            {job.skills.map((skill, j) => (
                                                                <span
                                                                    key={j}
                                                                    className="px-3 py-1 bg-cyan-500/8 border border-cyan-500/20 hover:border-cyan-500/50 text-cyan-300/80 rounded-full text-xs font-medium transition-colors duration-200"
                                                                >
                                                                    {skill}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Apply CTA inside expanded */}
                                                <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-cyan-500/8">
                                                    <p className="text-gray-500 text-sm">
                                                        Send your resume to{" "}
                                                        <span className="text-cyan-400">support@nearwe.in</span>
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
                                    style={{ background: "linear-gradient(90deg, transparent, rgba(34,211,238,0.4), transparent)", animation: "beam 4s ease-in-out infinite" }}
                                />
                                <Shield className="w-8 h-8 text-cyan-500/50 mx-auto mb-3" />
                                <h3 className=" text-xl font-bold text-white mb-2">Don't See Your Role?</h3>
                                <p className="text-gray-500 text-sm mb-4">
                                    We're always looking for exceptional people. Drop us your portfolio and tell us how you'd contribute.
                                </p>
                                <button
                                    onClick={() => handleApply("General Application")}
                                    className="inline-flex items-center gap-2 px-6 py-2.5 border border-cyan-500/40 hover:border-cyan-500 text-cyan-400 hover:text-white text-sm font-semibold rounded-full transition-all duration-300 hover:bg-cyan-500/10"
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
                            <div className="glass-card rounded-3xl p-8 sm:p-14 text-center relative overflow-hidden">
                                {/* Corner accents */}
                                {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map((pos, i) => (
                                    <div
                                        key={i}
                                        className={`absolute ${pos} w-8 h-8`}
                                        style={{
                                            borderTop: i < 2 ? "1px solid rgba(34,211,238,0.4)" : "none",
                                            borderBottom: i >= 2 ? "1px solid rgba(34,211,238,0.4)" : "none",
                                            borderLeft: i % 2 === 0 ? "1px solid rgba(34,211,238,0.4)" : "none",
                                            borderRight: i % 2 === 1 ? "1px solid rgba(34,211,238,0.4)" : "none",
                                        }}
                                    />
                                ))}
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-6">
                                    <span className="text-cyan-400 text-xs font-semibold uppercase tracking-widest">🌟 Join the Mission</span>
                                </div>
                                <h2 className=" text-4xl sm:text-5xl font-black gradient-text mb-5">
                                    Help Us Connect Communities
                                </h2>
                                <p className="text-gray-400 max-w-xl mx-auto mb-8 leading-relaxed">
                                    NearWe is at the intersection of local discovery, social connection, and smart technology. Be part of something that affects real people every day.
                                </p>
                                <button
                                    onClick={() => document.getElementById("openings")?.scrollIntoView({ behavior: "smooth" })}
                                    className="shimmer-btn group relative overflow-hidden inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-bold rounded-full hover:shadow-2xl hover:shadow-cyan-500/40 transition-shadow duration-300"
                                >
                                    View All Openings
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                </button>
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* ── Footer ── */}
                <footer className="py-10 px-4 sm:px-6 bg-[#0a0e1a] border-t border-cyan-500/10">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <button
                                onClick={() => navigate("/")}
                                className=" text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
                            >
                                NearWe
                            </button>
                            <p className="text-sm text-gray-600 text-center">
                                © {new Date().getFullYear()} NearWe. Connecting communities worldwide.
                            </p>
                            <div className="flex items-center gap-4 text-sm">
                                <a href="mailto:support@nearwe.in" className="text-gray-500 hover:text-cyan-400 transition-colors duration-200">
                                    support@nearwe.in
                                </a>
                                <span className="text-gray-700">·</span>
                                <button
                                    onClick={() => navigate("/aboutus")}
                                    className="text-cyan-500 hover:text-cyan-300 transition-colors duration-200"
                                >
                                    About Us
                                </button>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}