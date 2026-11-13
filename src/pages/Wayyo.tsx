import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { ArrowRight, CalendarClock, FileSpreadsheet, FolderSync, Laptop, LayoutTemplate, Video, Workflow } from "lucide-react";
import { CtaBand, DownloadButtons, LoveWall, MacWin, Pricing, WayyoShell } from "./wayyo/wayyoShared";

const SEO_DESCRIPTION = "Meet Wayyo, your personal AI automation tool for Windows. Build visual workflows, use local AI, organise documents, and create reports. Free for 5 years.";

/** Lets visitors drag the floating hero windows around (desktop only). */
function useDraggableFloats() {
    useEffect(() => {
        const items = Array.from(document.querySelectorAll<HTMLElement>(".wy-float"));
        const cleanups = items.map((el) => {
            let startX = 0, startY = 0, baseX = 0, baseY = 0, dragging = false;
            const down = (e: PointerEvent) => {
                if (e.button !== 0) return;
                dragging = true;
                startX = e.clientX; startY = e.clientY;
                baseX = Number(el.dataset.dx || 0); baseY = Number(el.dataset.dy || 0);
                el.setPointerCapture(e.pointerId);
                el.classList.add("is-dragging");
            };
            const move = (e: PointerEvent) => {
                if (!dragging) return;
                const dx = baseX + e.clientX - startX, dy = baseY + e.clientY - startY;
                el.dataset.dx = String(dx); el.dataset.dy = String(dy);
                el.style.translate = `${dx}px ${dy}px`;
            };
            const up = () => { dragging = false; el.classList.remove("is-dragging"); };
            el.addEventListener("pointerdown", down);
            el.addEventListener("pointermove", move);
            el.addEventListener("pointerup", up);
            el.addEventListener("pointercancel", up);
            return () => {
                el.removeEventListener("pointerdown", down);
                el.removeEventListener("pointermove", move);
                el.removeEventListener("pointerup", up);
                el.removeEventListener("pointercancel", up);
            };
        });
        return () => cleanups.forEach((c) => c());
    }, []);
}

/** Scroll to #pricing / #download when the URL hash says so. */
function useHashScroll() {
    const { hash } = useLocation();
    useEffect(() => {
        if (!hash) return;
        const t = window.setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
        return () => window.clearTimeout(t);
    }, [hash]);
}

function Folder({ label }: { label?: string }) {
    return <span className="wy-folder">{label && <small>{label}</small>}</span>;
}

function HeroFloats() {
    return (
        <div className="wy-floats" aria-hidden="true">
            <div className="wy-float f-flow">
                <MacWin title="workflow" caption="morning-setup.mov">
                    <div className="wy-mini-flow">
                        <span>⏰ 9:00 am</span><span>open vs code + chrome</span><span>prepare folders</span><span className="ok">notify ✓</span>
                    </div>
                </MacWin>
            </div>
            <div className="wy-float f-tag-blue"><div className="wy-nametag"><small>HELLO my name is</small><b>wayyo</b></div></div>
            <div className="wy-float f-ai">
                <MacWin title="local ai" caption="local-ai-chat.mov">
                    <div className="wy-mini-chat">
                        <p className="me">summarise this invoice pdf</p>
                        <p className="ai">3 line items · total ₹48,200 · due 20 nov ✓</p>
                        <small>runs on your pc · no cloud</small>
                    </div>
                </MacWin>
            </div>
            <span className="wy-float wy-kao f-k1">^ ω ^</span>
            <span className="wy-float wy-kao f-k2">¯\_(ツ)_/¯</span>
            <span className="wy-float wy-kao f-k3">(¬_¬)</span>
            <span className="wy-float wy-kao f-k4">{"{ ^-^ }"}</span>
            <span className="wy-float wy-orb f-orb" />
            <div className="wy-float f-folder1"><Folder label="invoices" /></div>
            <div className="wy-float f-folder2"><Folder label="reports" /></div>
            <div className="wy-float f-report">
                <MacWin title="report.xlsx" caption="expense-summary.xlsx">
                    <div className="wy-mini-table">
                        {([["travel", 82], ["software", 64], ["office", 41], ["food", 27]] as const).map(([k, v]) => (
                            <div key={k}><span>{k}</span><i style={{ width: `${v}%` }} /><b>₹{(v * 310).toLocaleString("en-IN")}</b></div>
                        ))}
                    </div>
                </MacWin>
            </div>
            <div className="wy-float f-tag-red"><div className="wy-nametag red"><small>HELLO my name is</small><b>wayyo</b></div></div>
            <div className="wy-float f-files">
                <MacWin title="downloads" caption="downloads-sorted.mov">
                    <div className="wy-mini-files">
                        {["pdf", "img", "zip", "xlsx", "docs", "misc"].map((f) => <span key={f}><Folder />{f}</span>)}
                    </div>
                </MacWin>
            </div>
            <div className="wy-float f-meet">
                <MacWin title="meeting" caption="ai-meetings-soon.mov">
                    <div className="wy-mini-meet">
                        <div>{["AK", "PS", "RM", "SJ"].map((x, i) => <span key={x} className={i === 0 ? "on" : undefined}>{x}</span>)}</div>
                        <small>● rec · auto MoM · coming soon</small>
                    </div>
                </MacWin>
            </div>
            <div className="wy-float f-box"><img src="/assets/wayyo-product-box.png" alt="" draggable={false} /></div>
        </div>
    );
}

const workflows = [
    { name: "morning setup", when: "every weekday · 9:00 am", steps: "open apps → prepare files → notify" },
    { name: "downloads organizer", when: "when a new file lands", steps: "sort by type → move into folders" },
    { name: "expense summary", when: "1st of every month", steps: "read csv → group → export xlsx" },
];

function DashboardMock() {
    const [active, setActive] = useState(0);
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const t = window.setInterval(() => setActive((a) => (a + 1) % workflows.length), 2400);
        return () => window.clearInterval(t);
    }, []);
    return (
        <div className="wy-dash">
            <aside>
                <b><img src="/logo-bg-trans.png" alt="NearWe Labs" /> wayyo</b>
                {["home", "visual builder", "templates", "schedules", "documents", "local ai", "reports"].map((x, i) => <span key={x} className={i === 0 ? "on" : undefined}>{x}</span>)}
                <small>● local workspace</small>
            </aside>
            <div className="wy-dash-main">
                <div className="wy-dash-hello"><small>good morning 👋</small><h3>3 workflows ready to run</h3></div>
                <div className="wy-dash-stats">
                    <div><small>visual builder</small><b>build</b></div>
                    <div><small>local ai</small><b>review</b></div>
                    <div><small>reports</small><b>export</b></div>
                </div>
                <div className="wy-dash-list">
                    {workflows.map((w, i) => (
                        <div key={w.name} className={i === active ? "is-running" : undefined}>
                            <span className="dot" />
                            <div><b>{w.name}</b><small>{w.when}</small><code>{w.steps}</code></div>
                            <em>{i === active ? "running…" : "ready"}</em>
                        </div>
                    ))}
                </div>
                <p className="wy-dash-note">illustrative preview</p>
            </div>
        </div>
    );
}

const quickFeatures = [
    { icon: Workflow, title: "visual workflows", line: "drag, connect, run. no code needed." },
    { icon: Laptop, title: "local ai", line: "an ai buddy that runs fully on your pc." },
    { icon: LayoutTemplate, title: "24 templates", line: "expenses, invoices, attendance — ready to go." },
    { icon: FileSpreadsheet, title: "csv → xlsx reports", line: "turn messy exports into clean reports." },
    { icon: FolderSync, title: "document library", line: "search, tag and version every file." },
    { icon: CalendarClock, title: "schedules & triggers", line: "runs on time, or the moment a file lands." },
];

export default function Wayyo() {
    useDraggableFloats();
    useHashScroll();
    return (
        <WayyoShell>
            <Helmet>
                <meta name="robots" content="index, follow, max-image-preview:large" />
                <meta name="application-name" content="Wayyo" />
                <meta name="theme-color" content="#3559C7" />
                <link rel="icon" type="image/png" href="/wayyo-icon-cobalt.png" />
                <meta property="og:image" content="https://nearwe.in/wayyo-og-cobalt.png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content="Wayyo, your personal AI automation tool for Windows" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:image" content="https://nearwe.in/wayyo-og-cobalt.png" />
                <script type="application/ld+json">{JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    name: "Wayyo",
                    url: "https://nearwe.in/wayyo",
                    description: SEO_DESCRIPTION,
                    applicationCategory: "UtilitiesApplication",
                    operatingSystem: "Windows 10 and newer, x64",
                    offers: { "@type": "Offer", price: "0", priceCurrency: "INR", description: "FREE License for the Next 5 Years", url: "https://nearwe.in/wayyo" },
                })}</script>
            </Helmet>

            <section className="wy-hero" id="download">
                <HeroFloats />
                <div className="wy-hero-center">
                    <h1>wayyo</h1>
                    <p>your personal ai that puts your windows pc on autopilot</p>
                    <DownloadButtons />
                </div>
            </section>

            <section className="wy-showcase">
                <MacWin title="wayyo.exe" caption="wayyo-dashboard.png" className="wy-win-hero">
                    <DashboardMock />
                </MacWin>
            </section>

            <section className="wy-quick">
                <div className="wy-quick-head">
                    <span className="wy-pill">features</span>
                    <h2>small tasks. done for you.</h2>
                </div>
                <div className="wy-quick-grid">
                    {quickFeatures.map(({ icon: Icon, title, line }) => (
                        <Link to="/wayyo/features" key={title} className="wy-quick-card">
                            <span><Icon size={18} /></span>
                            <div><b>{title}</b><p>{line}</p></div>
                        </Link>
                    ))}
                </div>
                <div className="wy-quick-more">
                    <Link to="/wayyo/features">see every feature <ArrowRight size={14} /></Link>
                    <Link to="/wayyo/meetings"><Video size={14} /> ai meetings — coming soon <ArrowRight size={14} /></Link>
                </div>
            </section>

            <LoveWall />
            <Pricing />
            <CtaBand />
        </WayyoShell>
    );
}
