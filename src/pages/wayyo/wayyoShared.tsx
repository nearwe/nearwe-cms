import { Link, NavLink } from "react-router-dom";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { ArrowRight, BatteryMedium, Check, Heart, LoaderCircle, Sparkles, Wifi } from "lucide-react";
import { core_services } from "../../utils/api";
import { WAYYO_INSTALLER_URL } from "../../utils/constants";
import { wyStyles } from "./wayyoStyles";

export const MS_STORE_URL = "https://get.microsoft.com/installer/download/9nm8b9qxj0zw?referrer=appbadge";

/* ───────────── Download stats ───────────── */
let wayyoStatsRequest: Promise<number | null> | null = null;
function getWayyoDownloadCount() {
    if (!wayyoStatsRequest) {
        wayyoStatsRequest = core_services.getWayyoDownloadStats()
            .then((stats) => {
                const count = Number(stats?.totalDownloads);
                return Number.isFinite(count) ? count : null;
            })
            .catch(() => null);
    }
    return wayyoStatsRequest;
}

function AppleLogo() {
    return (
        <svg width="16" height="16" viewBox="0 0 384 512" fill="currentColor" aria-hidden="true">
            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
        </svg>
    );
}

/** Windows download (live) + Mac (coming soon), heyclicky-style pills. */
export function DownloadButtons({ showCount = true }: { showCount?: boolean }) {
    const [isLoading, setIsLoading] = useState(false);
    const [downloadCount, setDownloadCount] = useState<number | null>(null);

    useEffect(() => {
        let isMounted = true;
        getWayyoDownloadCount().then((count) => {
            if (isMounted && count !== null) setDownloadCount(count);
        });
        return () => { isMounted = false; };
    }, []);

    const startDownload = () => {
        if (isLoading) return;
        setIsLoading(true);
        window.setTimeout(() => setIsLoading(false), 700);
        core_services.registerWayyoDownloadClick()
            .then((result) => {
                const count = Number(result?.totalDownloads);
                if (Number.isFinite(count)) setDownloadCount(count);
            })
            .catch(() => undefined);
    };

    return (
        <div className="wy-dl-wrap">
            <div className="wy-dl">
                <div className="wy-dl-item">
                    <a className="wy-dl-btn wy-dl-win" href={WAYYO_INSTALLER_URL} onClick={startDownload}>
                        {isLoading ? <LoaderCircle size={17} className="wy-spin" aria-hidden="true" /> : <span className="wy-ms" aria-hidden="true"><i /><i /><i /><i /></span>}
                        {isLoading ? "starting download…" : "download for windows"}
                    </a>
                    <small>free for 5 years · windows 10 or higher</small>
                </div>
                <div className="wy-dl-item">
                    <span className="wy-dl-btn wy-dl-mac" aria-disabled="true" title="Wayyo for Mac is coming soon">
                        <AppleLogo /> download for mac
                    </span>
                    <small>coming soon · macOS in the works</small>
                </div>
            </div>
            {showCount && (
                <p className="wy-dl-note" aria-live="polite">
                    {downloadCount !== null && <><b>{downloadCount.toLocaleString()}</b> downloads so far · </>}
                    prefer the store? <a href={MS_STORE_URL}>get it on microsoft store</a>
                </p>
            )}
        </div>
    );
}

/* ───────────── Mac-style window ───────────── */
export function MacWin({ title, caption, className = "", style, children }: { title?: string; caption?: string; className?: string; style?: CSSProperties; children: ReactNode }) {
    return (
        <figure className={`wy-win ${className}`} style={style}>
            <div className="wy-win-bar"><i /><i /><i />{title && <span>{title}</span>}<b aria-hidden="true">×</b></div>
            <div className="wy-win-body">{children}</div>
            {caption && <figcaption>{caption}</figcaption>}
        </figure>
    );
}

/* ───────────── Shell: nav + footer + styles ───────────── */
function formatTime() {
    return new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function WayyoNav() {
    const [time, setTime] = useState(formatTime);
    useEffect(() => {
        const t = window.setInterval(() => setTime(formatTime()), 20000);
        return () => window.clearInterval(t);
    }, []);
    return (
        <header className="wy-nav">
            <nav className="wy-nav-left" aria-label="Wayyo navigation">
                <Link to="/wayyo" className="wy-nav-brand">wayyo</Link>
                <NavLink to="/wayyo/features">features</NavLink>
                <NavLink to="/wayyo/meetings">ai meetings</NavLink>
                <Link to="/wayyo#pricing">pricing</Link>
                <NavLink to="/wayyo/faq">faq</NavLink>
            </nav>
            <Link to="/wayyo" className="wy-nav-mark" aria-label="Wayyo home"><img src="/logo-bg-trans.png" alt="NearWe Labs" /></Link>
            <div className="wy-nav-right">
                <span className="wy-nav-status" aria-hidden="true"><Wifi size={13} /><BatteryMedium size={16} /><span>{time}</span></span>
                <Link to="/wayyo#download" className="wy-nav-cta">get wayyo</Link>
            </div>
        </header>
    );
}

function WayyoFooter() {
    return (
        <footer className="wy-footer">
            <div className="wy-footer-brand">
                <img src="/logo-bg-trans.png" alt="NearWe Labs" />
                <div><b>wayyo</b><small>your personal ai, for your windows pc.</small></div>
            </div>
            <nav aria-label="Footer">
                <Link to="/wayyo/features">features</Link>
                <Link to="/wayyo/meetings">ai meetings</Link>
                <Link to="/wayyo#pricing">pricing</Link>
                <Link to="/wayyo/faq">faq</Link>
                <Link to="/privacy">privacy</Link>
                <Link to="/">nearwe labs <ArrowRight size={12} /></Link>
            </nav>
            <small className="wy-footer-copy">© {new Date().getFullYear()} NearWe Labs · made in india 🇮🇳</small>
        </footer>
    );
}

export function WayyoShell({ children }: { children: ReactNode }) {
    useEffect(() => {
        const root = document.querySelector<HTMLElement>(".wy");
        if (!root) return;
        const onScroll = () => {
            const d = document.documentElement;
            const max = d.scrollHeight - d.clientHeight;
            root.style.setProperty("--wy-progress", String(max > 0 ? d.scrollTop / max : 0));
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    return (
        <div className="wy">
            <style>{wyStyles}</style>
            <WayyoNav />
            <main>{children}</main>
            <WayyoFooter />
        </div>
    );
}

/** Small page header used by the sub-pages. */
export function PageIntro({ kicker, title, children }: { kicker: string; title: ReactNode; children?: ReactNode }) {
    return (
        <section className="wy-intro">
            <span className="wy-pill">{kicker}</span>
            <h1>{title}</h1>
            {children && <p>{children}</p>}
        </section>
    );
}

export function CtaBand({ title = "make your pc work for you." }: { title?: string }) {
    return (
        <section className="wy-cta">
            <h2>{title}</h2>
            <p>free for 5 years. no card, no catch.</p>
            <DownloadButtons showCount={false} />
        </section>
    );
}

/* ───────────── Love wall (testimonials) ───────────── */
const loveTints = ["#bfe3c9", "#bcd3f2", "#f0c9cd", "#bfe4e4", "#f3d3bf", "#efe2b2", "#d8cdf5"];

const loveNotes = [
    { name: "Piyush Patel", role: "Founder · Indore", text: "expense summary template saved my entire friday. csv in, clean xlsx out. done.", date: "Nov 2, 2026" },
    { name: "Devang Nema", role: "Developer · Bhopal", text: "local ai that actually runs on my laptop. no api key, no subscription. wild.", date: "Oct 28, 2026" },
    { name: "Sanidhya Bajaj", role: "Product Designer", text: "built my morning setup in 5 mins — opens vs code, figma, chrome and pings me when everything is ready ☕", date: "Oct 30, 2026" },
    { name: "Aman Yadav", role: "Content Creator", text: "my downloads folder finally looks like a human lives here 😭", date: "Nov 5, 2026" },
    { name: "Jeesu Jain", role: "Engineering Student", text: "free for 5 years?? someone please check on the nearwe team", date: "Nov 8, 2026" },
    { name: "Yash Bunkar", role: "Automation Nerd", text: "the visual builder is so clean. loops, conditions, retries — zero code. this is the 10x version of my old bat scripts haha", date: "Oct 21, 2026" },
    { name: "Manas Pal", role: "Accountant", text: "duplicate invoices gone in one run. my CA thinks I hired someone.", date: "Oct 25, 2026" },
    { name: "Mahendra Patel", role: "Business Owner", text: "monthly attendance reports now take 2 minutes. no more excel crying.", date: "Nov 1, 2026" },
    { name: "Nayan Jain", role: "Retail Ops", text: "low stock alerts straight from a csv export. small thing, huge relief.", date: "Nov 9, 2026" },
    { name: "Latik Mantri", role: "Consultant", text: "works fully offline. took it on a flight and kept automating ✈️", date: "Oct 19, 2026" },
    { name: "Aniket Abnave", role: "Engineer · Pune", text: "replaced 4 random scripts with one wayyo workflow. never going back.", date: "Nov 11, 2026" },
    { name: "Pushkar Soni", role: "Freelancer", text: "a document library with version history, on my own pc? yes please 🙌", date: "Nov 6, 2026" },
    { name: "Rishi Soni", role: "Team Lead", text: "can not wait for ai meetings. unlimited time + auto MoMs is going to be crazy 👀", date: "Nov 12, 2026" },
];

const loveWords = ["they use it everyday", "they automate everything", "they never go back"];

function properName(name: string) {
    return name.trim().split(/\s+/).map((p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()).join(" ");
}

function initialsOf(name: string) {
    return name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();
}

/** "12,345 downloads and counting. join them" — live count from the download stats API. */
function CountBar() {
    const [target, setTarget] = useState<number | null>(null);
    const [shown, setShown] = useState(0);

    useEffect(() => {
        let alive = true;
        getWayyoDownloadCount().then((c) => { if (alive && c !== null) setTarget(c); });
        return () => { alive = false; };
    }, []);

    // Count up once the live number arrives.
    useEffect(() => {
        if (target === null) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setShown(target); return; }
        let raf = 0;
        const start = performance.now();
        const step = (now: number) => {
            const t = Math.min(1, (now - start) / 1400);
            setShown(Math.round(target * (1 - Math.pow(1 - t, 3))));
            if (t < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf);
    }, [target]);

    return (
        <div className="wy-countbar">
            <img src="/assets/wayyo-product-box.png" alt="" aria-hidden="true" />
            <p aria-live="polite">
                {target === null
                    ? <>people are automating their pcs with wayyo.</>
                    : <><b>{shown.toLocaleString("en-IN")}+</b> downloads and counting.</>}{" "}
                <Link to="/wayyo#download">join them</Link>
            </p>
        </div>
    );
}

export function LoveWall() {
    const [expanded, setExpanded] = useState(false);
    const [word, setWord] = useState(0);
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const t = window.setInterval(() => setWord((w) => (w + 1) % loveWords.length), 3200);
        return () => window.clearInterval(t);
    }, []);
    const phrase = loveWords[word];
    return (
        <section className="wy-love" id="love" aria-label="What people say about Wayyo">
            <span className="wy-pill">feedback</span>
            <div className="wy-love-head">
                <span className="wy-love-ghost wy-love-ghost-l" aria-hidden="true">{phrase}</span>
                <h2 key={phrase} className="wy-love-main">{phrase}</h2>
                <span className="wy-love-ghost wy-love-ghost-r" aria-hidden="true">{phrase}</span>
            </div>
            <div className={`wy-love-grid${expanded ? " is-open" : ""}`}>
                {loveNotes.map((n, i) => (
                    <article className="wy-note" key={n.name} style={{ "--tint": loveTints[i % loveTints.length] } as CSSProperties}>
                        <div className="wy-note-bar"><i /><i /><i /><b>w</b></div>
                        <div className="wy-note-body">
                            <div className="wy-note-who">
                                <span className="wy-note-avatar" style={{ background: loveTints[(i + 3) % loveTints.length] }}>{initialsOf(n.name)}</span>
                                <div><b>{properName(n.name)}</b><small>{n.role}</small></div>
                                <span className="wy-note-heart"><Heart size={14} /></span>
                            </div>
                            <p>{n.text}</p>
                            <time>{n.date}</time>
                        </div>
                    </article>
                ))}
            </div>
            <CountBar />
            {!expanded && <button type="button" className="wy-love-more" onClick={() => setExpanded(true)}>see more love <ArrowRight size={14} /></button>}
        </section>
    );
}

/* ───────────── Pricing ───────────── */
const freeIncludes = [
    "Visual workflow builder — loops, conditions, retries",
    "Local AI (Qwen3) — no cloud subscription",
    "24 templates across 11 industries",
    "Document library with version history",
    "CSV / XLSX reporting",
    "Schedules, file & app triggers",
];
const proIncludes = [
    "Everything in Wayyo — fully licensed",
    "AI Meetings — unlimited call time",
    "One-click recording & live transcripts",
    "AI Minutes of Meeting on the fly",
    "All advanced actions & integrations",
    "Priority support from NearWe Labs",
];

export function Pricing() {
    return (
        <section className="wy-pricing wy-sky" id="pricing">
            <div className="wy-pricing-head">
                <span className="wy-pill">pricing</span>
                <h2>wayyo, your way</h2>
                <p>everything free today. the full license is on its way.</p>
            </div>
            <div className="wy-plans">
                <article className="wy-plan wy-plan-free">
                    <div className="wy-plan-bar"><i /><i /><i /></div>
                    <span className="wy-plan-badge">available now</span>
                    <div className="wy-plan-in">
                        <h3>free</h3>
                        <p className="wy-plan-sub">everything wayyo can do today.</p>
                        <small className="wy-plan-best">best for getting started</small>
                        <div className="wy-plan-price"><b>₹0</b><small>free license for 5 years, no card needed</small></div>
                        <Link className="wy-plan-cta" to="/wayyo#download">get wayyo free</Link>
                        <div className="wy-plan-list">
                            <span>includes</span>
                            <ul>{freeIncludes.map((f) => <li key={f}><Check size={11} strokeWidth={3} /> {f}</li>)}</ul>
                        </div>
                    </div>
                </article>
                <article className="wy-plan wy-plan-pro">
                    <div className="wy-plan-bar"><i /><i /><i /></div>
                    <span className="wy-plan-badge"><Sparkles size={10} /> coming soon</span>
                    <div className="wy-plan-in">
                        <h3>full license</h3>
                        <p className="wy-plan-sub">the complete wayyo, ai meetings included.</p>
                        <small className="wy-plan-best">best for teams & power users</small>
                        <div className="wy-plan-price"><b>₹19,999</b><small>≈ US$229</small></div>
                        <span className="wy-plan-cta is-disabled" aria-disabled="true">coming soon</span>
                        <div className="wy-plan-list">
                            <span>includes</span>
                            <ul>{proIncludes.map((f) => <li key={f}><Check size={11} strokeWidth={3} /> {f}</li>)}</ul>
                        </div>
                    </div>
                </article>
            </div>
        </section>
    );
}
