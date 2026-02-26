"use client";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    MapPin,
    Users,
    Calendar,
    Sparkles,
    Bell,
    Shield,
    MessageCircle,
    Zap,
    ArrowRight,
    CheckCircle,
} from "lucide-react";

import iosLogo from "../assets/logo/ios.png";
import playstoreLogo from "../assets/logo/playstore.png";

const services = [
    {
        icon: MapPin,
        title: "Event Discovery",
        tag: "Core",
        desc: "Find events happening around you in real time. Filter by category, distance, date, or vibe — and never miss something worth showing up for.",
        highlights: [
            "Real-time location-based search",
            "Advanced filters by category & date",
            "Save and bookmark events",
        ],
        gradient: "from-cyan-500/20 to-blue-500/10",
        iconColor: "text-cyan-400",
        border: "border-cyan-500/30",
    },
    {
        icon: Users,
        title: "Community Connect",
        tag: "Social",
        desc: "Meet people who share your interests. Build your local circle, follow profiles, and grow a network that actually means something.",
        highlights: [
            "Interest-based matchmaking",
            "Follow & connect with locals",
            "Build your community circle",
        ],
        gradient: "from-blue-500/20 to-indigo-500/10",
        iconColor: "text-blue-400",
        border: "border-blue-500/30",
    },
    {
        icon: Calendar,
        title: "Event Hosting",
        tag: "Creator",
        desc: "Create and manage your own events in minutes. Set capacity, share details, and invite people — all from your phone.",
        highlights: [
            "Easy event creation flow",
            "Attendee management tools",
            "Share across platforms",
        ],
        gradient: "from-teal-500/20 to-cyan-500/10",
        iconColor: "text-teal-400",
        border: "border-teal-500/30",
    },
    {
        icon: Sparkles,
        title: "Smart Recommendations",
        tag: "AI",
        desc: "Our AI learns your preferences and surfaces events and people you'll actually care about — personalized to you, not the crowd.",
        highlights: [
            "Personalized event feed",
            "Learns from your activity",
            "Improves over time",
        ],
        gradient: "from-violet-500/20 to-blue-500/10",
        iconColor: "text-violet-400",
        border: "border-violet-500/30",
    },
    {
        icon: Bell,
        title: "Smart Notifications",
        tag: "Utility",
        desc: "Stay in the loop without the noise. Get timely alerts for events you care about, friend activity, and community updates.",
        highlights: [
            "Customizable alert preferences",
            "Event reminders & countdowns",
            "Community activity digest",
        ],
        gradient: "from-amber-500/20 to-orange-500/10",
        iconColor: "text-amber-400",
        border: "border-amber-500/30",
    },
    {
        icon: MessageCircle,
        title: "In-App Messaging",
        tag: "Social",
        desc: "Chat with attendees before events, coordinate with your group, and keep the conversation going after the moment passes.",
        highlights: [
            "Event group chats",
            "Direct messaging",
            "Media & location sharing",
        ],
        gradient: "from-pink-500/20 to-rose-500/10",
        iconColor: "text-pink-400",
        border: "border-pink-500/30",
    },
    {
        icon: Shield,
        title: "Safe & Trusted",
        tag: "Trust",
        desc: "Every profile is verified. Every event is moderated. NearWe is built so you can connect with confidence.",
        highlights: [
            "Profile verification system",
            "Event & content moderation",
            "Report & block tools",
        ],
        gradient: "from-green-500/20 to-emerald-500/10",
        iconColor: "text-green-400",
        border: "border-green-500/30",
    },
    {
        icon: Zap,
        title: "Instant RSVP",
        tag: "Core",
        desc: "One tap to confirm your spot. Manage all your upcoming plans from a single dashboard, and get reminders so you never miss out.",
        highlights: [
            "One-tap RSVP",
            "Personal event dashboard",
            "Automatic reminders",
        ],
        gradient: "from-cyan-500/20 to-sky-500/10",
        iconColor: "text-sky-400",
        border: "border-sky-500/30",
    },
];

const tagColors: Record<string, string> = {
    Core: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
    Social: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    Creator: "bg-teal-500/15 text-teal-400 border-teal-500/30",
    AI: "bg-violet-500/15 text-violet-400 border-violet-500/30",
    Utility: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    Trust: "bg-green-500/15 text-green-400 border-green-500/30",
};

export default function ServicesPage() {
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="bg-[#0a0e1a] text-white font-sans min-h-screen overflow-hidden">

            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 bg-[#0a0e1a]/80 backdrop-blur-md border-b border-cyan-500/10">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <button
                        onClick={() => navigate("/")}
                        className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
                    >
                        NearWe
                    </button>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate("/companyservices")}
                            className="text-gray-300 hover:text-cyan-400 font-medium transition-colors duration-300 mr-4"
                        >
                           Company Services
                        </button>
                        <button
                            onClick={() => navigate("/services")}
                            className="text-cyan-400 font-medium transition-colors duration-300"
                        >
                           App Services
                        </button>
                        <button
                            onClick={() => navigate("/")}
                            className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold rounded-full transition-all duration-300"
                        >
                            Download
                        </button>
                    </div>
                </div>
            </nav>

            {/* Background glows */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-32 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
                <div className="absolute top-64 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-32 left-1/3 w-72 h-72 bg-violet-500/5 rounded-full blur-3xl" />
            </div>

            {/* HERO */}
            <section className="relative pt-36 pb-20 px-6 text-center">
                <div
                    className={`transition-all duration-1000 transform ${
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                >
                    <div className="inline-flex items-center gap-2 px-5 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-6">
                        <Zap className="w-4 h-4 text-cyan-400" />
                        <span className="text-cyan-400 font-semibold text-sm">
                            What NearWe Offers
                        </span>
                    </div>

                    <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-tight max-w-4xl mx-auto">
                        <span className="bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
                            Everything You Need to Connect.
                        </span>
                    </h1>

                    <p className="text-gray-300 text-xl max-w-2xl mx-auto leading-relaxed">
                        NearWe brings a full suite of tools to help you discover, host, and
                        build meaningful connections — all in one place.
                    </p>
                </div>
            </section>

            {/* SERVICES GRID */}
            <section className="px-6 pb-24 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {services.map((service, i) => (
                        <div
                            key={i}
                            style={{ animationDelay: `${i * 80}ms` }}
                            className={`group relative p-7 bg-[#11141c] border ${service.border} rounded-2xl
                                hover:border-cyan-400/50 hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/10
                                transition-all duration-300`}
                        >
                            {/* Gradient bg on hover */}
                            <div
                                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                            />

                            <div className="relative z-10">
                                {/* Tag */}
                                <span
                                    className={`inline-block text-xs font-semibold px-3 py-1 rounded-full border mb-4 ${
                                        tagColors[service.tag] ?? "bg-gray-500/10 text-gray-400 border-gray-500/30"
                                    }`}
                                >
                                    {service.tag}
                                </span>

                                {/* Icon */}
                                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <service.icon className={`w-6 h-6 ${service.iconColor}`} />
                                </div>

                                {/* Title */}
                                <h3 className="text-lg font-bold text-white mb-2">
                                    {service.title}
                                </h3>

                                {/* Desc */}
                                <p className="text-gray-400 text-sm leading-relaxed mb-5">
                                    {service.desc}
                                </p>

                                {/* Highlights */}
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

            {/* FOOTER */}
            <footer className="py-8 px-6 bg-[#0a0e1a] border-t border-cyan-500/10 text-center text-gray-400">
                <p>
                    © {new Date().getFullYear()} NearWe. Connecting communities worldwide.
                </p>
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
    );
}
