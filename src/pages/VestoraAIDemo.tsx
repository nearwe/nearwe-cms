import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Wallet,
  BarChart3,
  PieChart,
  Activity,
  Newspaper,
  FileText,
  Globe,
  Building2,
  ShieldAlert,
  Target,
  Cpu,
  Database,
  MessageCircle,
  CheckCircle2,
  XCircle,
  Lock,
  KeyRound,
  Landmark,
  Users,
  Briefcase,
  Award,
  Layers,
  Sparkles,
  Percent,
  LineChart,
  Radar,
  Scale,
  RefreshCw,
  UserCog,
  Sprout,
  Code2,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Scroll reveal — small, dependency-free intersection observer hook  */
/* ------------------------------------------------------------------ */

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Shared bits                                                        */
/* ------------------------------------------------------------------ */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">
      {children}
    </p>
  );
}

function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-sm transition hover:border-cyan-300/30 hover:bg-white/[0.055] ${className}`}
    >
      {children}
    </div>
  );
}

function IconBadge({
  icon: Icon,
  tone = "cyan",
  size = "md",
}: {
  icon: React.ElementType;
  tone?: "cyan" | "green" | "red" | "amber";
  size?: "sm" | "md" | "lg";
}) {
  const tones: Record<string, string> = {
    cyan: "bg-cyan-400/10 text-cyan-300 border-cyan-300/20",
    green: "bg-emerald-400/10 text-emerald-300 border-emerald-300/20",
    red: "bg-rose-400/10 text-rose-300 border-rose-300/20",
    amber: "bg-amber-400/10 text-amber-300 border-amber-300/20",
  };
  const sizes: Record<string, string> = {
    sm: "h-9 w-9 rounded-xl [&>svg]:h-4 [&>svg]:w-4",
    md: "h-12 w-12 rounded-2xl [&>svg]:h-6 [&>svg]:w-6",
    lg: "h-14 w-14 rounded-2xl [&>svg]:h-7 [&>svg]:w-7",
  };
  return (
    <div
      className={`flex items-center justify-center border ${tones[tone]} ${sizes[size]}`}
    >
      <Icon />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Content data                                                       */
/* ------------------------------------------------------------------ */

const problems = [
  {
    icon: TrendingDown,
    title: "No time to analyze",
    desc: "Working professionals can't track fundamentals, technicals and news across 20+ holdings, every single day.",
  },
  {
    icon: ShieldAlert,
    title: "Emotional decisions",
    desc: "Panic-selling in dips and FOMO-buying at peaks quietly erode long-term returns.",
  },
  {
    icon: XCircle,
    title: "Advice without control",
    desc: "Traditional advisory and robo-platforms auto-execute trades without real-time human consent.",
  },
  {
    icon: Newspaper,
    title: "Fragmented information",
    desc: "Signals live scattered across broker apps, news sites, screeners and forums — never in one place.",
  },
];

const signals = [
  { icon: Wallet, label: "Current Holdings" },
  { icon: BarChart3, label: "Profit & Loss" },
  { icon: ShieldAlert, label: "Risk Exposure" },
  { icon: TrendingUp, label: "Market Trends" },
  { icon: LineChart, label: "Technical Indicators" },
  { icon: FileText, label: "Fundamental Analysis" },
  { icon: Activity, label: "Volume Analysis" },
  { icon: Newspaper, label: "News Sentiment" },
  { icon: FileText, label: "Corporate Actions" },
  { icon: RefreshCw, label: "Sector Rotation" },
  { icon: Building2, label: "Institutional Buying" },
  { icon: Globe, label: "Macro Events" },
];

const otherCalls: [string, string, "green" | "red" | "amber"][] = [
  ["BUY", "TCS", "green"],
  ["SELL", "Infosys", "red"],
  ["HOLD", "Reliance", "amber"],
  ["BUY", "HDFC Bank", "green"],
  ["REDUCE", "Adani Green", "red"],
  ["INCREASE", "Tata Motors", "green"],
];

const brokers = [
  "Zerodha Kite Connect",
  "Groww APIs",
  "Angel One SmartAPI",
  "Upstox",
  "ICICI Direct",
  "Kotak Neo",
  "5paisa",
];

const pipeline = [
  { icon: Database, label: "Market Data" },
  { icon: Wallet, label: "Portfolio Engine" },
  { icon: Cpu, label: "AI Analysis" },
  { icon: ShieldAlert, label: "Risk Engine" },
  { icon: Target, label: "Recommendation Engine" },
  { icon: MessageCircle, label: "WhatsApp Approval" },
  { icon: Code2, label: "Broker API" },
  { icon: CheckCircle2, label: "Order Executed" },
];

const modules = [
  { icon: FileText, label: "Fundamental AI" },
  { icon: LineChart, label: "Technical AI" },
  { icon: Newspaper, label: "News Sentiment AI" },
  { icon: Percent, label: "Options AI" },
  { icon: Sprout, label: "Long-Term Investment AI" },
  { icon: RefreshCw, label: "Swing Trading AI" },
  { icon: Scale, label: "Tax Optimization AI" },
  { icon: Layers, label: "Portfolio Rebalancing AI" },
  { icon: UserCog, label: "Personalized Investment AI" },
  { icon: PieChart, label: "Portfolio Analyzer" },
  { icon: Radar, label: "Market Prediction Engine" },
  { icon: ShieldAlert, label: "Risk Analyzer" },
];

const security = [
  { icon: Lock, title: "Bank-Grade Encryption", desc: "AES-256 encryption for portfolio and personal data, at rest and in transit." },
  { icon: KeyRound, title: "OAuth Login", desc: "Token-based authentication — Vestora AI never stores your password." },
  { icon: ShieldCheck, title: "Demat Authentication", desc: "Broker-verified identity checks before any account is linked." },
  { icon: Code2, title: "Broker API Security", desc: "Signed, scoped API calls with rotating tokens for every connected broker." },
  { icon: Database, title: "Encrypted Portfolio Data", desc: "Holdings and transaction history encrypted end-to-end in our data layer." },
  { icon: FileText, title: "AI Audit Logs", desc: "Every recommendation and every approval is immutably logged for review." },
  { icon: CheckCircle2, title: "Approval Before Every Trade", desc: "No exceptions — human-in-the-loop applies to 100% of trades." },
  { icon: XCircle, title: "Zero Unauthorized Execution", desc: "Reject or ignore a call and Vestora AI takes no action, ever." },
];

const regs = [
  { title: "SEBI IA / RA Regulations", desc: "Applicable if Vestora AI provides personalized investment advice — exact pathway depends on the final product model." },
  { title: "DPDP Act, 2023", desc: "Digital Personal Data Protection compliance for all user financial data." },
  { title: "Broker API Agreements", desc: "Formal agreements with each integrated brokerage partner." },
  { title: "Exchange & Cyber Security Standards", desc: "Alignment with NSE/BSE and CERT-In cyber security norms." },
];

const opsCommitments = [
  "User consent management",
  "Audit logs & data retention policy",
  "Privacy policy & terms of service",
  "Risk disclosure on every recommendation",
];

const businessModel = [
  { icon: Users, title: "Freemium", desc: "Core portfolio tracking free; AI recommendations behind a paywall." },
  { icon: Award, title: "Premium AI Subscription", desc: "Monthly / annual plan for full AI recommendation engine access." },
  { icon: Briefcase, title: "Enterprise Wealth Management", desc: "Custom deployments for wealth managers & family offices." },
  { icon: Layers, title: "White Label Platform", desc: "License the engine to brokers & fintechs under their own brand." },
  { icon: Landmark, title: "Broker Commission Sharing", desc: "Revenue share on trades executed through partner brokers." },
  { icon: PieChart, title: "Portfolio Analytics Subscription", desc: "Standalone analytics tier for advisors and PMS firms." },
  { icon: Code2, title: "API Platform / B2B SaaS", desc: "Usage-based API access for institutional & B2B integrations." },
];

const targetUsers = [
  { icon: Users, title: "Retail Investors", desc: "Everyday investors who want AI guidance without giving up control." },
  { icon: Briefcase, title: "Working Professionals", desc: "Time-starved earners who need portfolio decisions made simple." },
  { icon: Award, title: "HNIs", desc: "High net-worth individuals seeking sharper, faster signal." },
  { icon: LineChart, title: "Financial Advisors", desc: "Advisors who want an AI co-pilot for client portfolios." },
  { icon: PieChart, title: "Wealth Managers", desc: "Firms managing multi-crore portfolios across many clients." },
  { icon: Building2, title: "Family Offices", desc: "Private offices needing systematic, auditable decision trails." },
  { icon: Layers, title: "Small PMS Firms", desc: "Boutique portfolio management services scaling with AI." },
];

const marketStats = [
  { value: "19.5 Cr+", label: "Demat accounts (2026E)" },
  { value: "₹45L Cr+", label: "Retail AUM in equities" },
  { value: "120M+", label: "Digital-first investors" },
];

const demoAccounts = [
  { year: "2021", value: 5.5 },
  { year: "2022", value: 8.9 },
  { year: "2023", value: 11.4 },
  { year: "2024", value: 15.1 },
  { year: "2025", value: 17.9 },
  { year: "2026E", value: 19.5 },
];

const growthDrivers = [
  "Rising smartphone & UPI penetration",
  "SEBI push for investor protection technology",
  "Explosive growth in SIP participation",
  "Rapid enterprise AI adoption across fintech",
];

const roadmap = [
  { icon: Cpu, phase: "Phase 1", title: "AI Portfolio Analysis" },
  { icon: MessageCircle, phase: "Phase 2", title: "WhatsApp Approval" },
  { icon: Code2, phase: "Phase 3", title: "Broker Integration" },
  { icon: Percent, phase: "Phase 4", title: "Options AI" },
  { icon: PieChart, phase: "Phase 5", title: "Mutual Fund AI" },
  { icon: Globe, phase: "Phase 6", title: "Global Markets" },
];

const differentiators = [
  "Never auto-trades without explicit approval",
  "Every call ships with reason, confidence & risk",
  "Works across 7+ major Indian brokers",
  "Personalized to your existing holdings, not generic tips",
];

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

export default function VestoraAI() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goToDemo = () => {
    if (location.pathname === "/vestora-ai/demo") {
      document.getElementById("product")?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    navigate("/vestora-ai/demo");
  };

  return (
    <>
      <Helmet>
        <title>Vestora AI — AI Portfolio Intelligence for Indian Investors | Nearwe Labs</title>
        <meta
          name="description"
          content="Vestora AI continuously analyzes your portfolio against market signals and sends reasoned Buy/Sell/Hold recommendations to WhatsApp for one-tap approval — nothing executes without you."
        />
        <meta property="og:title" content="Vestora AI by Nearwe Labs" />
        <meta
          property="og:description"
          content="AI-powered portfolio intelligence with human-in-the-loop WhatsApp trade approval."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nearwe.in/vestora-ai" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="min-h-screen bg-[#080b13] text-white antialiased overflow-x-hidden">
        {/* ============================== NAV ============================== */}
        <nav
          className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors ${
            scrolled
              ? "border-white/10 bg-[#080b13]/90 backdrop-blur-xl"
              : "border-transparent bg-transparent"
          }`}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-lg font-black tracking-tight text-white"
            >
              <span className="text-slate-200">NearWe</span>
              <span className="text-slate-500 font-semibold">Labs</span>
            </button>

            <div className="hidden items-center gap-8 md:flex">
              {["Product", "How it works", "Security", "Roadmap"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-sm font-semibold text-slate-300 transition hover:text-white"
                >
                  {item}
                </a>
              ))}
            </div>

            <button
              onClick={goToDemo}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-bold text-[#080b13] transition hover:bg-cyan-200"
            >
              See Demo
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </nav>

        {/* ============================== HERO ============================== */}
        <section className="relative min-h-screen px-5 pb-20 pt-32 sm:pt-40" id="product">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(34,211,238,0.20),transparent_32%),radial-gradient(circle_at_88%_12%,rgba(59,130,246,0.16),transparent_30%),linear-gradient(180deg,#080b13_0%,#0d1321_60%,#080b13_100%)]" />
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)",
                backgroundSize: "52px 52px",
              }}
            />
          </div>

          <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <Reveal>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-xs sm:text-sm font-semibold text-cyan-200">
                  <Sparkles className="h-4 w-4" />
                  AI-powered portfolio intelligence, by NearWe Labs
                </div>
              </Reveal>

              <Reveal delay={80}>
                <h1 className="max-w-4xl text-5xl font-black leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
                  Vestora <span className="text-cyan-300">AI</span>
                </h1>
              </Reveal>

              <Reveal delay={140}>
                <p className="mt-6 max-w-xl text-lg italic text-cyan-200/90 sm:text-xl">
                  Analyze. Approve. Invest.
                </p>
              </Reveal>

              <Reveal delay={180}>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
                  Vestora AI continuously studies your live portfolio against real-time
                  market signals, then sends a clear, reasoned Buy / Sell / Hold call
                  straight to WhatsApp. Nothing ever executes until you tap approve.
                </p>
              </Reveal>

              <Reveal delay={240}>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={goToDemo}
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-8 py-4 text-base font-black text-[#06101c] shadow-2xl shadow-cyan-500/25 transition hover:from-cyan-300 hover:to-blue-400"
                  >
                    See demo of Vestora AI
                    <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                  </button>
                  <a
                    href="mailto:support@nearwe.in?subject=Vestora%20AI%20Inquiry"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-8 py-4 text-base font-bold text-white transition hover:border-cyan-300/60 hover:bg-white/5"
                  >
                    Talk to NearWe Labs
                  </a>
                </div>
              </Reveal>

              <Reveal delay={300}>
                <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
                  {[
                    ["12", "AI signal streams"],
                    ["7+", "Broker integrations"],
                    ["0", "Trades without approval"],
                  ].map(([value, label]) => (
                    <div key={label} className="border-l border-cyan-300/30 pl-4">
                      <div className="text-2xl font-black text-white">{value}</div>
                      <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Hero visual: WhatsApp approval mock — the signature element */}
            <Reveal delay={160} className="relative">
              <div className="relative mx-auto max-w-sm">
                <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-cyan-500/10 blur-3xl" />
                <div className="rounded-[2.2rem] border border-white/10 bg-[#0c1220] p-3 shadow-2xl shadow-black/50">
                  <div className="rounded-[1.7rem] border border-white/10 bg-[#0b141a] overflow-hidden">
                    {/* chat header */}
                    <div className="flex items-center gap-3 bg-[#1f2c34] px-4 py-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400 text-sm font-black text-[#06101c]">
                        V
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Vestora AI</div>
                        <div className="text-[11px] text-emerald-300">online</div>
                      </div>
                    </div>

                    <div className="space-y-3 p-4">
                      <div className="rounded-2xl bg-[#1f2c34] px-3 py-2 text-sm text-white">
                        Good Morning Rahul 👋
                      </div>

                      <div className="rounded-2xl bg-[#1f2c34] p-4">
                        <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                          AI Recommendation
                        </div>
                        <span className="inline-block rounded-full bg-emerald-400 px-3 py-1 text-xs font-black text-[#06170f]">
                          BUY
                        </span>
                        <div className="mt-2 text-lg font-black text-white">Tata Motors</div>

                        <div className="mt-3 grid grid-cols-2 gap-y-2 text-xs">
                          <div>
                            <div className="text-slate-500">Current</div>
                            <div className="font-bold text-white">₹865</div>
                          </div>
                          <div>
                            <div className="text-slate-500">Target</div>
                            <div className="font-bold text-white">₹920</div>
                          </div>
                          <div>
                            <div className="text-slate-500">Confidence</div>
                            <div className="font-bold text-white">92%</div>
                          </div>
                          <div>
                            <div className="text-slate-500">Return</div>
                            <div className="font-bold text-emerald-300">+6.4%</div>
                          </div>
                        </div>

                        <p className="mt-3 text-[11px] leading-4 text-slate-400">
                          Reason: strong volume breakout, positive earnings, bullish setup.
                        </p>

                        <div className="mt-4 grid grid-cols-2 gap-2">
                          <button className="rounded-xl bg-emerald-400 py-2 text-xs font-black text-[#06170f]">
                            🟢 APPROVE
                          </button>
                          <button className="rounded-xl bg-rose-400 py-2 text-xs font-black text-[#2a0808]">
                            🔴 REJECT
                          </button>
                        </div>
                      </div>

                      <div className="ml-auto w-fit rounded-2xl bg-emerald-800/60 px-3 py-2 text-[11px] font-semibold text-emerald-200">
                        ✅ Order placed via Zerodha
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============================== PROBLEM ============================== */}
        <section className="px-5 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <Eyebrow>The Problem</Eyebrow>
              <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                Retail investors are flying blind, every single trading day.
              </h2>
            </Reveal>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {problems.map((p, i) => (
                <Reveal key={p.title} delay={i * 80}>
                  <GlassCard className="h-full p-6">
                    <IconBadge icon={p.icon} tone="red" />
                    <h3 className="mt-5 text-lg font-black text-white">{p.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{p.desc}</p>
                  </GlassCard>
                </Reveal>
              ))}
            </div>

            <Reveal delay={200}>
              <p className="mt-8 italic text-cyan-200/80">
                19.5 crore+ Demat accounts in India are managed with zero systematic,
                AI-driven decision support.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ============================== SOLUTION ============================== */}
        <section className="px-5 py-20 sm:py-24 bg-[#0c1220]" id="how-it-works">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-14 lg:grid-cols-2 lg:items-start">
              <div>
                <Reveal>
                  <Eyebrow>The Solution</Eyebrow>
                  <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                    The intelligence layer between the market and your money.
                  </h2>
                  <p className="mt-5 text-base leading-7 text-slate-300 sm:text-lg">
                    Vestora AI continuously studies your live portfolio — holdings, P&amp;L
                    and risk — against real-time market signals, then prepares a clear,
                    reasoned trade recommendation. Nothing executes until you say so.
                  </p>
                </Reveal>

                <Reveal delay={120}>
                  <div className="mt-10 flex flex-wrap items-center gap-x-2 gap-y-6">
                    {[
                      { icon: Cpu, label: "AI analyzes" },
                      { icon: Target, label: "Recommends" },
                      { icon: MessageCircle, label: "You approve" },
                      { icon: CheckCircle2, label: "Executes" },
                    ].map((step, i) => (
                      <React.Fragment key={step.label}>
                        <div className="flex flex-col items-center gap-2">
                          <IconBadge icon={step.icon} tone="cyan" />
                          <span className="text-xs font-semibold text-slate-300">
                            {step.label}
                          </span>
                        </div>
                        {i < 3 && (
                          <ChevronRight className="hidden h-5 w-5 flex-shrink-0 text-slate-600 sm:block" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </Reveal>
              </div>

              <Reveal delay={100}>
                <GlassCard className="p-7">
                  <div className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                    Why it's different
                  </div>
                  <div className="mt-5 space-y-5">
                    {differentiators.map((d) => (
                      <div key={d} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-300" />
                        <span className="text-sm font-medium text-slate-200 sm:text-base">
                          {d}
                        </span>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </Reveal>
            </div>

            {/* Signal grid */}
            <Reveal delay={80}>
              <div className="mt-16">
                <h3 className="text-xl font-black text-white sm:text-2xl">
                  Twelve signal streams, fused into one recommendation
                </h3>
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {signals.map((s) => (
                    <div
                      key={s.label}
                      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5 transition hover:border-cyan-300/30"
                    >
                      <IconBadge icon={s.icon} tone="cyan" size="sm" />
                      <span className="text-sm font-semibold text-slate-200">
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============================== RECOMMENDATION EXAMPLE ============================== */}
        <section className="px-5 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <Eyebrow>AI Output</Eyebrow>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                Every recommendation, fully reasoned.
              </h2>
              <p className="mt-4 max-w-2xl text-slate-400">
                No black-box tips. Each call ships with the numbers behind it.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
              <Reveal>
                <GlassCard className="p-7 sm:p-8">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="rounded-full bg-emerald-400 px-5 py-2 text-sm font-black text-[#06170f]">
                      BUY
                    </span>
                    <div>
                      <div className="text-2xl font-black text-white">Tata Motors</div>
                      <div className="text-xs text-slate-500">NSE: TATAMOTORS</div>
                    </div>
                    <span className="ml-auto rounded-full border border-cyan-300/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-bold text-cyan-200">
                      92% Confidence
                    </span>
                  </div>

                  <div className="mt-7 grid grid-cols-2 gap-6 border-t border-white/10 pt-6 sm:grid-cols-3">
                    {[
                      ["Current Price", "₹865"],
                      ["Target Price", "₹920"],
                      ["Expected Return", "+6.4%"],
                      ["Stop Loss", "₹820"],
                      ["Holding Period", "3–5 weeks"],
                      ["Risk Level", "Moderate"],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                          {label}
                        </div>
                        <div className="mt-1 text-lg font-black text-white">{value}</div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-7 border-t border-white/10 pt-6">
                    <div className="text-[11px] font-bold uppercase tracking-wide text-cyan-300">
                      AI Reasoning
                    </div>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      Strong volume breakout · Positive earnings surprise · Bullish
                      technical setup confirmed across 3 indicators.
                    </p>
                  </div>
                </GlassCard>
              </Reveal>

              <Reveal delay={100}>
                <div>
                  <div className="mb-3 text-xs font-bold uppercase tracking-wider text-cyan-300">
                    More AI calls today
                  </div>
                  <div className="space-y-3">
                    {otherCalls.map(([action, name, tone]) => (
                      <div
                        key={name}
                        className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3.5"
                      >
                        <span
                          className={`w-24 flex-shrink-0 rounded-full px-3 py-1 text-center text-xs font-black ${
                            tone === "green"
                              ? "bg-emerald-400/15 text-emerald-300"
                              : tone === "red"
                              ? "bg-rose-400/15 text-rose-300"
                              : "bg-amber-400/15 text-amber-300"
                          }`}
                        >
                          {action}
                        </span>
                        <span className="font-bold text-white">{name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ============================== HUMAN IN THE LOOP BANNER ============================== */}
        <section className="px-5 py-20 sm:py-24 bg-gradient-to-b from-[#0c1220] to-[#080b13]">
          <div className="mx-auto max-w-5xl text-center">
            <Reveal>
              <Eyebrow>The Differentiator</Eyebrow>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                Vestora AI never trades without your approval.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-slate-400">
                A true human-in-the-loop system. The AI thinks. You decide. Only then
                does execution happen.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  { icon: Cpu, label: "AI Recommends" },
                  { icon: MessageCircle, label: "Sent to WhatsApp" },
                  { icon: Users, label: "You Approve / Reject" },
                  { icon: CheckCircle2, label: "Trade Executes" },
                ].map((f) => (
                  <GlassCard key={f.label} className="flex flex-col items-center gap-3 p-6">
                    <IconBadge icon={f.icon} tone="cyan" size="lg" />
                    <span className="text-sm font-bold text-white">{f.label}</span>
                  </GlassCard>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============================== WHATSAPP FLOW DETAIL ============================== */}
        <section className="px-5 py-20 sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <Eyebrow>Approval Flow</Eyebrow>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
                Approve trades from your WhatsApp — literally.
              </h2>
              <p className="mt-4 text-slate-400">
                No new app to learn. Recommendations land where 500M+ Indians already are.
              </p>

              <div className="mt-9 space-y-6">
                {[
                  { icon: Target, title: "Tap once — that's it", desc: "No app switching, no forms." },
                  { icon: ShieldCheck, title: "Reject = nothing happens", desc: "Zero unauthorized execution, ever." },
                  { icon: CheckCircle2, title: "Instant broker sync", desc: "Approved trades route straight to your connected broker." },
                ].map((n) => (
                  <div key={n.title} className="flex items-start gap-4">
                    <IconBadge icon={n.icon} tone="cyan" />
                    <div>
                      <div className="font-black text-white">{n.title}</div>
                      <div className="mt-1 text-sm text-slate-400">{n.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="relative mx-auto max-w-sm">
                <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-blue-500/10 blur-3xl" />
                <div className="rounded-[2.2rem] border border-white/10 bg-[#0c1220] p-3 shadow-2xl shadow-black/50">
                  <div className="overflow-hidden rounded-[1.7rem] border border-white/10 bg-[#0b141a]">
                    <div className="flex items-center gap-3 bg-[#1f2c34] px-4 py-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400 text-sm font-black text-[#06101c]">
                        V
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Vestora AI</div>
                        <div className="text-[11px] text-emerald-300">online</div>
                      </div>
                    </div>
                    <div className="space-y-3 p-4">
                      <div className="rounded-2xl bg-[#1f2c34] px-3 py-2 text-sm text-white">
                        AI recommendation ready for your review 📊
                      </div>
                      <div className="rounded-2xl bg-[#1f2c34] p-4">
                        <span className="inline-block rounded-full bg-rose-400 px-3 py-1 text-xs font-black text-[#2a0808]">
                          SELL
                        </span>
                        <div className="mt-2 text-lg font-black text-white">Infosys</div>
                        <p className="mt-2 text-[11px] leading-4 text-slate-400">
                          Reason: weakening momentum, sector rotation out of IT.
                        </p>
                        <div className="mt-4 grid grid-cols-2 gap-2">
                          <button className="rounded-xl bg-emerald-400 py-2 text-xs font-black text-[#06170f]">
                            🟢 APPROVE
                          </button>
                          <button className="rounded-xl bg-rose-400 py-2 text-xs font-black text-[#2a0808]">
                            🔴 REJECT
                          </button>
                        </div>
                      </div>
                      <div className="w-fit rounded-2xl bg-[#1f2c34] px-3 py-2 text-[11px] font-semibold text-slate-300">
                        You: Rejected — holding for now
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============================== BROKERS ============================== */}
        <section className="px-5 py-20 sm:py-24 bg-[#0c1220]">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <Eyebrow>Integrations</Eyebrow>
              <h2 className="mt-3 max-w-2xl text-3xl font-black tracking-tight text-white sm:text-4xl">
                One-time connect. Every future trade, automated.
              </h2>
              <p className="mt-4 max-w-2xl text-slate-400">
                Vestora AI connects securely to your Demat account once — approved
                trades then execute automatically through your existing broker.
              </p>
            </Reveal>

            <Reveal delay={100}>
              <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {brokers.map((b) => (
                  <div
                    key={b}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4"
                  >
                    <Landmark className="h-5 w-5 flex-shrink-0 text-cyan-300" />
                    <span className="text-sm font-bold text-white">{b}</span>
                  </div>
                ))}
                <div className="flex items-center justify-center rounded-2xl border border-dashed border-white/15 px-4 py-4 text-sm italic text-slate-500">
                  + more coming soon
                </div>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div className="mt-6 flex items-center gap-2 text-sm italic text-cyan-200/70">
                Connect once <ArrowRight className="h-4 w-4" /> broker API on file{" "}
                <ArrowRight className="h-4 w-4" /> approvals auto-execute forever
              </div>

              <GlassCard className="mt-6 flex items-center gap-4 p-5">
                <IconBadge icon={Lock} tone="cyan" />
                <p className="text-sm text-slate-300">
                  Bank-grade OAuth authentication — Vestora AI never stores your broker
                  password or trading PIN.
                </p>
              </GlassCard>
            </Reveal>
          </div>
        </section>

        {/* ============================== ARCHITECTURE ============================== */}
        <section className="px-5 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <Eyebrow>Architecture</Eyebrow>
              <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                From market tick to executed trade in one AI-governed pipeline.
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {pipeline.map((n, i) => (
                  <div key={n.label} className="relative">
                    <GlassCard className="flex h-full flex-col items-center gap-3 p-6 text-center">
                      <IconBadge icon={n.icon} tone="cyan" />
                      <span className="text-sm font-bold text-white">{n.label}</span>
                    </GlassCard>
                    {i < pipeline.length - 1 && i % 4 !== 3 && (
                      <ChevronRight className="absolute -right-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 text-slate-600 sm:block" />
                    )}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm italic text-slate-500">
                → Portfolio updated after every executed order, feeding the next cycle.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ============================== AI MODULES ============================== */}
        <section className="px-5 py-20 sm:py-24 bg-[#0c1220]">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <Eyebrow>The AI Stack</Eyebrow>
              <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                Twelve specialized AI modules, working as one analyst.
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {modules.map((m) => (
                  <GlassCard key={m.label} className="flex flex-col items-center gap-3 p-6 text-center">
                    <IconBadge icon={m.icon} tone="cyan" />
                    <span className="text-sm font-bold text-white">{m.label}</span>
                  </GlassCard>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============================== DASHBOARD MOCK ============================== */}
        <section className="px-5 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <Eyebrow>Product</Eyebrow>
              <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                A command center for your entire portfolio.
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <GlassCard className="mt-12 p-5 sm:p-8">
                {/* top stats */}
                <div className="grid grid-cols-2 gap-6 border-b border-white/10 pb-6 sm:grid-cols-4">
                  {[
                    ["Portfolio Value", "₹18,42,600", "text-white"],
                    ["Today's P&L", "+₹24,180 (1.3%)", "text-emerald-300"],
                    ["AI Confidence", "87%", "text-cyan-300"],
                    ["Pending Approvals", "3", "text-amber-300"],
                  ].map(([label, value, color]) => (
                    <div key={label}>
                      <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                        {label}
                      </div>
                      <div className={`mt-1 text-xl font-black sm:text-2xl ${color}`}>
                        {value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid gap-8 py-8 lg:grid-cols-3">
                  {/* sector heatmap */}
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wide text-cyan-300">
                      Sector Heatmap
                    </div>
                    <div className="mt-4 grid grid-cols-4 gap-2">
                      {[
                        ["IT", "green"],
                        ["Banking", "green"],
                        ["Auto", "amber"],
                        ["Energy", "red"],
                        ["Pharma", "green"],
                        ["FMCG", "amber"],
                        ["Metals", "red"],
                        ["Realty", "green"],
                      ].map(([label, tone]) => (
                        <div
                          key={label}
                          className={`rounded-lg border px-2 py-2.5 text-center text-[11px] font-bold ${
                            tone === "green"
                              ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-200"
                              : tone === "red"
                              ? "border-rose-400/30 bg-rose-400/10 text-rose-200"
                              : "border-amber-400/30 bg-amber-400/10 text-amber-200"
                          }`}
                        >
                          {label}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* risk + sentiment */}
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wide text-cyan-300">
                      Risk Meter
                    </div>
                    <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full bg-white/10">
                      <div className="h-full w-3/5 rounded-full bg-amber-400" />
                    </div>
                    <div className="mt-2 text-sm text-slate-400">Moderate Risk · 60/100</div>

                    <div className="mt-6 text-xs font-bold uppercase tracking-wide text-cyan-300">
                      Market Sentiment
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-lg font-black text-emerald-300">
                      Bullish <TrendingUp className="h-5 w-5" />
                    </div>
                  </div>

                  {/* recommended trades */}
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wide text-cyan-300">
                      Recommended Trades
                    </div>
                    <div className="mt-4 space-y-3">
                      {[
                        ["BUY", "TCS", "text-emerald-300"],
                        ["SELL", "Infosys", "text-rose-300"],
                        ["HOLD", "Reliance", "text-amber-300"],
                      ].map(([action, name, color]) => (
                        <div key={name} className="flex items-center gap-3 text-sm">
                          <span className={`w-14 font-black ${color}`}>{action}</span>
                          <span className="font-bold text-white">{name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* performance analytics */}
                <div className="border-t border-white/10 pt-6">
                  <div className="text-xs font-bold uppercase tracking-wide text-cyan-300">
                    Performance Analytics
                  </div>
                  <div className="mt-5 flex items-end gap-2 sm:gap-3">
                    {[30, 50, 40, 70, 55, 85, 65].map((v, i) => (
                      <div
                        key={i}
                        className="w-6 rounded-t-md bg-gradient-to-t from-cyan-500/40 to-cyan-300 sm:w-10"
                        style={{ height: `${v}px` }}
                      />
                    ))}
                    <span className="ml-2 self-center text-xs text-slate-500 sm:ml-4 sm:text-sm">
                      Trade History · last 7 approvals, avg return +4.8%
                    </span>
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          </div>
        </section>

        {/* ============================== SECURITY ============================== */}
        <section className="px-5 py-20 sm:py-24 bg-[#0c1220]" id="security">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <Eyebrow>Trust &amp; Safety</Eyebrow>
              <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                Security isn't a feature here — it's the entire premise.
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {security.map((it) => (
                  <GlassCard key={it.title} className="p-6">
                    <IconBadge icon={it.icon} tone="cyan" size="sm" />
                    <h3 className="mt-4 font-black text-white">{it.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{it.desc}</p>
                  </GlassCard>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============================== REGULATORY ============================== */}
        <section className="px-5 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <Eyebrow>Governance</Eyebrow>
              <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                A compliance roadmap built for India's regulatory reality.
              </h2>
            </Reveal>

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              <Reveal>
                <GlassCard className="h-full p-7">
                  <div className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                    Key Frameworks
                  </div>
                  <div className="mt-5 space-y-5">
                    {regs.map((r) => (
                      <div key={r.title} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-cyan-300" />
                        <div>
                          <div className="font-bold text-white">{r.title}</div>
                          <div className="mt-1 text-sm text-slate-400">{r.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </Reveal>

              <Reveal delay={100}>
                <GlassCard className="h-full p-7">
                  <div className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                    Operational Commitments
                  </div>
                  <div className="mt-5 space-y-4">
                    {opsCommitments.map((o) => (
                      <div key={o} className="flex items-center gap-3">
                        <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-300" />
                        <span className="text-sm font-medium text-slate-200">{o}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-6 border-t border-white/10 pt-5 text-xs italic leading-5 text-slate-500">
                    The exact regulatory pathway — execution platform, research tool, or
                    registered advisory — will be finalized with legal counsel ahead of
                    launch.
                  </p>
                </GlassCard>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ============================== BUSINESS MODEL ============================== */}
        <section className="px-5 py-20 sm:py-24 bg-[#0c1220]">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <Eyebrow>Business Model</Eyebrow>
              <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                Seven monetization layers, one platform.
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {businessModel.map((m) => (
                  <GlassCard key={m.title} className="p-6">
                    <IconBadge icon={m.icon} tone="cyan" size="sm" />
                    <h3 className="mt-4 font-black text-white">{m.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{m.desc}</p>
                  </GlassCard>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============================== TARGET USERS ============================== */}
        <section className="px-5 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <Eyebrow>Who We Serve</Eyebrow>
              <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                Built for every layer of India's investing ecosystem.
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {targetUsers.map((u) => (
                  <GlassCard key={u.title} className="p-6">
                    <IconBadge icon={u.icon} tone="cyan" size="sm" />
                    <h3 className="mt-4 font-black text-white">{u.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{u.desc}</p>
                  </GlassCard>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ============================== MARKET OPPORTUNITY ============================== */}
        <section className="px-5 py-20 sm:py-24 bg-[#0c1220]">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <Eyebrow>Market Opportunity</Eyebrow>
              <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                India's retail investing boom needs an AI layer.
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
                {marketStats.map((s) => (
                  <div key={s.label}>
                    <div className="text-4xl font-black text-cyan-300 sm:text-5xl">
                      {s.value}
                    </div>
                    <div className="mt-2 text-sm text-slate-400">{s.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>

            <div className="mt-12 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
              <Reveal delay={140}>
                <GlassCard className="p-7">
                  <div className="text-xs font-bold uppercase tracking-wide text-cyan-300">
                    Demat Account Growth (Cr)
                  </div>
                  <div className="mt-6 flex items-end gap-3 sm:gap-5">
                    {demoAccounts.map((d) => (
                      <div key={d.year} className="flex flex-1 flex-col items-center gap-2">
                        <span className="text-xs font-bold text-white">{d.value}</span>
                        <div
                          className="w-full rounded-t-md bg-gradient-to-t from-cyan-500/30 to-cyan-300"
                          style={{ height: `${d.value * 8}px` }}
                        />
                        <span className="text-[11px] text-slate-500">{d.year}</span>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </Reveal>

              <Reveal delay={200}>
                <GlassCard className="h-full p-7">
                  <div className="text-xs font-bold uppercase tracking-wide text-cyan-300">
                    Growth Drivers
                  </div>
                  <div className="mt-5 space-y-4">
                    {growthDrivers.map((d) => (
                      <div key={d} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-300" />
                        <span className="text-sm text-slate-200">{d}</span>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ============================== ROADMAP ============================== */}
        <section className="px-5 py-20 sm:py-24" id="roadmap">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <Eyebrow>Roadmap</Eyebrow>
              <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                Six phases from portfolio AI to global markets.
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <div className="mt-14 flex gap-6 overflow-x-auto pb-4 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible lg:grid-cols-6">
                {roadmap.map((p) => (
                  <div key={p.phase} className="flex w-40 flex-shrink-0 flex-col items-center text-center sm:w-auto">
                    <IconBadge icon={p.icon} tone="cyan" size="lg" />
                    <div className="mt-4 text-xs font-bold uppercase tracking-wide text-cyan-300">
                      {p.phase}
                    </div>
                    <div className="mt-1 text-sm font-black text-white">{p.title}</div>
                  </div>
                ))}
              </div>
              <p className="mt-10 text-sm italic text-slate-500">
                Each phase ships independently and is validated with real users before
                scaling to the next.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ============================== CLOSING / ABOUT ============================== */}
        <section className="relative px-5 py-24 sm:py-28">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.14),transparent_45%)]" />
          <div className="relative mx-auto max-w-4xl text-center">
            <Reveal>
              <p className="text-sm font-semibold text-slate-500">
                <span className="text-cyan-300">NearWe</span> Labs — an AI-first
                technology company building intelligent products across fintech,
                location intelligence, automation &amp; enterprise SaaS.
              </p>
              <h2 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl">
                Vestora <span className="text-cyan-300">AI</span>
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-400">
                Let's bring AI-governed, human-approved investing to every Indian
                portfolio.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button
                  onClick={goToDemo}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-9 py-4 text-base font-black text-[#080b13] transition hover:bg-cyan-200"
                >
                  See demo of Vestora AI
                  <ArrowRight className="h-5 w-5" />
                </button>
                <a
                  href="mailto:support@nearwe.in?subject=Vestora%20AI%20Inquiry"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-9 py-4 text-base font-bold text-white transition hover:border-cyan-300/60 hover:bg-white/5"
                >
                  support@nearwe.in
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        <footer className="border-t border-white/10 px-5 py-8 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} NearWe Labs. Vestora AI is a product by NearWe Labs.
        </footer>
      </div>
    </>
  );
}
