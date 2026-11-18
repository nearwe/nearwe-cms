"use client";
import React, { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Megaphone, MapPin, LayoutList, Home, TrendingUp, Users, MousePointerClick, BarChart2 } from "lucide-react";
import social from "../assets/images/social.png";
import Map from "../assets/images/map.png";
import HomeBg from "../assets/images/home.png";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

// ─── Config ────────────────────────────────────────────────────────────────────

const AD_TYPES = [
  {
    id: "map",
    name: "Map Ads",
    tag: "MAP VIEW",
    tagColor: "bg-sky-600 text-white",
    desc: "Hyper-local visibility pinned directly on the NearWe map view.",
    baseRate: 3000,
    dailyImpressions: 8000,
    ctr: 0.5,
    reachRatio: 0.22,
    image: Map,
    icon: MapPin,
    accent: "cyan",
    popular: false,
  },
  {
    id: "social",
    name: "Social Feed Ads",
    tag: "FEED",
    tagColor: "bg-violet-600 text-white",
    desc: "Appear natively inside the user activity feed for maximum engagement.",
    baseRate: 5000,
    dailyImpressions: 18000,
    ctr: 1.2,
    reachRatio: 0.18,
    image: social,
    icon: LayoutList,
    accent: "purple",
    popular: true,
  },
  {
    id: "home",
    name: "Home Screen Ads",
    tag: "HOME",
    tagColor: "bg-amber-400 text-amber-950",
    desc: "Premium banner placement on the app home screen — first thing users see.",
    baseRate: 2500,
    dailyImpressions: 12000,
    ctr: 0.7,
    reachRatio: 0.2,
    image: HomeBg,
    icon: Home,
    accent: "yellow",
    popular: false,
  },
] as const;

type AdId = (typeof AD_TYPES)[number]["id"];

const BOOST_OPTIONS = [
  { value: 1, label: "1×", note: "Base reach", multiplier: 1.0 },
  { value: 2, label: "2×", note: "Extended +25%", multiplier: 1.25 },
  { value: 3, label: "3×", note: "Wide +55%", multiplier: 1.55 },
  { value: 4, label: "4×", note: "Premium +90%", multiplier: 1.9 },
  { value: 5, label: "5×", note: "Max reach +140%", multiplier: 2.4 },
];

const AUDIENCE_SEGMENTS = [
  { id: "local", label: "Local users" },
  { id: "nearby", label: "Nearby businesses" },
  { id: "events", label: "Event attendees" },
  { id: "food", label: "Food & dining" },
  { id: "shopping", label: "Shopping" },
  { id: "services", label: "Local services" },
];

const SEG_ADDON_PER_DAY = 800; // ₹ per extra segment per day

// ─── Helpers ───────────────────────────────────────────────────────────────────

function fmtINR(n: number) {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

function fmtCount(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return Math.round(n / 1_000) + "K";
  return Math.round(n).toLocaleString("en-IN");
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function MetricCard({ icon: Icon, value, label }: { icon: React.ElementType; value: string; label: string }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col items-center gap-1 shadow-sm">
      <span className="mb-1 grid h-8 w-8 place-items-center rounded-lg bg-blue-50"><Icon className="w-4 h-4 text-blue-700" /></span>
      <span className="text-xl font-bold text-slate-900">{value}</span>
      <span className="text-xs text-slate-500 text-center">{label}</span>
    </div>
  );
}

function BreakdownRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`flex justify-between items-center py-2 ${
        highlight ? "border-t border-slate-200 mt-1 pt-3" : "border-b border-slate-100 last:border-0"
      }`}
    >
      <span className={`text-sm ${highlight ? "text-slate-900 font-semibold" : "text-slate-500"}`}>
        {label}
      </span>
      <span
        className={`font-semibold ${
          highlight ? "text-blue-700 text-lg" : "text-slate-900 text-sm"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function AdvertiseWithUs() {
  const [adType, setAdType] = useState<AdId>("map");
  const [days, setDays] = useState(7);
  const [boost, setBoost] = useState(1);
  const [segments, setSegments] = useState<Set<string>>(new Set(["local"]));

  const selectedAd = AD_TYPES.find((a) => a.id === adType)!;
  const boostOption = BOOST_OPTIONS.find((b) => b.value === boost)!;

  const estimate = useMemo(() => {
    const bm = boostOption.multiplier;
    const totalImp = Math.round(selectedAd.dailyImpressions * days * bm);
    const uniqueReach = Math.round(totalImp * selectedAd.reachRatio);
    const clicks = Math.round(totalImp * (selectedAd.ctr / 100));
    const extraSegs = Math.max(0, segments.size - 1);
    const segAddon = extraSegs * SEG_ADDON_PER_DAY * days;
    const baseTotal = selectedAd.baseRate * days * bm;
    const grandTotal = Math.round(baseTotal + segAddon);
    return { totalImp, uniqueReach, clicks, segAddon, baseTotal, grandTotal };
  }, [selectedAd, days, segments, boostOption.multiplier]);

  function toggleSegment(id: string) {
    setSegments((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        if (next.size === 1) return prev; // keep at least one
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function buildMailtoLink() {
    const subject = encodeURIComponent("NearWe Ad Booking — " + selectedAd.name);
    const body = encodeURIComponent(
      `Hi NearWe team,\n\nI'd like to book an ad campaign with the following details:\n\n` +
        `Placement: ${selectedAd.name}\n` +
        `Duration: ${days} day${days > 1 ? "s" : ""}\n` +
        `Reach boost: ${boost}× (${boostOption.note})\n` +
        `Targeting segments: ${Array.from(segments).join(", ")}\n` +
        `Estimated impressions: ${fmtCount(estimate.totalImp)}\n` +
        `Estimated total cost: ${fmtINR(estimate.grandTotal)}\n\n` +
        `Please get in touch to confirm availability and next steps.\n\nThank you.`
    );
    return `mailto:support@nearwe.in?subject=${subject}&body=${body}`;
  }

  return (
    <>
      <Helmet>
        <title>Advertise With NearWe - Reach Local Audiences</title>
        <meta name="description" content="Advertise your business on NearWe's local community app. Reach thousands of local users through map ads, social feed placements, and home screen banners." />
        <meta name="keywords" content="local advertising, advertise app, nearwe ads, local business advertising, mobile advertising" />
        <meta property="og:title" content="Advertise With NearWe" />
        <meta property="og:description" content="Grow your business by advertising on NearWe - the #1 local events discovery app." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nearwe.in/advertise" />
        <meta name="robots" content="index, follow" />
        <meta name="canonical" content="https://nearwe.in/advertise" />
      </Helmet>
    <div className="bg-white text-slate-900 min-h-screen">
      <SiteHeader />
      <div className="bg-gradient-to-b from-blue-50/70 via-white to-white px-4 sm:px-6 pt-32">
      <section className="max-w-6xl mx-auto pb-24">

        {/* HEADER */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-200 rounded-full mb-6">
            <Megaphone className="w-4 h-4 text-blue-700" />
            <span className="text-blue-700 font-semibold text-sm">Advertising</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-slate-900">
            Advertise With Us
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Grow your business by reaching thousands of local users across NearWe on Android & iOS.
            Get a real cost estimate before you commit.
          </p>
        </div>

        <div className="space-y-12">

          {/* AD PLACEMENTS */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-6">Ad Placements</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {AD_TYPES.map((ad) => {
                const Icon = ad.icon;
                const isSelected = adType === ad.id;
                return (
                  <div
                    key={ad.id}
                    onClick={() => setAdType(ad.id)}
                    className={`bg-white rounded-2xl overflow-hidden flex flex-col cursor-pointer transition-all duration-300 group
                      ${isSelected
                        ? "ring-2 ring-blue-600 border border-blue-600 shadow-xl shadow-blue-900/10"
                        : "border border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-lg"
                      } ${ad.popular ? "md:scale-[1.03]" : ""}`}
                  >
                    <div className="relative h-44 bg-slate-100">
                      <img
                        src={ad.image}
                        alt={ad.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      <div className={`absolute top-3 left-3 text-xs px-2 py-1 rounded font-semibold ${ad.tagColor}`}>
                        {ad.tag}
                      </div>
                      {ad.popular && (
                        <div className="absolute top-3 right-3 bg-slate-900 text-white text-xs px-2 py-1 rounded font-semibold">
                          Most popular
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="w-4 h-4 text-blue-700" />
                        <h3 className="text-base font-bold text-slate-900">{ad.name}</h3>
                      </div>
                      <p className="text-slate-600 text-sm mb-4 flex-1">{ad.desc}</p>
                      <div className="flex items-end justify-between">
                        <p className="text-xl font-bold text-slate-900">
                          {fmtINR(ad.baseRate)}{" "}
                          <span className="text-slate-500 text-sm font-normal">/ day</span>
                        </p>
                        <span className="text-xs text-slate-500">
                          ~{fmtCount(ad.dailyImpressions)} imp/day
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* CAMPAIGN COST ESTIMATOR */}
          <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 space-y-8 shadow-[0_10px_40px_-12px_rgba(15,23,42,0.15)]">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 text-center">Campaign Cost Estimator</h2>

            {/* CONTROLS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* Duration */}
              <div>
                <label className="text-slate-600 text-sm font-medium mb-2 block">
                  Campaign Duration — <span className="text-slate-900 font-semibold">{days} day{days > 1 ? "s" : ""}</span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={90}
                  step={1}
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="w-full accent-blue-700 cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>1 day</span>
                  <span>30 days</span>
                  <span>90 days</span>
                </div>
              </div>

              {/* Boost */}
              <div>
                <label className="text-slate-600 text-sm font-medium mb-2 block">
                  Reach Boost — <span className="text-slate-900 font-semibold">{boostOption.label} ({boostOption.note})</span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={5}
                  step={1}
                  value={boost}
                  onChange={(e) => setBoost(Number(e.target.value))}
                  className="w-full accent-blue-700 cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  {BOOST_OPTIONS.map((b) => (
                    <span key={b.value}>{b.label}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* TARGETING SEGMENTS */}
            <div>
              <label className="text-slate-600 text-sm font-medium mb-3 block">
                Target Audience —{" "}
                <span className="text-slate-900 font-semibold">
                  {segments.size} segment{segments.size !== 1 ? "s" : ""}
                </span>
                <span className="text-slate-400 font-normal ml-2">(first segment free, +₹{SEG_ADDON_PER_DAY.toLocaleString()}/day each extra)</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {AUDIENCE_SEGMENTS.map((seg) => {
                  const on = segments.has(seg.id);
                  return (
                    <button
                      key={seg.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggleSegment(seg.id)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all
                        ${on
                          ? "bg-blue-700 border-blue-700 text-white shadow-sm"
                          : "bg-white border-slate-300 text-slate-600 hover:border-slate-400 hover:bg-slate-50"
                        }`}
                    >
                      {seg.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* METRICS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <MetricCard icon={BarChart2}       value={fmtCount(estimate.totalImp)}   label="Est. impressions" />
              <MetricCard icon={Users}           value={fmtCount(estimate.uniqueReach)} label="Unique reach" />
              <MetricCard icon={MousePointerClick} value={fmtCount(estimate.clicks)}   label="Est. clicks" />
              <MetricCard icon={TrendingUp}      value={selectedAd.ctr + "%"}          label="Avg. CTR" />
            </div>

            {/* BREAKDOWN */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-widest">Cost breakdown</p>
              <BreakdownRow label="Placement"            value={selectedAd.name} />
              <BreakdownRow label="Base rate"            value={`${fmtINR(selectedAd.baseRate)}/day`} />
              <BreakdownRow label="Duration"             value={`${days} day${days > 1 ? "s" : ""}`} />
              <BreakdownRow label="Reach boost"          value={`${boostOption.label} (×${boostOption.multiplier})`} />
              <BreakdownRow label="Targeting segments"   value={`${segments.size} selected`} />
              <BreakdownRow label="Segment add-on"       value={fmtINR(estimate.segAddon)} />
              <BreakdownRow label="Total estimate"       value={fmtINR(estimate.grandTotal)} highlight />
            </div>

            <p className="text-xs text-slate-500 text-center">
              * Estimates are based on current NearWe platform traffic and are indicative only.
              Final delivery may vary based on audience availability and creative quality score.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={buildMailtoLink()}
                className="flex-1 text-center py-3.5 rounded-md bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm shadow-sm transition-colors"
              >
                Book this campaign — {fmtINR(estimate.grandTotal)}
              </a>
              <a
                href="mailto:support@nearwe.in"
                className="px-6 py-3.5 rounded-md border border-slate-300 hover:border-slate-400 hover:bg-slate-50 text-slate-800 font-semibold text-sm text-center transition-colors"
              >
                Contact sales
              </a>
            </div>
          </section>

          {/* BENEFITS */}
          <section>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-6">Why Advertise on NearWe?</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Reach local and hyper-targeted users",
                "Increase brand visibility across Android & iOS",
                "Drive traffic, footfall, and conversions",
                "Flexible budgets with transparent pricing",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold">✓</span>
                  <span className="text-slate-700 text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </section>

        </div>
      </section>
      </div>
      <SiteFooter />
    </div>
    </>
  );
}