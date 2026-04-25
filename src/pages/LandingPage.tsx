"use client";

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
    ChevronDown,
    MapPin,
    Users,
    Calendar,
    ArrowRight,
    Sparkles,
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
    return PLAY_STORE_URL; // android + desktop both go to Play Store
}

function openDownload() {
    window.open(getDownloadURL(), "_blank");
}
// ───────────────────────────────────────────────────────────────────────────────

export default function NearWeLandingPage() {
    const [isVisible, setIsVisible] = useState(false);
    const heroRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <>
            <Helmet>
                <title>NearWe - Discover Local Events & Connect With Your Community</title>
                <meta name="description" content="NearWe is the ultimate local events discovery app. Find nearby events, meet like-minded people, and build meaningful connections in your community." />
                <meta name="keywords" content="local events, event discovery app, community app, nearby events, social networking, local connections" />
                <meta property="og:title" content="NearWe - Discover Local Events & Community" />
                <meta property="og:description" content="Discover nearby events, meet new people, and build real connections in your local community with NearWe." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://nearwe.in" />
                <meta name="robots" content="index, follow" />
                <meta name="canonical" content="https://nearwe.in" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Helmet>
        <div className="bg-[#0a0e1a] text-white font-sans overflow-hidden">

            {/* ── Navbar ── */}
            <nav className="fixed top-0 w-full z-50 bg-[#0a0e1a]/80 backdrop-blur-md border-b border-cyan-500/10">
                <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

                    {/* Logo */}
                    <div className="flex items-center">
                        <img
                            src={nearweLogo}
                            alt="NearWe"
                            className="h-9 w-auto object-contain"
                        />
                    </div>

                    {/* Nav Links + CTA */}
                    <div className="flex items-center gap-1">
                        {[
                            { label: "Advertise", path: "/advertise" },
                            { label: "Company Services", path: "/companyservices" },
                            { label: "Contact", path: "/contact" },
                            { label: "Terms", path: "/terms" },
                            { label: "Privacy", path: "/privacy" },
                            { label: "Child Safety", path: "/child-safety" },
                        ].map((item) => (
                            <button
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                className="px-3 py-2 text-sm text-gray-400 hover:text-cyan-400 font-medium transition-colors duration-200 rounded-lg hover:bg-cyan-500/5 whitespace-nowrap"
                            >
                                {item.label}
                            </button>
                        ))}

                        {/* Divider */}
                        <div className="w-px h-5 bg-cyan-500/20 mx-2" />

                        {/* Smart Download Button */}
                        <button
                            onClick={openDownload}
                            className="flex items-center gap-2 px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-black text-sm font-bold rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/30 whitespace-nowrap"
                        >
                            Download
                            <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* ── Hero ── */}
            <section
                ref={heroRef}
                className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden"
            >
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
                    <div
                        className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
                        style={{ animationDelay: "1s" }}
                    />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <div
                        className={`transition-all duration-1000 transform ${
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                        }`}
                    >
                        <div className="inline-block mb-6 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full backdrop-blur-sm">
                            <span className="text-cyan-400 text-sm font-semibold">
                                ✨ Discover Your Community
                            </span>
                        </div>

                        <h1 className="text-6xl lg:text-7xl font-black mb-6 leading-tight">
                            <span className="bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
                                Connect. Explore. Belong.
                            </span>
                        </h1>

                        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
                            Discover nearby events, meet like-minded people, and build
                            meaningful connections in your community.
                        </p>

                        {/* Hero Buttons */}
                        <div className="flex gap-4 justify-center mb-16">
                            {/* Smart Download — goes to correct store */}
                            <button
                                onClick={openDownload}
                                className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-black font-bold rounded-full transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/50 flex items-center gap-2"
                            >
                                Download App
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <button className="px-8 py-4 border-2 border-cyan-500/50 hover:border-cyan-500 text-cyan-400 hover:text-white font-bold rounded-full transition-all duration-300 hover:bg-cyan-500/10">
                                Watch Demo
                            </button>
                        </div>

                        <div className="flex justify-center animate-bounce">
                            <ChevronDown className="w-6 h-6 text-cyan-400" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Advertise Section ── */}
            <section className="py-24 px-6 bg-[#0a0e1a]">
                <div className="max-w-5xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-5 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-6">
                        <span className="text-cyan-400 text-sm font-semibold">
                            🚀 Grow Your Business
                        </span>
                    </div>

                    <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
                        Advertise With NearWe
                    </h2>

                    <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
                        Promote your brand, products, or services directly to users across our
                        Android and iOS applications. Reach your target audience and boost
                        visibility with powerful ad placements.
                    </p>

                    <div className="flex justify-center">
                        <button
                            onClick={() => navigate("/advertise")}
                            className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-black font-bold rounded-full transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/40 flex items-center gap-2"
                        >
                            Start Advertising
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </section>

            {/* ── Features ── */}
            <section className="py-24 px-6 bg-[#0a0e1a]">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
                        Powerful Features
                    </h2>
                    <p className="text-gray-400 text-center mb-20">
                        Everything you need to discover and connect
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: MapPin,
                                title: "Find Local Events",
                                desc: "Discover events happening near you in real time with advanced filtering.",
                            },
                            {
                                icon: Users,
                                title: "Connect with People",
                                desc: "Meet like-minded individuals and expand your community network.",
                            },
                            {
                                icon: Calendar,
                                title: "Create Events",
                                desc: "Host gatherings and share moments with your local community.",
                            },
                            {
                                icon: Sparkles,
                                title: "Smart Recommendations",
                                desc: "AI-powered suggestions based on your interests and location.",
                            },
                        ].map((f, i) => (
                            <div
                                key={i}
                                className="group p-8 bg-[#11141c] border border-cyan-500/20 rounded-2xl hover:border-cyan-500/50 transition-all hover:-translate-y-2 hover:shadow-lg hover:shadow-cyan-500/20"
                            >
                                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500/30 to-blue-500/30 rounded-xl flex items-center justify-center mb-4">
                                    <f.icon className="w-7 h-7 text-cyan-400" />
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-white">{f.title}</h3>
                                <p className="text-gray-400">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="py-24 px-6 bg-gradient-to-r from-[#0a0e1a] via-[#1a1f2e] to-[#0a0e1a]">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
                        Join NearWe Today
                    </h2>
                    <p className="text-xl text-gray-300 mb-12">
                        Start discovering your community and connecting with amazing people.
                    </p>

                    <div className="flex justify-center gap-4">
                        {/* iOS — always App Store */}
                        <button
                            onClick={() => window.open(APP_STORE_URL, "_blank")}
                            className="flex items-center gap-3 px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold rounded-full shadow-lg hover:shadow-cyan-500/40 transition"
                        >
                            <img src={iosLogo} className="w-6 h-6" alt="App Store" />
                            App Store
                        </button>

                        {/* Android — always Play Store */}
                        <button
                            onClick={() => window.open(PLAY_STORE_URL, "_blank")}
                            className="flex items-center gap-3 px-8 py-4 border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black transition rounded-full"
                        >
                            <img src={playstoreLogo} className="w-6 h-6" alt="Google Play" />
                            Google Play
                        </button>
                    </div>
                </div>
            </section>

            {/* ── Footer ── */}
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