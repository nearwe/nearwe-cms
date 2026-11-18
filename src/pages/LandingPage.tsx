import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
    ArrowRight,
    Bot,
    ChevronDown,
    Cloud,
    Code2,
    Cpu,
    Globe,
    Layers,
    Mail,
    MapPin,
    Megaphone,
    PenTool,
    Rocket,
    Search,
    ShieldCheck,
    Smartphone,
    Sparkles,
    type LucideIcon,
} from "lucide-react";

import iosLogo from "../assets/logo/ios.png";
import playstoreLogo from "../assets/logo/playstore.png";
import { services as companyServices } from "./CompanyServices";
import ClientsCarousel from "../components/ClientsCarousel";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

// ─── Constants ────────────────────────────────────────────────────────────────
const APP_STORE_URL = "https://apps.apple.com/sv/app/nearwe/id6760259527?l=en-GB";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.pp2053.nearwe";

function getDeviceOS(): "ios" | "android" | "other" {
    if (typeof navigator === "undefined") return "other";
    const ua = navigator.userAgent || (navigator as any).vendor || (window as any).opera || "";
    if (/iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream) return "ios";
    if (/android/i.test(ua)) return "android";
    return "other";
}

function openExternal(url: string) {
    window.open(url, "_blank", "noopener,noreferrer");
}

const prefersReducedMotion = () =>
    typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// ─── Particle Canvas ──────────────────────────────────────────────────────────
interface Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
    color: string;
}

function ParticleCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const reduced = prefersReducedMotion();
        const colors = ["#1d4ed8", "#2563eb", "#3b82f6", "#0ea5e9", "#60a5fa"];
        const mouse = { x: -9999, y: -9999 };
        let particles: Particle[] = [];
        let raf = 0;
        let running = true;

        const resize = () => {
            const parent = canvas.parentElement;
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const w = parent?.clientWidth ?? window.innerWidth;
            const h = parent?.clientHeight ?? window.innerHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            const count = Math.min(70, Math.floor(w / 18));
            particles = Array.from({ length: count }, () => ({
                x: Math.random() * w,
                y: Math.random() * h,
                size: Math.random() * 2.2 + 0.6,
                speedX: (Math.random() - 0.5) * 0.45,
                speedY: (Math.random() - 0.5) * 0.45,
                opacity: Math.random() * 0.35 + 0.15,
                color: colors[Math.floor(Math.random() * colors.length)],
            }));
        };
        resize();
        window.addEventListener("resize", resize);

        const onMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };
        window.addEventListener("mousemove", onMouseMove);

        const onVisibility = () => {
            running = !document.hidden;
            if (running && !reduced) raf = requestAnimationFrame(draw);
        };
        document.addEventListener("visibilitychange", onVisibility);

        const draw = () => {
            if (!running) return;
            const w = canvas.clientWidth;
            const h = canvas.clientHeight;
            ctx.clearRect(0, 0, w, h);

            for (const p of particles) {
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const dist = Math.hypot(dx, dy);
                if (dist > 0 && dist < 120) {
                    p.x += (dx / dist) * 1.4;
                    p.y += (dy / dist) * 1.4;
                }
                p.x += p.speedX;
                p.y += p.speedY;
                if (p.x < 0) p.x = w;
                if (p.x > w) p.x = 0;
                if (p.y < 0) p.y = h;
                if (p.y > h) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.opacity;
                ctx.fill();
            }

            ctx.globalAlpha = 1;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const a = particles[i];
                    const b = particles[j];
                    const d = Math.hypot(a.x - b.x, a.y - b.y);
                    if (d < 100) {
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.strokeStyle = `rgba(37,99,235,${0.12 * (1 - d / 100)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
            raf = requestAnimationFrame(draw);
        };

        draw();
        if (reduced) cancelAnimationFrame(raf);

        return () => {
            running = false;
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("visibilitychange", onVisibility);
        };
    }, []);

    return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }} />;
}

// ─── Hooks & small components ─────────────────────────────────────────────────
function useScrollReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.15) {
    const ref = useRef<T>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (typeof IntersectionObserver === "undefined") {
            setVisible(true);
            return;
        }
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
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
        <div ref={ref} className={`nw-reveal ${visible ? "nw-visible" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
            {children}
        </div>
    );
}

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
    const [count, setCount] = useState(0);
    const { ref, visible } = useScrollReveal<HTMLSpanElement>(0.5);

    useEffect(() => {
        if (!visible) return;
        if (prefersReducedMotion()) {
            setCount(target);
            return;
        }
        let raf = 0;
        let start = 0;
        const duration = 1800;
        const step = (ts: number) => {
            if (!start) start = ts;
            const progress = Math.min((ts - start) / duration, 1);
            setCount(Math.floor((1 - Math.pow(1 - progress, 3)) * target));
            if (progress < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf);
    }, [visible, target]);

    return (
        <span ref={ref}>
            {count.toLocaleString("en-IN")}
            {suffix}
        </span>
    );
}

function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    const cardRef = useRef<HTMLDivElement>(null);

    const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = cardRef.current;
        if (!card || prefersReducedMotion()) return;
        const r = card.getBoundingClientRect();
        const rx = ((e.clientY - r.top - r.height / 2) / (r.height / 2)) * -6;
        const ry = ((e.clientX - r.left - r.width / 2) / (r.width / 2)) * 6;
        card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02,1.02,1.02)`;
    };
    const onLeave = () => {
        if (cardRef.current) cardRef.current.style.transform = "perspective(900px) rotateX(0) rotateY(0) scale3d(1,1,1)";
    };

    return (
        <div ref={cardRef} className={className} onMouseMove={onMove} onMouseLeave={onLeave} style={{ transition: "transform 0.15s ease-out" }}>
            {children}
        </div>
    );
}

function MagneticButton({
    children,
    onClick,
    className = "",
}: {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
}) {
    const btnRef = useRef<HTMLButtonElement>(null);

    const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        const btn = btnRef.current;
        if (!btn || prefersReducedMotion()) return;
        const r = btn.getBoundingClientRect();
        btn.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.2}px, ${(e.clientY - r.top - r.height / 2) * 0.2}px)`;
    };
    const onLeave = () => {
        if (btnRef.current) btnRef.current.style.transform = "translate(0,0)";
    };

    return (
        <button
            type="button"
            ref={btnRef}
            onClick={onClick}
            className={className}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            style={{ transition: "transform 0.3s cubic-bezier(0.23,1,0.32,1), box-shadow 0.3s ease" }}
        >
            {children}
        </button>
    );
}

function TypingText({ phrases }: { phrases: string[] }) {
    const [index, setIndex] = useState(0);
    const [text, setText] = useState("");
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const current = phrases[index];
        let t: ReturnType<typeof setTimeout>;
        if (!deleting && text === current) {
            t = setTimeout(() => setDeleting(true), 1800);
        } else if (deleting && text === "") {
            setDeleting(false);
            setIndex((i) => (i + 1) % phrases.length);
            return;
        } else {
            t = setTimeout(
                () => setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1)),
                deleting ? 35 : 70
            );
        }
        return () => clearTimeout(t);
    }, [text, deleting, index, phrases]);

    return (
        <span className="text-blue-700 font-semibold">
            {text}
            <span className="inline-block w-0.5 h-[1em] bg-blue-700 ml-1 align-middle" style={{ animation: "nw-blink 1s step-end infinite" }} />
        </span>
    );
}

function SectionHeading({ tag, title, subtitle }: { tag: string; title: string; subtitle?: string }) {
    return (
        <Reveal className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-200 rounded-full mb-4">
                <span className="text-blue-700 text-xs font-semibold uppercase tracking-widest">{tag}</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold nw-gradient-text mb-4 pb-1">{title}</h2>
            {subtitle && <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">{subtitle}</p>}
        </Reveal>
    );
}

// ─── Globe ────────────────────────────────────────────────────────────────────
function AnimatedGlobe() {
    return (
        <div className="relative w-72 h-72 xl:w-80 xl:h-80 mx-auto" aria-hidden="true">
            <div className="absolute inset-0 rounded-full border border-blue-200" style={{ animation: "nw-spin 24s linear infinite" }}>
                {[0, 60, 120, 180, 240, 300].map((deg) => (
                    <div
                        key={deg}
                        className="absolute w-2 h-2 rounded-full bg-blue-500/70"
                        style={{ top: "50%", left: "50%", transform: `rotate(${deg}deg) translateX(143px) translateY(-50%)` }}
                    />
                ))}
            </div>
            <div className="absolute inset-8 rounded-full border border-blue-300/70" style={{ animation: "nw-spin 14s linear infinite reverse" }}>
                {[0, 90, 180, 270].map((deg) => (
                    <div
                        key={deg}
                        className="absolute w-1.5 h-1.5 rounded-full bg-sky-500/80"
                        style={{ top: "50%", left: "50%", transform: `rotate(${deg}deg) translateX(111px) translateY(-50%)` }}
                    />
                ))}
            </div>
            <div className="absolute inset-16 rounded-full border border-blue-300" style={{ animation: "nw-spin 9s linear infinite" }} />

            <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-24 h-24">
                    <div className="absolute inset-0 rounded-full bg-blue-400/25 blur-xl" style={{ animation: "nw-pulse 2.4s ease-in-out infinite" }} />
                    <div className="absolute inset-2 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 shadow-lg shadow-blue-900/25 flex items-center justify-center">
                        <Globe className="w-9 h-9 text-white" />
                    </div>
                </div>
            </div>

            {[
                { top: "10%", left: "62%", delay: "0s", Icon: Smartphone },
                { top: "55%", left: "6%", delay: "0.5s", Icon: Cloud },
                { top: "78%", left: "66%", delay: "1s", Icon: Cpu },
                { top: "22%", left: "10%", delay: "1.5s", Icon: Code2 },
            ].map(({ top, left, delay, Icon }, i) => (
                <div key={i} className="absolute" style={{ top, left, animation: "nw-float-pin 3.2s ease-in-out infinite", animationDelay: delay }}>
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-lg shadow-slate-300/50">
                        <Icon className="w-4 h-4 text-blue-700" />
                    </div>
                </div>
            ))}
        </div>
    );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = `
  :root { --nw-border: #e2e8f0; }

  .font-display { font-family: 'Space Grotesk', system-ui, sans-serif; letter-spacing: -0.02em; }
  .font-body { font-family: 'DM Sans', system-ui, sans-serif; }

  @keyframes nw-blink { 50% { opacity: 0; } }
  @keyframes nw-spin { to { transform: rotate(360deg); } }
  @keyframes nw-pulse { 0%,100% { transform: scale(1); opacity: .6; } 50% { transform: scale(1.35); opacity: 1; } }
  @keyframes nw-float-pin { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
  @keyframes nw-slide-up { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes nw-gradient { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
  @keyframes nw-shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
  @keyframes nw-glow { 0%,100% { box-shadow: 0 8px 20px -8px rgba(29,78,216,.35); } 50% { box-shadow: 0 12px 30px -8px rgba(29,78,216,.5); } }
  @keyframes nw-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
  @keyframes nw-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  @keyframes nw-bounce { 0%,100% { transform: translateY(0); } 50% { transform: translateY(6px); } }

  .nw-hero-word { display: inline-block; margin-right: .28em; animation: nw-slide-up .7s cubic-bezier(.16,1,.3,1) both; }
  .nw-hero-word:nth-child(1) { animation-delay: .15s; }
  .nw-hero-word:nth-child(2) { animation-delay: .3s; }
  .nw-hero-word:nth-child(3) { animation-delay: .45s; }

  .nw-shimmer::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,.28) 50%, transparent 60%);
    animation: nw-shimmer 2.8s infinite; pointer-events: none;
  }

  .nw-gradient-text {
    background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 45%, #1d4ed8 75%, #0284c7 100%);
    background-size: 200% 200%;
    -webkit-background-clip: text; background-clip: text;
    -webkit-text-fill-color: transparent; color: transparent;
    animation: nw-gradient 6s ease infinite;
    padding-bottom: 0.14em; line-height: 1.15;
  }

  .nw-glass {
    background: #ffffff;
    border: 1px solid var(--nw-border);
    box-shadow: 0 1px 3px rgba(15,23,42,.05);
    transition: border-color .3s ease, box-shadow .3s ease;
  }
  .nw-glass:hover { border-color: #bfdbfe; box-shadow: 0 20px 45px -20px rgba(15,23,42,.22); }

  .nw-glow-btn { animation: nw-glow 3s ease-in-out infinite; }
  .nw-floating { animation: nw-float 6s ease-in-out infinite; }

  .nw-reveal { opacity: 0; transform: translateY(24px); transition: opacity .7s ease, transform .7s cubic-bezier(.16,1,.3,1); }
  .nw-visible { opacity: 1; transform: translateY(0); }

  .nw-marquee-track { display: flex; width: max-content; animation: nw-marquee 34s linear infinite; }
  .nw-marquee:hover .nw-marquee-track { animation-play-state: paused; }


  @media (prefers-reduced-motion: reduce) {
    .nw-reveal { opacity: 1; transform: none; transition: none; }
    .nw-hero-word, .nw-gradient-text, .nw-glow-btn, .nw-floating, .nw-marquee-track { animation: none !important; }
  }
`;

// ─── Data ─────────────────────────────────────────────────────────────────────
const CAPABILITIES: { label: string; Icon: LucideIcon }[] = [
    { label: "Web Platforms", Icon: Globe },
    { label: "Mobile Apps", Icon: Smartphone },
    { label: "Cloud & DevOps", Icon: Cloud },
    { label: "AI & Automation", Icon: Bot },
    { label: "SaaS Products", Icon: Layers },
    { label: "UI / UX Design", Icon: PenTool },
    { label: "Secure Engineering", Icon: ShieldCheck },
    { label: "IT Consulting", Icon: Code2 },
];

const PROCESS: { step: string; title: string; desc: string; Icon: LucideIcon }[] = [
    { step: "01", title: "Discover", desc: "We understand your goals, users and constraints before writing a single line of code.", Icon: Search },
    { step: "02", title: "Design", desc: "Clear architecture and clean UI/UX that your team and customers will actually enjoy.", Icon: PenTool },
    { step: "03", title: "Build", desc: "Fast, iterative development with regular demos, testing and transparent progress.", Icon: Code2 },
    { step: "04", title: "Launch & Scale", desc: "Cloud deployment, monitoring and continuous improvement as your product grows.", Icon: Rocket },
];

const STATS = [
    { value: 10000, suffix: "+", label: "Community Members" },
    { value: 500, suffix: "+", label: "Events Daily" },
    { value: 50, suffix: "+", label: "Cities" },
    { value: 98, suffix: "%", label: "Satisfaction" },
];

const FALLBACK_GRADIENT = "from-blue-50 to-sky-100";

// ─── Main Component ───────────────────────────────────────────────────────────
export default function NearWeLandingPage() {
    const [heroVisible, setHeroVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const t = setTimeout(() => setHeroVisible(true), 80);
        return () => clearTimeout(t);
    }, []);

    const scrollToId = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });


    // Services list (icons fall back safely if a service has no icon)
    const features = (companyServices ?? []).slice(0, 6).map((s: any) => ({
        Icon: (s?.icon as LucideIcon) || Sparkles,
        title: s?.title ?? "Service",
        desc: s?.desc ?? "",
        gradient: s?.gradient || FALLBACK_GRADIENT,
        iconColor: s?.iconColor || "text-blue-700",
    }));

    return (
        <>
            <style>{styles}</style>
            <Helmet>
                <title>NearWe Labs - IT Consulting, Services & SaaS Products</title>
                <meta
                    name="description"
                    content="NearWe Labs is an IT consulting, IT services, and SaaS product company building web apps, mobile apps, cloud systems, and AI products."
                />
                <meta name="keywords" content="NearWe Labs, IT consulting, web development, mobile apps, AI products, SaaS, Indore" />
                <meta property="og:title" content="NearWe Labs - IT Services & Products" />
                <meta
                    property="og:description"
                    content="NearWe Labs delivers IT consulting, development, cloud & AI products including NearWe App and Vestora AI."
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://nearwe.in" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="theme-color" content="#ffffff" />
                <link rel="canonical" href="https://nearwe.in" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=DM+Sans:wght@300;400;500;700&display=swap"
                />
            </Helmet>

            <div className="font-body bg-white text-slate-900 overflow-x-hidden min-h-screen">
                <SiteHeader />

                <main>
                    {/* ── Hero ── */}
                    <section className="relative flex items-center justify-center pt-32 pb-12 px-4 sm:px-6 overflow-hidden border-b border-slate-200 bg-gradient-to-b from-blue-50/80 via-white to-white">
                        <ParticleCanvas />

                        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }} aria-hidden="true">
                            <div className="absolute top-20 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-blue-200/40 rounded-full blur-3xl" style={{ animation: "nw-pulse 5s ease-in-out infinite" }} />
                            <div className="absolute bottom-20 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-sky-200/40 rounded-full blur-3xl" style={{ animation: "nw-pulse 5s ease-in-out infinite", animationDelay: "2s" }} />
                            <div
                                className="absolute inset-0"
                                style={{
                                    backgroundImage:
                                        "linear-gradient(rgba(29,78,216,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(29,78,216,0.05) 1px, transparent 1px)",
                                    backgroundSize: "60px 60px",
                                    maskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
                                    WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 80%)",
                                }}
                            />
                        </div>

                        <div className="relative z-10 max-w-6xl mx-auto w-full">
                            <div className="grid lg:grid-cols-2 gap-12 items-center">
                                <div className={`text-center lg:text-left transition-opacity duration-1000 ${heroVisible ? "opacity-100" : "opacity-0"}`}>
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-slate-200 shadow-sm rounded-full mb-6">
                                        <Sparkles className="w-4 h-4 text-blue-700" />
                                        <span className="text-slate-700 text-sm font-semibold">AI-first IT consulting, services & products</span>
                                    </div>

                                    <h1 className="font-display text-5xl sm:text-6xl font-bold mb-5 leading-[1.08]">
                                        <span className="nw-hero-word nw-gradient-text pb-1">Build.</span>
                                        <span className="nw-hero-word nw-gradient-text pb-1">Launch.</span>
                                        <span className="nw-hero-word nw-gradient-text pb-1">Scale.</span>
                                    </h1>

                                    <p className="text-lg sm:text-xl text-slate-700 mb-3">
                                        NearWe Labs builds <TypingText phrases={["web platforms", "mobile apps", "SaaS products", "AI tools"]} />
                                    </p>

                                    <p className="text-base sm:text-lg text-slate-600 mb-9 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                                        We help startups and businesses design, build, deploy and scale modern digital products — from idea to
                                        production, with a team that ships.
                                    </p>

                                    <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-9">
                                        <MagneticButton
                                            onClick={() => navigate("/companyservices")}
                                            className="group relative overflow-hidden px-8 py-4 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-md shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2"
                                        >
                                            <span className="relative z-10 flex items-center gap-2">
                                                Explore Services
                                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                            </span>
                                        </MagneticButton>

                                        <button
                                            type="button"
                                            onClick={() => navigate("/products")}
                                            className="px-8 py-4 border border-slate-300 bg-white hover:border-slate-400 hover:bg-slate-50 text-slate-800 font-semibold rounded-md transition-all duration-300 flex items-center justify-center gap-2"
                                        >
                                            <Layers className="w-5 h-5" />
                                            Our Products
                                        </button>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 justify-center lg:justify-start text-sm text-slate-600">
                                        <span className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-blue-700" />
                                            <span>
                                                <span className="text-slate-900 font-semibold">10,000+</span> community members on NearWe
                                            </span>
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <ShieldCheck className="w-4 h-4 text-blue-700" />
                                            Secure, scalable engineering
                                        </span>
                                    </div>
                                </div>

                                <div className="hidden lg:flex items-center justify-center nw-floating" style={{ animationDelay: "0.5s" }}>
                                    <AnimatedGlobe />
                                </div>
                            </div>

                            <ClientsCarousel className="mt-12" />

                            <div className="flex justify-center mt-8">
                                <button
                                    type="button"
                                    onClick={() => scrollToId("#services")}
                                    aria-label="Scroll to services"
                                    className="flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity"
                                >
                                    <span className="text-xs text-slate-500 tracking-widest uppercase">Scroll</span>
                                    <ChevronDown className="w-5 h-5 text-blue-700" style={{ animation: "nw-bounce 2s ease-in-out infinite" }} />
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* ── Wayyo launch feature ── */}
                    <section className="px-4 sm:px-6 py-12 sm:py-16" aria-labelledby="wayyo-launch-title">
                        <div className="max-w-6xl mx-auto">
                            <Link
                                to="/wayyo"
                                className="group relative block overflow-hidden rounded-3xl border border-[#BFCDF0] bg-gradient-to-br from-[#EEF2FC] via-white to-[#EEF2FC] p-6 sm:p-10 shadow-sm transition-all duration-300 hover:border-[#3559C7]/50 hover:shadow-xl hover:shadow-[#3559C7]/10"
                            >
                                <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{ background: "radial-gradient(ellipse at 80% 30%, rgba(53,89,199,.12), transparent 50%)" }} />
                                <div className="relative grid lg:grid-cols-[1fr_1.05fr] gap-8 lg:gap-12 items-center">
                                    <div>
                                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#BFCDF0] bg-white text-[#3559C7] text-xs font-bold uppercase tracking-wide mb-5">
                                            <img src="/logo-bg-trans.png" alt="NearWe Labs" className="h-5 w-5 rounded bg-[#202A40] object-contain p-0.5" /> Available now · Wayyo by NearWe Labs
                                        </div>
                                        <h2 id="wayyo-launch-title" className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 text-slate-900">
                                            Your work.<br /><span className="text-[#3559C7]">On autopilot.</span>
                                        </h2>
                                        <p className="text-slate-600 leading-relaxed max-w-xl mb-6">
                                            Stop repeating tasks. Build visual workflows that schedule actions and handle everyday work on your Windows PC, with local-first automation.
                                        </p>
                                        <span className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-[#3559C7] text-white font-semibold text-sm shadow-sm group-hover:bg-[#2849AA] transition-colors">
                                            Explore Wayyo <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                        <p className="text-xs text-slate-500 mt-4">Windows desktop · Offline-first workflows · Visual builder</p>
                                    </div>
                                    <div className="rounded-2xl border border-[#BFCDF0] bg-[#EEF2FC] p-3 sm:p-4 text-[#202A40] shadow-2xl shadow-[#3559C7]/15" aria-label="Illustrative preview of the Wayyo workflow dashboard">
                                        <div className="flex items-center justify-between gap-3 border-b border-[#D9E1F2] pb-3 mb-3">
                                            <div className="flex items-center gap-2 text-xs font-bold"><span className="w-6 h-6 rounded-md bg-[#3559C7] text-white grid place-items-center">w</span> wayyo <span className="text-[10px] font-medium text-emerald-700">● Local engine ready</span></div>
                                            <span className="text-[10px] text-gray-500">LOCAL NODE · WINDOWS</span>
                                        </div>
                                        <div className="grid grid-cols-[1fr_1.45fr] gap-3">
                                            <div className="space-y-2 text-[10px] text-gray-600">
                                                {[["⌂", "Home"], ["◇", "Visual Builder"], ["▦", "Templates"], ["◷", "Schedules"], ["⌁", "Activity"]].map(([icon, label]) => <div key={label} className={`rounded-md px-2 py-1.5 ${label === "Home" ? "bg-violet-100 text-violet-800" : ""}`}><span className="mr-2">{icon}</span>{label}</div>)}
                                            </div>
                                            <div>
                                                <div className="rounded-lg bg-white border border-[#D9E1F2] p-3 mb-2">
                                                    <div className="text-[9px] uppercase text-[#3559C7] font-bold">Your automations, at a glance</div>
                                                    <div className="text-base font-bold mt-1">Make routine work disappear.</div>
                                                    <div className="text-[9px] text-gray-500 mt-1">Create workflows. Run them locally.</div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-2 mb-2">
                                                    {[ ["08", "Active workflows"], ["24", "Successful runs"] ].map(([value, label]) => <div key={label} className="rounded-lg border border-[#D9E1F2] bg-white p-2"><div className="font-bold text-sm">{value}</div><div className="text-[8px] text-gray-500">{label}</div></div>)}
                                                </div>
                                                <div className="rounded-lg bg-white border border-[#D9E1F2] px-2.5 py-2 text-[9px] flex items-center justify-between"><span><b>Downloads Organizer</b><br /><span className="text-gray-500">File system event · Sort files → Move</span></span><span className="text-emerald-700">● Success</span></div>
                                            </div>
                                        </div>
                                        <div className="text-right text-[9px] text-gray-400 mt-2">Illustrative product preview</div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </section>

                    {/* ── Capabilities marquee ── */}
                    <section aria-label="Capabilities" className="py-6 border-y border-slate-200 bg-slate-50 nw-marquee overflow-hidden">
                        <div className="nw-marquee-track">
                            {[...CAPABILITIES, ...CAPABILITIES].map(({ label, Icon }, i) => (
                                <div key={i} className="flex items-center gap-3 px-8 text-slate-600 whitespace-nowrap" aria-hidden={i >= CAPABILITIES.length}>
                                    <Icon className="w-5 h-5 text-blue-700" />
                                    <span className="text-sm font-semibold tracking-wide">{label}</span>
                                    <span className="ml-8 w-1 h-1 rounded-full bg-slate-300" />
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* ── Services ── */}
                    <section id="services" className="py-24 px-4 sm:px-6 scroll-mt-16">
                        <div className="max-w-6xl mx-auto">
                            <SectionHeading
                                tag="Services"
                                title="Everything You Need To Ship"
                                subtitle="From first prototype to production scale — one team for design, engineering, cloud and AI."
                            />

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {features.map((f, i) => (
                                    <Reveal key={i} delay={i * 80}>
                                        <TiltCard className="nw-glass rounded-2xl p-6 sm:p-8 h-full group cursor-default">
                                            <div className={`w-14 h-14 min-w-[3.5rem] min-h-[3.5rem] shrink-0 mb-5 rounded-2xl bg-gradient-to-br ${f.gradient} ring-1 ring-slate-200/70 flex items-center justify-center overflow-visible`}>
                                                <f.Icon className={`w-7 h-7 shrink-0 ${f.iconColor}`} strokeWidth={1.75} />
                                            </div>
                                            <h3 className="font-display text-lg font-bold mb-2 text-slate-900 group-hover:text-blue-700 transition-colors duration-300">
                                                {f.title}
                                            </h3>
                                            <p className="text-slate-600 text-sm leading-relaxed">{f.desc}</p>
                                            <div className="mt-5 h-px w-0 group-hover:w-full bg-gradient-to-r from-blue-600/60 to-transparent transition-all duration-500" />
                                        </TiltCard>
                                    </Reveal>
                                ))}
                            </div>

                            <div className="text-center mt-10">
                                <Link
                                    to="/companyservices"
                                    className="inline-flex items-center gap-2 px-6 py-3 border border-slate-300 bg-white hover:border-slate-400 hover:bg-slate-50 text-slate-800 font-semibold rounded-md transition-colors"
                                >
                                    View all services <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    </section>

                    {/* ── Process ── */}
                    <section id="process" className="py-24 px-4 sm:px-6 scroll-mt-16 bg-slate-50 border-y border-slate-200">
                        <div className="max-w-6xl mx-auto">
                            <SectionHeading
                                tag="How We Work"
                                title="From Idea To Launch"
                                subtitle="A simple, transparent process so you always know what's happening and what's next."
                            />

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {PROCESS.map(({ step, title, desc, Icon }, i) => (
                                    <Reveal key={step} delay={i * 100}>
                                        <div className="nw-glass rounded-2xl p-6 h-full relative overflow-hidden">
                                            <span className="font-display absolute -top-2 right-4 text-6xl font-bold text-slate-100 select-none">{step}</span>
                                            <div className="relative w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-4">
                                                <Icon className="w-6 h-6 text-blue-700" />
                                            </div>
                                            <h3 className="relative font-display text-lg font-bold mb-2 text-slate-900">{title}</h3>
                                            <p className="relative text-sm text-slate-600 leading-relaxed">{desc}</p>
                                        </div>
                                    </Reveal>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* ── Stats ── */}
                    <section className="py-16 px-4 sm:px-6">
                        <div className="max-w-5xl mx-auto">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {STATS.map((stat, i) => (
                                    <Reveal key={stat.label} delay={i * 100}>
                                        <TiltCard className="nw-glass rounded-2xl p-6 text-center">
                                            <div className="font-display text-3xl sm:text-4xl font-bold nw-gradient-text mb-1 pb-1">
                                                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                                            </div>
                                            <div className="text-xs text-slate-500 font-medium uppercase tracking-widest">{stat.label}</div>
                                        </TiltCard>
                                    </Reveal>
                                ))}
                            </div>
                            <p className="text-center text-xs text-slate-500 mt-4">Figures reflect the NearWe community app.</p>
                        </div>
                    </section>

                    {/* ── Advertise ── */}
                    <section className="py-24 px-4 sm:px-6 relative overflow-hidden">
                        <div className="max-w-4xl mx-auto">
                            <Reveal>
                                <div className="rounded-3xl p-8 sm:p-14 text-center relative overflow-hidden bg-gradient-to-br from-blue-800 to-blue-950 text-white shadow-xl shadow-blue-900/20">
                                    <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 bg-sky-400/20 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
                                    <div className="relative">
                                        <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-white/10 ring-1 ring-white/20 flex items-center justify-center">
                                            <Megaphone className="w-7 h-7 text-white" />
                                        </div>
                                        <h2 className="font-display text-3xl sm:text-5xl font-bold text-white mb-5 pb-1">Advertise With NearWe</h2>
                                        <p className="text-blue-100 max-w-xl mx-auto mb-8 leading-relaxed">
                                            Promote your brand, products or services directly to engaged local users across Android and iOS. Reach your
                                            exact audience with precise ad placements.
                                        </p>
                                        <MagneticButton
                                            onClick={() => navigate("/advertise")}
                                            className="group relative overflow-hidden inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-blue-50 text-slate-900 font-semibold rounded-md"
                                        >
                                            <span className="relative z-10 flex items-center gap-2">
                                                Start Advertising
                                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                            </span>
                                        </MagneticButton>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </section>

                    {/* ── Contact + Download ── */}
                    <section className="py-24 px-4 sm:px-6 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-white pointer-events-none" aria-hidden="true" />
                        <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
                            <Reveal>
                                <div className="nw-glass rounded-3xl p-8 sm:p-10 h-full flex flex-col">
                                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-5">
                                        <Mail className="w-6 h-6 text-blue-700" />
                                    </div>
                                    <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3 text-slate-900">Have a project in mind?</h2>
                                    <p className="text-slate-600 mb-8 leading-relaxed flex-1">
                                        Tell us what you want to build. We'll get back with a clear plan, timeline and next steps.
                                    </p>
                                    <div className="flex flex-wrap gap-3">
                                        <MagneticButton
                                            onClick={() => navigate("/contact")}
                                            className="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold rounded-md shadow-sm flex items-center gap-2"
                                        >
                                            Talk to us <ArrowRight className="w-4 h-4" />
                                        </MagneticButton>
                                        <a
                                            href="mailto:support@nearwe.in"
                                            className="px-6 py-3 text-sm font-medium border border-slate-300 bg-white hover:border-slate-400 hover:bg-slate-50 text-slate-800 rounded-md transition-colors"
                                        >
                                            support@nearwe.in
                                        </a>
                                    </div>
                                </div>
                            </Reveal>

                            <Reveal delay={100}>
                                <div className="nw-glass rounded-3xl p-8 sm:p-10 h-full flex flex-col">
                                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-5">
                                        <Smartphone className="w-6 h-6 text-blue-700" />
                                    </div>
                                    <h2 className="font-display text-2xl sm:text-3xl font-bold mb-3 text-slate-900">Your community awaits</h2>
                                    <p className="text-slate-600 mb-8 leading-relaxed flex-1">
                                        Download the NearWe app to discover events and connect with people in your city.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <button
                                            type="button"
                                            onClick={() => openExternal(APP_STORE_URL)}
                                            className="group relative overflow-hidden flex items-center justify-center gap-3 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-sm transition-all duration-300"
                                        >
                                            <img src={iosLogo} className="w-6 h-6 object-contain" alt="" />
                                            <span className="text-left">
                                                <span className="block text-[10px] opacity-70 leading-none">Download on the</span>
                                                <span className="block text-base font-bold leading-tight">App Store</span>
                                            </span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => openExternal(PLAY_STORE_URL)}
                                            className="flex items-center justify-center gap-3 px-6 py-3 border border-slate-300 bg-white hover:border-slate-400 hover:bg-slate-50 text-slate-900 rounded-xl shadow-sm transition-all duration-300"
                                        >
                                            <img src={playstoreLogo} className="w-6 h-6 object-contain" alt="" />
                                            <span className="text-left">
                                                <span className="block text-[10px] opacity-60 leading-none">Get it on</span>
                                                <span className="block text-base font-bold leading-tight">Google Play</span>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </section>
                </main>

                <SiteFooter />
            </div>
        </>
    );
}