"use client";
import React, { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Megaphone, MapPin, LayoutList, Home, TrendingUp, Users, MousePointerClick, BarChart2 } from "lucide-react";
import social from "../assets/images/social.png";
import Map from "../assets/images/map.png";
import HomeBg from "../assets/images/home.png";

// ─── Config ────────────────────────────────────────────────────────────────────

const AD_TYPES = [
  {
    id: "map",
    name: "Map Ads",
    tag: "MAP VIEW",
    tagColor: "bg-cyan-500 text-black",
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
    tagColor: "bg-purple-500 text-white",
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
    tagColor: "bg-yellow-500 text-black",
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
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center gap-1">
      <Icon className="w-4 h-4 text-cyan-400 mb-1" />
      <span className="text-xl font-bold text-white">{value}</span>
      <span className="text-xs text-gray-500 text-center">{label}</span>
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
        highlight ? "border-t border-white/10 mt-1 pt-3" : ""
      }`}
    >
      <span className={`text-sm ${highlight ? "text-white font-semibold" : "text-gray-400"}`}>
        {label}
      </span>
      <span
        className={`font-semibold ${
          highlight ? "text-cyan-400 text-lg" : "text-white text-sm"
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
  }, [selectedAd, days, boost, segments, boostOption.multiplier]);

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
    <div className="bg-[#0a0e1a] text-white min-h-screen pt-20 px-6">
      <section className="max-w-6xl mx-auto pb-20">

        {/* HEADER */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-6">
            <Megaphone className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 font-semibold text-sm">Advertising</span>
          </div>
          <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
            Advertise With Us
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-base leading-relaxed">
            Grow your business by reaching thousands of local users across NearWe on Android & iOS.
            Get a real cost estimate before you commit.
          </p>
        </div>

        <div className="space-y-12">

          {/* AD PLACEMENTS */}
          <section>
            <h2 className="text-xl font-semibold text-cyan-400 mb-5">Ad Placements</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {AD_TYPES.map((ad) => {
                const Icon = ad.icon;
                const isSelected = adType === ad.id;
                return (
                  <div
                    key={ad.id}
                    onClick={() => setAdType(ad.id)}
                    className={`bg-[#11141c] rounded-2xl overflow-hidden flex flex-col cursor-pointer transition-all group
                      ${isSelected
                        ? "border-2 border-cyan-400 shadow-lg shadow-cyan-500/10"
                        : "border border-cyan-500/20 hover:border-cyan-500/50"
                      } ${ad.popular ? "scale-105" : ""}`}
                  >
                    <div className="relative h-44 bg-black">
                      <img
                        src={ad.image}
                        alt={ad.name}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                      <div className={`absolute top-3 left-3 text-xs px-2 py-1 rounded font-semibold ${ad.tagColor}`}>
                        {ad.tag}
                      </div>
                      {ad.popular && (
                        <div className="absolute top-3 right-3 bg-white text-black text-xs px-2 py-1 rounded font-semibold">
                          Most popular
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="w-4 h-4 text-cyan-400" />
                        <h3 className="text-base font-bold text-white">{ad.name}</h3>
                      </div>
                      <p className="text-gray-400 text-sm mb-4 flex-1">{ad.desc}</p>
                      <div className="flex items-end justify-between">
                        <p className="text-xl font-bold text-white">
                          {fmtINR(ad.baseRate)}{" "}
                          <span className="text-gray-500 text-sm font-normal">/ day</span>
                        </p>
                        <span className="text-xs text-gray-500">
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
          <section className="bg-[#11141c] border border-cyan-500/20 rounded-3xl p-8 space-y-8">
            <h2 className="text-2xl font-bold text-white text-center">Campaign Cost Estimator</h2>

            {/* CONTROLS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* Duration */}
              <div>
                <label className="text-gray-400 text-sm mb-2 block">
                  Campaign Duration — <span className="text-white font-semibold">{days} day{days > 1 ? "s" : ""}</span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={90}
                  step={1}
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  <span>1 day</span>
                  <span>30 days</span>
                  <span>90 days</span>
                </div>
              </div>

              {/* Boost */}
              <div>
                <label className="text-gray-400 text-sm mb-2 block">
                  Reach Boost — <span className="text-white font-semibold">{boostOption.label} ({boostOption.note})</span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={5}
                  step={1}
                  value={boost}
                  onChange={(e) => setBoost(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  {BOOST_OPTIONS.map((b) => (
                    <span key={b.value}>{b.label}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* TARGETING SEGMENTS */}
            <div>
              <label className="text-gray-400 text-sm mb-3 block">
                Target Audience —{" "}
                <span className="text-white font-semibold">
                  {segments.size} segment{segments.size !== 1 ? "s" : ""}
                </span>
                <span className="text-gray-600 ml-2">(first segment free, +₹{SEG_ADDON_PER_DAY.toLocaleString()}/day each extra)</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {AUDIENCE_SEGMENTS.map((seg) => {
                  const on = segments.has(seg.id);
                  return (
                    <button
                      key={seg.id}
                      onClick={() => toggleSegment(seg.id)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all
                        ${on
                          ? "bg-cyan-500/20 border-cyan-500/60 text-cyan-300"
                          : "bg-white/5 border-white/10 text-gray-400 hover:border-white/30"
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
            <div className="bg-[#0a0e1a] border border-white/5 rounded-2xl p-6">
              <p className="text-sm font-semibold text-gray-400 mb-2 uppercase tracking-widest">Cost breakdown</p>
              <BreakdownRow label="Placement"            value={selectedAd.name} />
              <BreakdownRow label="Base rate"            value={`${fmtINR(selectedAd.baseRate)}/day`} />
              <BreakdownRow label="Duration"             value={`${days} day${days > 1 ? "s" : ""}`} />
              <BreakdownRow label="Reach boost"          value={`${boostOption.label} (×${boostOption.multiplier})`} />
              <BreakdownRow label="Targeting segments"   value={`${segments.size} selected`} />
              <BreakdownRow label="Segment add-on"       value={fmtINR(estimate.segAddon)} />
              <BreakdownRow label="Total estimate"       value={fmtINR(estimate.grandTotal)} highlight />
            </div>

            <p className="text-xs text-gray-600 text-center">
              * Estimates are based on current NearWe platform traffic and are indicative only.
              Final delivery may vary based on audience availability and creative quality score.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={buildMailtoLink()}
                className="flex-1 text-center py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-sm transition-colors"
              >
                Book this campaign — {fmtINR(estimate.grandTotal)}
              </a>
              <a
                href="mailto:support@nearwe.in"
                className="px-6 py-3.5 rounded-xl border border-cyan-500/40 hover:border-cyan-500/80 text-cyan-400 font-semibold text-sm text-center transition-colors"
              >
                Contact sales
              </a>
            </div>
          </section>

          {/* BENEFITS */}
          <section>
            <h2 className="text-xl font-semibold text-cyan-400 mb-4">Why Advertise on NearWe?</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Reach local and hyper-targeted users",
                "Increase brand visibility across Android & iOS",
                "Drive traffic, footfall, and conversions",
                "Flexible budgets with transparent pricing",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
                  <span className="text-cyan-400 text-lg">✔</span>
                  <span className="text-gray-300 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </section>

        </div>
      </section>
    </div>
    </>
  );
}