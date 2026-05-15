"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
    ChevronDown,
    MapPin,
    Users,
    Calendar,
    ArrowRight,
    Sparkles,
    Zap,
    Globe,
} from "lucide-react";

import iosLogo from "../assets/logo/ios.png";
import playstoreLogo from "../assets/logo/playstore.png";
import nearweLogo from "../assets/logo/logo-removebg.png";

// ─── OS Detection ──────────────────────────────────────────────────────────────
function getDeviceOS(): "ios" | "android" | "other" {
    const ua = navigator.userAgent || navigator.vendor || (window as any).opera;
    if (/iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream) return "ios";
    if (/android/i.test(ua)) return "android";
    return "other";
}

const APP_STORE_URL = "https://apps.apple.com/sv/app/nearwe/id6760259527?l=en-GB";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.pp2053.nearwe";

function getDownloadURL(): string {
    const os = getDeviceOS();
    if (os === "ios") return APP_STORE_URL;
    return PLAY_STORE_URL;
}

function openDownload() {
    window.open(getDownloadURL(), "_blank");
}

// ─── Particle System ────────────────────────────────────────────────────────
interface Particle {
    id: number;
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
    const particlesRef = useRef<Particle[]>([]);
    const animFrameRef = useRef<number>(0);
    const mouseRef = useRef({ x: -9999, y: -9999 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        const colors = ["#22d3ee", "#38bdf8", "#67e8f9", "#a5f3fc", "#0ea5e9"];
        const count = Math.min(80, Math.floor(window.innerWidth / 15));

        particlesRef.current = Array.from({ length: count }, (_, i) => ({
            id: i,
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2.5 + 0.5,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            opacity: Math.random() * 0.6 + 0.2,
            color: colors[Math.floor(Math.random() * colors.length)],
        }));

        const onMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener("mousemove", onMouseMove);

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particlesRef.current.forEach((p) => {
                // Mouse repulsion
                const dx = p.x - mouseRef.current.x;
                const dy = p.y - mouseRef.current.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    p.x += (dx / dist) * 1.5;
                    p.y += (dy / dist) * 1.5;
                }

                p.x += p.speedX;
                p.y += p.speedY;

                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.opacity;
                ctx.fill();
            });

            // Draw connections
            ctx.globalAlpha = 1;
            particlesRef.current.forEach((a, i) => {
                particlesRef.current.slice(i + 1).forEach((b) => {
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 100) {
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.strokeStyle = `rgba(34,211,238,${0.15 * (1 - dist / 100)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });
            });

            animFrameRef.current = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animFrameRef.current);
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", onMouseMove);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 1 }}
        />
    );
}

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

// ─── Animated Counter ───────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
    const [count, setCount] = useState(0);
    const { ref, visible } = useScrollReveal(0.5);

    useEffect(() => {
        if (!visible) return;
        let start = 0;
        const duration = 1800;
        const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [visible, target]);

    return (
        <span ref={ref}>
            {count.toLocaleString()}{suffix}
        </span>
    );
}

// ─── Tilt Card ──────────────────────────────────────────────────────────────
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rotateX = ((y - cy) / cy) * -8;
        const rotateY = ((x - cx) / cx) * 8;
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
    };

    const handleMouseLeave = () => {
        const card = cardRef.current;
        if (card) card.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`;
    };

    return (
        <div
            ref={cardRef}
            className={className}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transition: "transform 0.15s ease-out" }}
        >
            {children}
        </div>
    );
}

// ─── Magnetic Button ────────────────────────────────────────────────────────
function MagneticButton({ children, onClick, className = "" }: { children: React.ReactNode; onClick?: () => void; className?: string }) {
    const btnRef = useRef<HTMLButtonElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        const btn = btnRef.current;
        if (!btn) return;
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    };

    const handleMouseLeave = () => {
        const btn = btnRef.current;
        if (btn) btn.style.transform = "translate(0,0)";
    };

    return (
        <button
            ref={btnRef}
            onClick={onClick}
            className={className}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transition: "transform 0.3s cubic-bezier(0.23,1,0.32,1)" }}
        >
            {children}
        </button>
    );
}

// ─── Typing Text ────────────────────────────────────────────────────────────
function TypingText({ phrases }: { phrases: string[] }) {
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [displayed, setDisplayed] = useState("");
    const [deleting, setDeleting] = useState(false);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (paused) {
            const t = setTimeout(() => { setDeleting(true); setPaused(false); }, 2000);
            return () => clearTimeout(t);
        }
        const current = phrases[phraseIndex];
        if (!deleting) {
            if (displayed.length < current.length) {
                const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 70);
                return () => clearTimeout(t);
            } else {
                setPaused(true);
            }
        } else {
            if (displayed.length > 0) {
                const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
                return () => clearTimeout(t);
            } else {
                setDeleting(false);
                setPhraseIndex((phraseIndex + 1) % phrases.length);
            }
        }
    }, [displayed, deleting, paused, phraseIndex, phrases]);

    return (
        <span className="text-cyan-400">
            {displayed}
            <span
                className="inline-block w-0.5 h-[1em] bg-cyan-400 ml-1 align-middle"
                style={{ animation: "blink 1s step-end infinite" }}
            />
        </span>
    );
}

// ─── Globe Animation ────────────────────────────────────────────────────────
function AnimatedGlobe() {
    return (
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto">
            {/* Outer ring */}
            <div
                className="absolute inset-0 rounded-full border border-cyan-500/20"
                style={{ animation: "spin 20s linear infinite" }}
            >
                {[0, 60, 120, 180, 240, 300].map((deg) => (
                    <div
                        key={deg}
                        className="absolute w-2 h-2 rounded-full bg-cyan-400/60"
                        style={{
                            top: "50%",
                            left: "50%",
                            transform: `rotate(${deg}deg) translateX(127px) translateY(-50%)`,
                        }}
                    />
                ))}
            </div>
            {/* Middle ring */}
            <div
                className="absolute inset-8 rounded-full border border-cyan-500/30"
                style={{ animation: "spin 12s linear infinite reverse" }}
            >
                {[0, 90, 180, 270].map((deg) => (
                    <div
                        key={deg}
                        className="absolute w-1.5 h-1.5 rounded-full bg-blue-400/70"
                        style={{
                            top: "50%",
                            left: "50%",
                            transform: `rotate(${deg}deg) translateX(79px) translateY(-50%)`,
                        }}
                    />
                ))}
            </div>
            {/* Inner ring */}
            <div
                className="absolute inset-16 rounded-full border border-cyan-500/40"
                style={{ animation: "spin 8s linear infinite" }}
            />
            {/* Core glow */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-20 h-20">
                    <div
                        className="absolute inset-0 rounded-full bg-cyan-500/20 blur-xl"
                        style={{ animation: "pulse-glow 2s ease-in-out infinite" }}
                    />
                    <div className="absolute inset-2 rounded-full bg-gradient-to-br from-cyan-400/40 to-blue-600/40 backdrop-blur-sm border border-cyan-400/40 flex items-center justify-center">
                        <Globe className="w-8 h-8 text-cyan-300" />
                    </div>
                </div>
            </div>
            {/* Floating location pins */}
            {[
                { top: "12%", left: "60%", delay: "0s" },
                { top: "55%", left: "15%", delay: "0.5s" },
                { top: "75%", left: "65%", delay: "1s" },
                { top: "25%", left: "20%", delay: "1.5s" },
            ].map((pos, i) => (
                <div
                    key={i}
                    className="absolute"
                    style={{
                        top: pos.top,
                        left: pos.left,
                        animation: `float-pin 3s ease-in-out infinite`,
                        animationDelay: pos.delay,
                    }}
                >
                    <div className="w-5 h-5 rounded-full bg-cyan-500/30 border border-cyan-400/60 flex items-center justify-center">
                        <MapPin className="w-2.5 h-2.5 text-cyan-300" />
                    </div>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-px h-3 bg-gradient-to-t from-cyan-400/60 to-transparent" />
                </div>
            ))}
        </div>
    );
}

// ─── CSS Animations (injected) ──────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --cyan: #22d3ee;
    --blue: #3b82f6;
    --dark: #0a0e1a;
    --card: #0d1117;
    --border: rgba(34,211,238,0.15);
  }

  * { box-sizing: border-box; }

  @keyframes blink {
    50% { opacity: 0; }
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  @keyframes pulse-glow {
    0%, 100% { transform: scale(1); opacity: 0.6; }
    50% { transform: scale(1.4); opacity: 1; }
  }

  @keyframes float-pin {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }

  @keyframes slide-up {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes gradient-shift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }

  @keyframes orbit {
    from { transform: rotate(0deg) translateX(40px) rotate(0deg); }
    to { transform: rotate(360deg) translateX(40px) rotate(-360deg); }
  }

  @keyframes beam {
    0% { opacity: 0; transform: translateX(-100%) skewX(-20deg); }
    50% { opacity: 1; }
    100% { opacity: 0; transform: translateX(200%) skewX(-20deg); }
  }

  @keyframes glow-border {
    0%, 100% { box-shadow: 0 0 20px rgba(34,211,238,0.1); }
    50% { box-shadow: 0 0 40px rgba(34,211,238,0.3), 0 0 80px rgba(34,211,238,0.1); }
  }

  @keyframes number-pop {
    0% { transform: scale(0.5); opacity: 0; }
    70% { transform: scale(1.1); }
    100% { transform: scale(1); opacity: 1; }
  }

  @keyframes wave {
    0%, 100% { d: path("M0,40 C100,10 200,70 300,40 C400,10 500,70 600,40 L600,80 L0,80 Z"); }
    50% { d: path("M0,40 C100,70 200,10 300,40 C400,70 500,10 600,40 L600,80 L0,80 Z"); }
  }

  @keyframes scan-line {
    0% { top: 0%; }
    100% { top: 100%; }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(-10px) rotate(1deg); }
    66% { transform: translateY(-5px) rotate(-1deg); }
  }

  .font-display { font-family: 'Syne', sans-serif; }
  .font-body { font-family: 'DM Sans', sans-serif; }

  .hero-word {
    display: inline-block;
    animation: slide-up 0.7s cubic-bezier(0.16,1,0.3,1) both;
  }
  .hero-word:nth-child(1) { animation-delay: 0.2s; }
  .hero-word:nth-child(2) { animation-delay: 0.35s; }
  .hero-word:nth-child(3) { animation-delay: 0.5s; }

  .shimmer-btn::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%);
    animation: shimmer 2.5s infinite;
  }

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

  .glow-btn {
    position: relative;
    overflow: hidden;
    animation: glow-border 3s ease-in-out infinite;
  }

  .feature-icon-ring {
    position: relative;
  }
  .feature-icon-ring::before {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    border: 1px solid rgba(34,211,238,0.3);
    animation: spin 8s linear infinite;
  }

  .stat-card {
    animation: number-pop 0.6s cubic-bezier(0.34,1.56,0.64,1) both;
  }

  .reveal {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.16,1,0.3,1);
  }
  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .scan-overlay {
    position: absolute;
    left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(34,211,238,0.6), transparent);
    animation: scan-line 4s linear infinite;
    pointer-events: none;
  }

  .floating {
    animation: float 6s ease-in-out infinite;
  }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #0a0e1a; }
  ::-webkit-scrollbar-thumb { background: rgba(34,211,238,0.4); border-radius: 2px; }

  /* Mobile overrides */
  @media (max-width: 640px) {
    .hero-text { font-size: 2.5rem !important; line-height: 1.1 !important; }
    .nav-links { display: none; }
    .mobile-menu-btn { display: flex !important; }
  }
`;

// ─── Reveal Section Wrapper ─────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
    const { ref, visible } = useScrollReveal();
    return (
        <div
            ref={ref}
            className={`reveal ${visible ? "visible" : ""} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}

// ─── Main Component ─────────────────────────────────────────────────────────
export default function NearWeLandingPage() {
    const [heroVisible, setHeroVisible] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const t = setTimeout(() => setHeroVisible(true), 100);
        return () => clearTimeout(t);
    }, []);

    const navItems = [
        { label: "Advertise", path: "/advertise" },
        { label: "Services", path: "/companyservices" },
        { label: "Contact", path: "/contact" },
        { label: "Terms", path: "/terms" },
        { label: "Privacy", path: "/privacy" },
        { label: "Child Safety", path: "/child-safety" },
    ];

    const features = [
        {
            icon: MapPin,
            title: "Find Local Events",
            desc: "Discover events happening near you in real time with intelligent geo-filtering and smart radius controls.",
            color: "from-cyan-500/20 to-cyan-600/10",
            iconColor: "text-cyan-400",
        },
        {
            icon: Users,
            title: "Connect With People",
            desc: "Meet like-minded individuals and grow your local network with meaningful, interest-driven connections.",
            color: "from-blue-500/20 to-blue-600/10",
            iconColor: "text-blue-400",
        },
        {
            icon: Calendar,
            title: "Create Events",
            desc: "Host memorable gatherings and share moments with your community through beautifully crafted event pages.",
            color: "from-indigo-500/20 to-indigo-600/10",
            iconColor: "text-indigo-400",
        },
        {
            icon: Sparkles,
            title: "Smart Recommendations",
            desc: "AI-powered suggestions that learn your interests and surface the best local experiences for you.",
            color: "from-cyan-500/20 to-blue-600/10",
            iconColor: "text-cyan-300",
        },
        {
            icon: Zap,
            title: "Instant Notifications",
            desc: "Real-time alerts for events, connection requests, and activity updates—never miss a moment.",
            color: "from-yellow-500/10 to-orange-500/10",
            iconColor: "text-yellow-400",
        },
        {
            icon: Globe,
            title: "Community Feed",
            desc: "Stay informed with a hyper-local social feed filled with posts, stories, and updates from your area.",
            color: "from-green-500/10 to-teal-500/10",
            iconColor: "text-green-400",
        },
    ];

    return (
        <>
            <style>{styles}</style>
            <Helmet>
                <title>NearWe - Discover Local Events & Connect With Your Community</title>
                <meta name="description" content="NearWe is the ultimate local events discovery app." />
                <meta property="og:title" content="NearWe - Discover Local Events & Community" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://nearwe.in" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Helmet>

            <div className="font-body bg-[#0a0e1a] text-white overflow-x-hidden">

                {/* ── Navbar ── */}
                <nav className="fixed top-0 w-full z-50 bg-[#0a0e1a]/80 backdrop-blur-xl border-b border-cyan-500/10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
                        <img src={nearweLogo} alt="NearWe" className="h-9 w-auto object-contain" />

                        {/* Desktop Nav */}
                        <div className="nav-links hidden md:flex items-center gap-1">
                            {navItems.map((item) => (
                                <button
                                    key={item.path}
                                    onClick={() => navigate(item.path)}
                                    className="px-3 py-2 text-sm text-gray-400 hover:text-cyan-400 font-medium transition-all duration-200 rounded-lg hover:bg-cyan-500/5 whitespace-nowrap relative group"
                                >
                                    {item.label}
                                    <span className="absolute bottom-1 left-3 right-3 h-px bg-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200" />
                                </button>
                            ))}
                            <div className="w-px h-5 bg-cyan-500/20 mx-2" />
                            <MagneticButton
                                onClick={openDownload}
                                className="shimmer-btn relative overflow-hidden flex items-center gap-2 px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-black text-sm font-bold rounded-full transition-colors duration-200 hover:shadow-lg hover:shadow-cyan-500/40 whitespace-nowrap"
                            >
                                Download <ArrowRight className="w-3.5 h-3.5" />
                            </MagneticButton>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="mobile-menu-btn md:hidden flex flex-col gap-1.5 p-2"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                            style={{ display: undefined }}
                        >
                            <span className={`block w-5 h-0.5 bg-cyan-400 transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
                            <span className={`block w-5 h-0.5 bg-cyan-400 transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`} />
                            <span className={`block w-5 h-0.5 bg-cyan-400 transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
                        </button>
                    </div>

                    {/* Mobile Menu Drawer */}
                    <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? "max-h-96" : "max-h-0"}`}>
                        <div className="px-4 pb-4 flex flex-col gap-1 bg-[#0d1117] border-t border-cyan-500/10">
                            {navItems.map((item) => (
                                <button
                                    key={item.path}
                                    onClick={() => { navigate(item.path); setMobileMenuOpen(false); }}
                                    className="text-left px-4 py-3 text-sm text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/5 rounded-lg transition-all duration-200"
                                >
                                    {item.label}
                                </button>
                            ))}
                            <button
                                onClick={openDownload}
                                className="mt-2 w-full py-3 bg-cyan-500 text-black text-sm font-bold rounded-full flex items-center justify-center gap-2"
                            >
                                Download App <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </nav>

                {/* ── Hero ── */}
                <section className="relative min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 overflow-hidden">
                    {/* Particle background */}
                    <ParticleCanvas />

                    {/* Background glows */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
                        <div className="absolute top-20 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-cyan-500/8 rounded-full blur-3xl" style={{ animation: "pulse-glow 4s ease-in-out infinite" }} />
                        <div className="absolute bottom-20 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-blue-600/8 rounded-full blur-3xl" style={{ animation: "pulse-glow 4s ease-in-out infinite", animationDelay: "2s" }} />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-cyan-400/5 rounded-full blur-2xl" />
                        {/* Grid lines */}
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage: "linear-gradient(rgba(34,211,238,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.03) 1px, transparent 1px)",
                                backgroundSize: "60px 60px",
                            }}
                        />
                    </div>

                    <div className="relative z-10 max-w-5xl mx-auto w-full">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Left: Text */}
                            <div className={`text-center lg:text-left transition-all duration-1000 ${heroVisible ? "opacity-100" : "opacity-0"}`}>
                                {/* Badge */}
                                <div
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-6 backdrop-blur-sm"
                                    style={{ animation: heroVisible ? "slide-up 0.6s both" : "none" }}
                                >
                                    <span className="w-2 h-2 rounded-full bg-cyan-400" style={{ animation: "pulse-glow 2s infinite" }} />
                                    <span className="text-cyan-400 text-sm font-semibold">✨ Discover Your Community</span>
                                </div>

                                {/* Headline */}
                                <h1 className="font-display hero-text text-5xl sm:text-6xl lg:text-7xl font-black mb-4 leading-tight">
                                    <span className="hero-word gradient-text block">Connect.</span>
                                    <span className="hero-word gradient-text block">Explore.</span>
                                    <span className="hero-word gradient-text block">Belong.</span>
                                </h1>

                                {/* Typing effect */}
                                <p className="text-lg text-gray-400 mb-3 font-body">
                                    Discover{" "}
                                    <TypingText phrases={["events near you", "local communities", "new friendships", "hidden gems"]} />
                                </p>

                                <p className="text-base sm:text-lg text-gray-500 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                                    The ultimate local discovery app—find events, meet people, and build
                                    meaningful connections in your community.
                                </p>

                                {/* CTA Buttons */}
                                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-10">
                                    <MagneticButton
                                        onClick={openDownload}
                                        className="shimmer-btn group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-bold rounded-full transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/40 flex items-center justify-center gap-2 glow-btn"
                                    >
                                        <span className="relative z-10 flex items-center gap-2">
                                            Download App
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                        </span>
                                    </MagneticButton>

                                    <button className="group px-8 py-4 border border-cyan-500/40 hover:border-cyan-500 text-cyan-400 hover:text-white font-semibold rounded-full transition-all duration-300 hover:bg-cyan-500/10 relative overflow-hidden flex items-center justify-center gap-2"  onClick={openDownload}>
                                        <span className="w-2 h-2 rounded-full bg-cyan-400" style={{ animation: "pulse-glow 1.5s infinite" }} />
                                        Watch Demo
                                    </button>
                                </div>

                                {/* Social proof */}
                                <div className="flex items-center gap-4 justify-center lg:justify-start">
                                    <div className="flex -space-x-2">
                                        {["#22d3ee", "#3b82f6", "#8b5cf6", "#06b6d4"].map((bg, i) => (
                                            <div
                                                key={i}
                                                className="w-8 h-8 rounded-full border-2 border-[#0a0e1a] flex items-center justify-center text-xs font-bold text-white"
                                                style={{ background: bg, zIndex: 4 - i }}
                                            >
                                                {String.fromCharCode(65 + i)}
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-sm text-gray-400">
                                        <span className="text-white font-semibold">10,000+</span> community members
                                    </p>
                                </div>
                            </div>

                            {/* Right: Globe */}
                            <div
                                className="hidden lg:flex items-center justify-center floating"
                                style={{ animationDelay: "0.5s" }}
                            >
                                <AnimatedGlobe />
                            </div>
                        </div>

                        {/* Scroll cue */}
                        <div className="flex justify-center mt-16">
                            <div className="flex flex-col items-center gap-2 opacity-40">
                                <span className="text-xs text-gray-500 tracking-widest uppercase">Scroll</span>
                                <ChevronDown className="w-5 h-5 text-cyan-400" style={{ animation: "float 2s ease-in-out infinite" }} />
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── Stats ── */}
                <section className="py-16 px-4 sm:px-6 relative">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { value: 10000, suffix: "+", label: "Active Users" },
                                { value: 500, suffix: "+", label: "Events Daily" },
                                { value: 50, suffix: "+", label: "Cities" },
                                { value: 98, suffix: "%", label: "Satisfaction" },
                            ].map((stat, i) => (
                                <Reveal key={i} delay={i * 100}>
                                    <TiltCard className="glass-card rounded-2xl p-6 text-center stat-card">
                                        <div className="font-display text-3xl sm:text-4xl font-black gradient-text mb-1">
                                            <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                                        </div>
                                        <div className="text-xs text-gray-500 uppercase tracking-widest">{stat.label}</div>
                                    </TiltCard>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Features ── */}
                <section className="py-24 px-4 sm:px-6">
                    <div className="max-w-6xl mx-auto">
                        <Reveal className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full mb-4">
                                <span className="text-cyan-400 text-xs font-semibold uppercase tracking-widest">Features</span>
                            </div>
                            <h2 className="text-4xl sm:text-5xl font-black gradient-text mb-6">
                                Everything You Need
                            </h2>
                            <p className="text-gray-500 max-w-xl mx-auto">
                                A complete platform for community discovery and connection
                            </p>
                        </Reveal>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {features.map((f, i) => (
                                <Reveal key={i} delay={i * 80}>
                                    <TiltCard
                                        className="glass-card rounded-2xl p-6 sm:p-8 h-full group cursor-default"
                                    >
                                        {/* Scan overlay */}
                                        <div className="relative overflow-hidden">
                                            <div className="feature-icon-ring w-14 h-14 mb-5">
                                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center`}>
                                                    <f.icon className={`w-7 h-7 ${f.iconColor}`} />
                                                </div>
                                            </div>
                                        </div>
                                        <h3 className="font-display text-lg font-bold mb-2 text-white group-hover:text-cyan-300 transition-colors duration-300">
                                            {f.title}
                                        </h3>
                                        <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>

                                        {/* Bottom accent */}
                                        <div className="mt-4 h-px w-0 group-hover:w-full bg-gradient-to-r from-cyan-500/40 to-transparent transition-all duration-500" />
                                    </TiltCard>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Advertise ── */}
                <section className="py-24 px-4 sm:px-6 relative overflow-hidden">
                    {/* Beam effect */}
                    <div
                        className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"
                        style={{ animation: "beam 4s ease-in-out infinite" }}
                    />

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
                                    <span className="text-cyan-400 text-xs font-semibold uppercase tracking-widest">🚀 Grow Your Business</span>
                                </div>

                                <h2 className="text-4xl sm:text-5xl font-black gradient-text mb-5">
                                    Advertise With NearWe
                                </h2>

                                <p className="text-gray-400 max-w-xl mx-auto mb-8 leading-relaxed">
                                    Promote your brand, products, or services directly to engaged local users across Android and iOS. Reach your exact audience with precision ad placements.
                                </p>

                                <MagneticButton
                                    onClick={() => navigate("/advertise")}
                                    className="shimmer-btn group relative overflow-hidden inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-bold rounded-full hover:shadow-2xl hover:shadow-cyan-500/40 transition-shadow duration-300"
                                >
                                    Start Advertising
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                </MagneticButton>
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* ── CTA / Download ── */}
                <section className="py-24 px-4 sm:px-6 relative overflow-hidden">
                    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
                        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a] via-[#0d1520] to-[#0a0e1a]" />
                    </div>

                    <div className="relative z-10 max-w-3xl mx-auto text-center">
                        <Reveal>
                            <div className="mb-4 inline-flex items-center gap-2">
                                <div className="h-px w-8 bg-gradient-to-r from-transparent to-cyan-500/60" />
                                <span className="text-cyan-400 text-xs uppercase tracking-widest font-semibold">Join NearWe</span>
                                <div className="h-px w-8 bg-gradient-to-l from-transparent to-cyan-500/60" />
                            </div>
                            <h2 className="text-4xl sm:text-5xl font-black gradient-text mb-5">
                                Your Community Awaits
                            </h2>
                            <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
                                Start discovering events and connecting with amazing people in your city today.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={() => window.open(APP_STORE_URL, "_blank")}
                                    className="shimmer-btn group relative overflow-hidden flex items-center justify-center gap-3 px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/40"
                                >
                                    <img src={iosLogo} className="w-6 h-6" alt="App Store" />
                                    <span>
                                        <span className="block text-xs opacity-70 font-normal leading-none text-left">Download on the</span>
                                        <span className="block text-base font-bold leading-tight">App Store</span>
                                    </span>
                                    <ArrowRight className="w-4 h-4 opacity-60 group-hover:translate-x-1 transition-transform" />
                                </button>

                                <button
                                    onClick={() => window.open(PLAY_STORE_URL, "_blank")}
                                    className="group flex items-center justify-center gap-3 px-8 py-4 border border-cyan-500/40 hover:border-cyan-500 text-white hover:bg-cyan-500/5 font-bold rounded-2xl transition-all duration-300"
                                >
                                    <img src={playstoreLogo} className="w-6 h-6" alt="Google Play" />
                                    <span>
                                        <span className="block text-xs opacity-60 font-normal leading-none text-left">Get it on</span>
                                        <span className="block text-base font-bold leading-tight">Google Play</span>
                                    </span>
                                    <ArrowRight className="w-4 h-4 opacity-40 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* ── Footer ── */}
                <footer className="py-10 px-4 sm:px-6 bg-[#0a0e1a] border-t border-cyan-500/10">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <img src={nearweLogo} alt="NearWe" className="h-8 w-auto opacity-80" />

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