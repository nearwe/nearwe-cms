"use client";

import { Link } from "react-router-dom";
import { ArrowRight, Users } from "lucide-react";
import { Helmet } from "react-helmet-async";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

export default function AboutUs() {
  return (
    <>
      <Helmet>
        <title>About NearWe - Connecting Communities Locally</title>
        <meta name="description" content="Learn about NearWe - the innovative platform connecting people through local events and community discovery. Meet our team and our mission to build meaningful human connections." />
        <meta name="keywords" content="about nearwe, local events platform, community app, event discovery, local connections" />
        <meta property="og:title" content="About NearWe - Connecting Communities" />
        <meta property="og:description" content="Discover NearWe's mission to connect people through local events and build real human connections." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nearwe.in/aboutus" />
        <meta name="robots" content="index, follow" />
        <meta name="canonical" content="https://nearwe.in/aboutus" />
      </Helmet>
      <div className="bg-white text-slate-900 min-h-screen">
        <SiteHeader />

        {/* ================= HERO SECTION ================= */}
        <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-blue-50/70 to-white px-4 sm:px-6 pt-36 pb-24">
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
          <div className="relative max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-200 rounded-full mb-6">
              <Users className="w-4 h-4 text-blue-700" />
              <span className="text-blue-700 font-semibold text-sm">About NearWe</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight text-slate-900">
              Our Mission is to <span className="text-blue-700">Connect People.</span>
            </h1>

            <p className="text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed">
              NearWe was created with a vision to bring communities closer.
              We help people discover events, meet like-minded friends, and build
              real human connections in the digital era. Our mission is simple —
              make the world feel smaller, warmer, and more connected.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/companyservices"
                className="inline-flex items-center gap-2 rounded-md bg-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-800"
              >
                Explore our services <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition-colors hover:border-slate-400 hover:bg-slate-50"
              >
                Contact us
              </Link>
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>
    </>
  );
}
