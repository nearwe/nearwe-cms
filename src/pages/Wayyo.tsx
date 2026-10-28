import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { ArrowDownToLine, ArrowRight, CalendarClock, Check, CircleHelp, FileCheck2, FileText, FolderSync, GitBranch, Infinity as InfinityIcon, Languages, Laptop, LoaderCircle, LockKeyhole, Mic, Sparkles, Video, Workflow } from "lucide-react";
import { core_services } from "../utils/api";
import { WAYYO_INSTALLER_URL } from "../utils/constants";
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

/** UI effects: scroll progress, card spotlight, hero dashboard "running" loop. */
function useWayyoFx() {
    useEffect(() => {
        const root = document.querySelector<HTMLElement>(".wayyo-page");
        if (!root) return;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const onScroll = () => {
            const d = document.documentElement;
            const max = d.scrollHeight - d.clientHeight;
            root.style.setProperty("--wy-progress", String(max > 0 ? d.scrollTop / max : 0));
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });

        const onMove = (e: PointerEvent) => {
            const card = (e.target as HTMLElement).closest<HTMLElement>(".wayyo-feature");
            if (!card) return;
            const r = card.getBoundingClientRect();
            card.style.setProperty("--mx", `${e.clientX - r.left}px`);
            card.style.setProperty("--my", `${e.clientY - r.top}px`);
        };
        root.addEventListener("pointermove", onMove);

        const rows = Array.from(root.querySelectorAll<HTMLElement>(".wayyo-workflow"));
        const acts = Array.from(root.querySelectorAll<HTMLElement>(".wayyo-activity > div"));
        let i = 0;
        const tick = () => {
            rows.forEach((r, k) => r.classList.toggle("is-running", k === i));
            acts.forEach((a, k) => a.classList.toggle("is-running", k === i));
            i = (i + 1) % Math.max(rows.length, 1);
        };
        tick();
        const timer = reduce ? undefined : window.setInterval(tick, 2400);

        return () => {
            window.removeEventListener("scroll", onScroll);
            root.removeEventListener("pointermove", onMove);
            if (timer) window.clearInterval(timer);
        };
    }, []);
}

const capabilities = [
    { icon: Workflow, title: "Build it visually. Make it work your way.", description: "Connect triggers, actions, conditions, loops and variables. Configure steps, save workflows and review results. Delete steps with a right-click or the Delete key; undo and redo as you refine." },
    { icon: Laptop, title: "An AI assistant that works on your computer.", description: "Draft workflows, ask automation questions, summarise text, suggest metadata, extract information and explain errors. Bundled Qwen3 0.6B runs locally. Choose tasks or example prompts, process or cancel, then review suggestions." },
    { icon: GitBranch, title: "Start with a template. Make it your own.", description: "Choose from 24 templates across 11 industries. Select an input CSV and output XLSX location; required inputs and columns are checked. Workflows open paused in the builder for review and manual testing." },
    { icon: FileCheck2, title: "From spreadsheet exports to useful reports.", description: "Preview CSV and XLSX data. Filter, transform, group and aggregate it into reports, then save your reporting workflow to reuse with the next local export." },
    { icon: FolderSync, title: "Keep your documents organised and close at hand.", description: "Import, search, tag and preview files in your local document library. Keep version history, restore earlier versions, create backups and watch selected folders." },
    { icon: CalendarClock, title: "Put everyday Windows tasks in motion.", description: "Move files, launch apps, add delays and notifications. Use schedules and supported file or application triggers, with conditions, variables, loops, retries, timeouts and cancellation." },
];

const useCases = [
    { title: "See where expenses go", detail: "Summarise expenses by category from a CSV export." },
    { title: "Clean invoice records", detail: "Remove duplicate invoice records from a local export before reporting." },
    { title: "Prepare attendance and timesheets", detail: "Turn attendance or project timesheet exports into reviewable reports." },
    { title: "Spot low stock", detail: "Flag inventory records that fall below your chosen stock threshold." },
    { title: "Keep files in order", detail: "Organise files with rules and monitor selected folders for changes." },
    { title: "Get the gist of a document", detail: "Summarise document text with local AI, then review the result." },
    { title: "Open your daily workspace", detail: "Launch your apps, prepare folders and show a notification when the sequence finishes." },
];

const meetingPerks = [
    { icon: InfinityIcon, title: "Unlimited meeting time", detail: "No 40-minute cut-offs. Talk as long as the conversation needs." },
    { icon: Video, title: "One-click recording", detail: "Record every call in HD and keep it ready to replay or share." },
    { icon: Languages, title: "Transcripts in any language", detail: "AI transcribes speech live—Hindi, English, Marathi, Spanish and many more." },
    { icon: Sparkles, title: "MoMs on the fly", detail: "Get Minutes of Meeting, key decisions and action items the moment you hang up." },
];

function MeetingPreview() {
    return (
        <div className="wayyo-meet-window" aria-label="Illustrative Wayyo meeting preview">
            <div className="wayyo-meet-top"><span className="wayyo-meet-rec"><i /> REC 01:12:48</span><b>Weekly Product Sync</b><span className="wayyo-meet-limit"><InfinityIcon size={12} /> No time limit</span></div>
            <div className="wayyo-meet-body">
                <div className="wayyo-meet-tiles">{[["AK", "Aniket"], ["PS", "Priya"], ["RM", "Rahul"], ["SJ", "Sara"]].map(([initials, name], i) => <div key={name} className={i === 0 ? "speaking" : undefined}><span>{initials}</span><small><Mic size={9} /> {name}</small></div>)}</div>
                <aside className="wayyo-meet-side">
                    <div className="wayyo-meet-transcript"><b><Languages size={12} /> Live transcript</b>
                        <p><em>Aniket · EN</em>Let's lock the launch date for Friday.</p>
                        <p><em>Priya · HI</em>Haan, design final ho gaya hai.</p>
                        <p><em>Sara · ES</em>Enviaré el informe mañana.</p>
                    </div>
                    <div className="wayyo-meet-mom"><b><FileText size={12} /> AI Minutes of Meeting</b>
                        <ul><li><Check size={10} /> Launch date: Friday</li><li><Check size={10} /> Design signed off</li><li><Check size={10} /> Sara → send report</li></ul>
                    </div>
                </aside>
            </div>
            <p className="wayyo-preview-note">Illustrative preview</p>
        </div>
    );
}

const questions = [
    { question: "Does Wayyo include video meetings?", answer: "Yes. Host video calls with unlimited meeting time, record them, get AI transcripts in your preferred language and receive Minutes of Meeting with action items automatically—free with your Wayyo license." },
    { question: "What is Wayyo?", answer: "Wayyo is your personal AI automation tool for Windows. Build visual workflows, get help from local AI, organise documents and turn spreadsheet exports into reports." },
    { question: "Is Wayyo free?", answer: "Wayyo offers a FREE License for the Next 5 Years. Get a 5-year Wayyo license for free and start building automations around the way you work." },
    { question: "What does the free 5-year license offer mean?", answer: "The offer is a Wayyo license for 5 years at no cost. Use Claim Now & Download Wayyo to get the Windows installer." },
    { question: "Does local AI require a cloud AI subscription?", answer: "No. The bundled Qwen3 0.6B model runs on your device without a cloud AI subscription. Review AI suggestions before using them. Advanced integrations may have their own software or service requirements." },
    { question: "Can Wayyo work offline?", answer: "Yes. Core local workflows and local AI operate on your device. Website automation and network-using scripts may require internet access and your approval." },
    { question: "Do I need coding skills?", answer: "You can build workflows visually without writing code. JavaScript, Python and reusable subworkflows are available for more advanced tasks." },
    { question: "What can templates automate?", answer: "The 24 templates across 11 industries cover expense summaries, invoice cleanup, attendance, sales reporting, inventory exceptions and project timesheets. They process local CSV exports into XLSX reports, rather than connecting to external business systems. Inputs are checked, and workflows open paused for review and manual testing." },
    { question: "Which Windows versions are supported?", answer: "Wayyo runs on Windows 10 and newer, x64." },
    { question: "Can workflows run while the PC is asleep or shut down?", answer: "Local workflows need your PC to be awake and running. They cannot execute while it is shut down, and sleep interrupts execution." },
    { question: "Do advanced actions require other software?", answer: "Some do. Edge browser automation requires Edge; Python actions require Python; supported Office actions require compatible Office desktop applications. Windows UI Automation depends on the target app and permissions, so support varies by application." },
];

function DownloadButton() {
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

    return <div className="wayyo-download-wrap">
        <a className="wayyo-download" href={WAYYO_INSTALLER_URL} onClick={startDownload}>
            {isLoading ? <LoaderCircle size={18} className="animate-spin" aria-hidden="true" /> : <ArrowDownToLine size={18} />}
            {isLoading ? "Starting download..." : "Claim Now & Download Wayyo"}
        </a>
        <div className="wayyo-download-social-proof" aria-live="polite">
            <b>{downloadCount === null ? "Make Wayyo work your way." : `${downloadCount.toLocaleString()} download ${downloadCount === 1 ? "click" : "clicks"} so far.`}</b>
            <span>For Windows 10 and newer · x64</span>
        </div>
    </div>;
}

function ReleaseDetails() {
    return <details className="wayyo-version-details">
        <summary>Windows x64 installer · Features and requirements</summary>
        <div className="wayyo-version-content">
            <p><b>Download:</b> Windows x64 installer<br /><b>Platform:</b> Windows 10 and newer · x64</p>
            <h3>What’s included</h3>
            <ul>
                <li>Visual workflow builder with conditions, loops, variables, retries, timeouts, and cancellation</li>
                <li>Local AI, 24 industry templates, document management and spreadsheet reporting</li>
                <li>Local SQLite storage for workflows and execution history</li>
                <li>File, CSV, Excel, JSON, and report actions</li>
                <li>Schedules, file and application triggers, and local notifications</li>
                <li>JavaScript actions for advanced workflows</li>
                <li>Advanced actions for Edge browser automation, Python, Windows UI Automation, Office, and reusable workflows</li>
            </ul>
            <h3>Privacy and connectivity</h3>
            <p>Workflows, settings and run history use local SQLite storage. Core local workflows work offline. Website automation and network-using scripts may require internet access and your approval.</p>
            <h3>Requirements</h3>
            <p>Windows 10 or newer, x64. Edge, Python, and compatible Office desktop applications are needed only for their respective advanced actions.</p>
            <h3>Review before running</h3>
            <p>Review AI suggestions and manually test template workflows. Supported actions depend on the target application, Windows permissions and your computer being awake.</p>
        </div>
    </details>;
}

function DashboardPreview() {
    return (
        <div className="wayyo-window" aria-label="Illustrative Wayyo dashboard preview">
            <div className="wayyo-window-top"><div className="wayyo-wordmark"><span className="wayyo-mark">w</span><b>wayyo</b><i>Illustrative preview</i></div><div className="wayyo-search">Workflows, documents and local AI</div><div className="wayyo-profile">Windows</div></div>
            <div className="wayyo-window-body">
                <aside className="wayyo-sidebar">{["⌂  Home", "◇  Visual Builder", "▦  Templates", "◷  Schedules", "⌁  Activity", "Documents", "Local AI", "Reporting", "☷  Settings"].map((item, index) => <div className={index === 0 ? "active" : ""} key={item}>{item}</div>)}<small>Local workspace<br />Review your runs<br />SQLite storage</small></aside>
                <div className="wayyo-dash-content">
                    <div className="wayyo-dash-hello"><small>ILLUSTRATIVE WORKSPACE · WINDOWS</small><h3>Your everyday workspace</h3><p>Build workflows, organise documents and get help from local AI.</p></div>
                    <div className="wayyo-stat-row"><div><small>Visual Builder</small><b>Build</b><span>Connect steps</span></div><div><small>Local AI</small><b>Review</b><span>AI suggestions</span></div><div><small>Reporting</small><b>Export</b><span>CSV to XLSX</span></div></div>
                    <div className="wayyo-workspace"><section className="wayyo-workflows"><div className="wayyo-workflow-heading"><b>Your workflows</b><span>Example workflows</span></div>
                        {[["▣", "Daily Project Setup", "Scheduled", "Every weekday at 9:00 AM", "Open apps → Prepare files → Notify"], ["▧", "Downloads Organizer", "File Watcher", "When a new file is added", "Sort extension → Move archive"], ["▦", "Expense Summary", "Template", "Review before running", "Read CSV → Group categories → Export XLSX"]].map(([icon, name, tag, when, steps]) => <div className="wayyo-workflow" key={name}><span className="wayyo-flow-icon">{icon}</span><div><b>{name}</b><label>{tag}</label><small>◷ {when}</small><p>{steps}</p></div><span className="wayyo-run">Example</span></div>)}
                    </section><aside className="wayyo-activity"><b>◴ Example activity</b>{["Daily Project Setup", "Downloads Organizer", "Expense Summary"].map((item) => <div key={item}><b>{item}</b><small>Sample result · illustrative</small></div>)}</aside></div>
                    <div className="wayyo-preview-note">Illustrative preview · Sample workflows and activity</div>
                </div>
            </div>
        </div>
    );
}

export default function Wayyo() {
    useWayyoFx();
    return (
        <div className="wayyo-page">
            <style>{wayyoStyles + wayyoEnhanceStyles}</style>
            <Helmet>
                <title>Wayyo | Your Personal AI Automation Tool for Windows</title>
                <meta name="description" content="Meet Wayyo, your personal AI automation tool for Windows. Build visual workflows, use local AI, organise documents, and create reports. Claim a free 5-year license." />
                <meta name="robots" content="index, follow, max-image-preview:large" />
                <meta name="application-name" content="Wayyo" />
                <meta name="apple-mobile-web-app-title" content="Wayyo" />
                <meta name="theme-color" content="#3559C7" />
                <link rel="canonical" href="https://nearwe.in/wayyo" />
                <link rel="icon" type="image/png" href="/wayyo-icon-cobalt.png" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Wayyo" />
                <meta property="og:title" content="Wayyo | Your Personal AI Automation Tool for Windows" />
                <meta property="og:description" content="Meet Wayyo, your personal AI automation tool for Windows. Build visual workflows, use local AI, organise documents, and create reports. Claim a free 5-year license." />
                <meta property="og:url" content="https://nearwe.in/wayyo" />
                <meta property="og:image" content="https://nearwe.in/wayyo-og-cobalt.png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content="Wayyo, your personal AI automation tool for Windows" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Wayyo | Your Personal AI Automation Tool for Windows" />
                <meta name="twitter:description" content="Meet Wayyo, your personal AI automation tool for Windows. Build visual workflows, use local AI, organise documents, and create reports. Claim a free 5-year license." />
                <meta name="twitter:image" content="https://nearwe.in/wayyo-og-cobalt.png" />
                <script type="application/ld+json">{JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    name: "Wayyo",
                    url: "https://nearwe.in/wayyo",
                    description: "Meet Wayyo, your personal AI automation tool for Windows. Build visual workflows, use local AI, organise documents, and create reports. Claim a free 5-year license.",
                    applicationCategory: "UtilitiesApplication",
                    operatingSystem: "Windows 10 and newer, x64",
                    offers: { "@type": "Offer", price: "0", priceCurrency: "INR", description: "FREE License for the Next 5 Years", url: "https://nearwe.in/wayyo" },
                })}</script>
                <script type="application/ld+json">{JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    mainEntity: questions.map(({ question, answer }) => ({
                        "@type": "Question",
                        name: question,
                        acceptedAnswer: { "@type": "Answer", text: answer },
                    })),
                })}</script>
            </Helmet>
            <header className="wayyo-header"><Link to="/wayyo" className="wayyo-brand"><img className="wayyo-nearwe-logo" src="/logo-bg-trans.png" alt="NearWe Labs" /><span>wayyo<small>BY NEARWE LABS</small></span></Link><nav aria-label="Wayyo navigation"><a href="#features">Features</a><a href="#meetings">AI Meetings</a><a href="#use-cases">Use cases</a><a href="#faq">FAQ</a><Link to="/">NearWe Labs <ArrowRight size={14} /></Link></nav><a className="wayyo-header-cta" href="#download">Get Wayyo <ArrowRight size={15} /></a></header>
            <main>
                <section className="wayyo-hero"><div className="wayyo-hero-copy"><div className="wayyo-eyebrow"><span /> WAYYO · YOUR PERSONAL AI AUTOMATION TOOL <span className="wayyo-launch-pill">AVAILABLE NOW</span></div><p className="wayyo-overline">Your Personal AI Automation Tool for Windows</p><h1>Your personal AI.<br /><span>Your everyday work, automated.</span></h1><p className="wayyo-intro">Build visual workflows, get help from local AI, organise documents, and turn spreadsheets into reports—all from your Windows desktop.</p><p className="wayyo-intro"><strong>FREE License for the Next 5 Years</strong><br />Get a 5-year Wayyo license for free. Start building automations around the way you work.</p><div className="wayyo-hero-actions" id="download"><DownloadButton /><a className="wayyo-secondary-cta" href="#features">Explore What Wayyo Can Do <ArrowRight size={17} /></a></div><p id="wayyo-release-note" className="wayyo-release-note">Windows x64 installer · Build workflows around your day.</p><ReleaseDetails /><div className="wayyo-trust"><span><Check size={15} /> Local-first by design</span><span><Laptop size={15} /> Windows desktop</span><span><Workflow size={15} /> Visual workflows</span></div></div><DashboardPreview /></section>
                <section className="wayyo-flow-strip" aria-label="Example workflows"><div><small>DAILY WORKSPACE SETUP</small><b>Schedule <i>→</i> Open apps <i>→</i> Prepare files <i>→</i> Notify</b></div><div><small>DOWNLOADS ORGANIZER</small><b>Detect files <i>→</i> Sort by type <i>→</i> Move into folders</b></div></section>
                <section className="wayyo-section" id="features"><div className="wayyo-section-heading"><span>LESS REPETITION, MORE FLOW</span><h2>Your work, connected.<br />Your next step, simpler.</h2><p>Bring local AI, visual workflows, documents and reporting into one Windows workspace.</p></div><div className="wayyo-feature-grid">{capabilities.map(({ icon: Icon, title, description }, index) => <article className="wayyo-feature" key={title}><span className="wayyo-feature-icon"><Icon size={21} /></span><small>0{index + 1}</small><h3>{title}</h3><p>{description}</p></article>)}</div></section>
                <section className="wayyo-meet-section" id="meetings"><div className="wayyo-meet-inner"><div className="wayyo-meet-copy"><span className="wayyo-meet-badge"><Sparkles size={12} /> NEW · AI MEETINGS · 100% FREE</span><h2>Meet without limits.<br /><span>Let AI take the notes.</span></h2><p>Video calls with unlimited time, one-click recording, AI transcripts in any language and Minutes of Meeting generated on the fly. No paid plans, no time caps, no more scribbling notes.</p><div className="wayyo-meet-perks">{meetingPerks.map(({ icon: Icon, title, detail }) => <article key={title}><span><Icon size={18} /></span><div><h3>{title}</h3><p>{detail}</p></div></article>)}</div><div className="wayyo-hero-actions"><DownloadButton /><span className="wayyo-meet-free"><Check size={15} /> Free with your 5-year license</span></div></div><MeetingPreview /></div></section>
                <section className="wayyo-use-section" id="use-cases"><div className="wayyo-use-inner"><div className="wayyo-use-heading"><span>MADE FOR THE IN-BETWEEN TASKS</span><h2>Turn everyday inputs into useful outcomes.</h2><p>Start with a local export, a document or a desktop routine. Review the workflow, test it and make it your own.</p></div><div className="wayyo-use-list">{useCases.map((item, index) => <article key={item.title}><span>0{index + 1}</span><div><h3>{item.title}</h3><p>{item.detail}</p></div><ArrowRight size={18} /></article>)}</div></div></section>
                <section className="wayyo-control-section"><div className="wayyo-control-art"><div className="wayyo-control-orbit orbit-one" /><div className="wayyo-control-orbit orbit-two" /><div className="wayyo-control-lock"><LockKeyhole size={34} /></div><span className="control-label label-one">YOUR COMPUTER</span><span className="control-label label-two">YOUR WORKFLOWS</span><span className="control-label label-three">YOUR CONTROL</span></div><div className="wayyo-control-copy"><span>LOCAL BY DESIGN</span><h2>Your device.<br />Your rules.</h2><p>Keep workflows, settings and run history in local SQLite storage. Review execution logs and results to understand what ran and where a step needs attention.</p><ul><li><Check size={16} /> Core local workflows operate offline</li><li><Check size={16} /> Local AI works on your device</li><li><Check size={16} /> Network actions may need internet access and your approval</li></ul><p className="wayyo-caveat">What a workflow can do depends on its selected action, Windows permissions and the state of your computer.</p></div></section>
                <section className="wayyo-audience"><div><span>FOR YOUR KIND OF WORK</span><h2>Made to fit your workflow.</h2></div><div className="wayyo-audience-grid"><article><b>Developers</b><p>Automate local scripts and development setup.</p></article><article><b>Professionals</b><p>Streamline recurring file and reporting tasks.</p></article><article><b>Creators</b><p>Organise assets and supported desktop routines.</p></article><article><b>Power users</b><p>Combine actions into workflows you can reuse.</p></article></div></section>
                <section className="wayyo-download-section"><div className="wayyo-download-copy"><span>YOUR NEXT WORKFLOW STARTS HERE</span><h2>FREE License for the Next 5 Years</h2><p>Get a 5-year Wayyo license for free. Start building automations around the way you work.</p><DownloadButton /></div><div className="wayyo-box-wrap">
  <img
    src="/assets/wayyo-product-box.png"
    alt="Wayyo software box: Personal AI Automation Tool for Windows"
    className="wayyo-box-img"
    width={706}
    height={910}
    loading="lazy"
    decoding="async"
  />
</div></section>
                <section className="wayyo-faq-section" id="faq"><div className="wayyo-faq-title"><CircleHelp size={22} /><span>GOOD TO KNOW</span><h2>Questions, answered.</h2></div><div className="wayyo-faq-list">{questions.map(({ question, answer }) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section>
            </main>
            <footer className="wayyo-footer"><Link to="/wayyo" className="wayyo-brand"><img className="wayyo-nearwe-logo" src="/logo-bg-trans.png" alt="NearWe Labs" /><span>wayyo<small>BY NEARWE LABS</small></span></Link><p>Your personal AI. Your everyday work, automated.</p><Link to="/">A product by NearWe Labs <ArrowRight size={14} /></Link></footer>
        </div>
    );
}

const wayyoStyles = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap');
.wayyo-page{--wy-ink:#211a31;--wy-muted:#686274;--wy-purple:#6741e8;--wy-lilac:#f2edff;--wy-line:#e8e2f1;--wy-green:#168553;background:#fff;color:var(--wy-ink);font-family:'DM Sans',sans-serif;min-height:100vh;overflow:hidden}.wayyo-page *{box-sizing:border-box;letter-spacing:0}.wayyo-page a{color:inherit;text-decoration:none}.wayyo-header{height:76px;padding:0 max(5vw,24px);display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #f1edf5;background:rgba(255,255,255,.94);position:relative;z-index:2}.wayyo-brand{display:flex;align-items:center;gap:10px;font:700 20px 'Space Grotesk',sans-serif}.wayyo-brand>span:last-child{display:grid;line-height:1}.wayyo-brand small{font:700 8px 'DM Sans',sans-serif;letter-spacing:1px;color:#888195;margin-top:5px}.wayyo-mark{width:34px;height:34px;border-radius:10px;background:var(--wy-purple);color:#fff;display:grid;place-items:center;font:700 19px 'Space Grotesk',sans-serif}.wayyo-header nav{display:flex;align-items:center;gap:30px;font-size:13px;color:#575163}.wayyo-header nav a{display:flex;align-items:center;gap:6px}.wayyo-header nav a:hover,.wayyo-footer>a:last-child:hover{color:var(--wy-purple)}.wayyo-header-cta{display:flex;align-items:center;gap:8px;background:var(--wy-purple);color:#fff!important;padding:11px 16px;border-radius:8px;font-size:13px;font-weight:700}.wayyo-hero{max-width:1320px;margin:0 auto;padding:76px 5vw 60px;display:grid;grid-template-columns:minmax(310px,.85fr) minmax(0,1.3fr);gap:50px;align-items:center}.wayyo-hero-copy{padding:12px 0}.wayyo-eyebrow,.wayyo-section-heading>span,.wayyo-use-heading>span,.wayyo-control-copy>span,.wayyo-audience>div:first-child>span,.wayyo-download-copy>span{font-size:10px;font-weight:700;letter-spacing:1px;color:#6b48dc}.wayyo-eyebrow{display:flex;align-items:center;gap:9px}.wayyo-eyebrow>span:first-child{width:7px;height:7px;border-radius:50%;background:#5e39dc}.wayyo-launch-pill{padding:5px 8px;background:#f1edff;border-radius:4px;color:#5a39cb;font-size:9px}.wayyo-overline{font-size:13px;color:#5a5367;margin:31px 0 10px}.wayyo-hero h1,.wayyo-section h2,.wayyo-use-heading h2,.wayyo-control-copy h2,.wayyo-audience h2,.wayyo-download-copy h2,.wayyo-faq-title h2{font:700 clamp(36px,4.2vw,58px)/1.06 'Space Grotesk',sans-serif;letter-spacing:0;margin:0}.wayyo-hero h1 span{color:var(--wy-purple)}.wayyo-intro{font-size:16px;line-height:1.7;color:var(--wy-muted);max-width:540px;margin:20px 0 24px}.wayyo-hero-actions{display:flex;gap:11px;align-items:center;flex-wrap:wrap}.wayyo-download{display:inline-flex;align-items:center;gap:9px;background:var(--wy-purple);color:#fff;border:0;border-radius:7px;padding:14px 17px;font:700 13px 'DM Sans',sans-serif;opacity:.85;cursor:not-allowed}.wayyo-download span{padding:4px 6px;background:#ffffff25;border-radius:3px;font-size:9px;text-transform:uppercase}.wayyo-secondary-cta{display:inline-flex;align-items:center;gap:8px;padding:13px 10px;font-size:13px;font-weight:700;color:#554285!important}.wayyo-release-note{font-size:11px;color:#858090;margin:12px 0 22px}.wayyo-trust{display:flex;gap:17px;flex-wrap:wrap;border-top:1px solid var(--wy-line);padding-top:18px}.wayyo-trust span{display:flex;align-items:center;gap:6px;font-size:10px;color:#5e596a}.wayyo-trust svg{color:var(--wy-purple)}.wayyo-window{border:1px solid #e5deef;border-radius:10px;overflow:hidden;background:#faf8fd;box-shadow:0 25px 65px #40278620;min-width:0;transform:perspective(1400px) rotateY(-2deg)}.wayyo-window-top{height:43px;background:#fff;border-bottom:1px solid #eee9f4;display:flex;align-items:center;justify-content:space-between;padding:0 13px;font-size:9px}.wayyo-wordmark{display:flex;align-items:center;gap:6px}.wayyo-wordmark>i{font-style:normal;color:#168553;font-size:8px;margin-left:3px}.wayyo-wordmark .wayyo-mark{width:20px;height:20px;border-radius:6px;font-size:12px}.wayyo-search{width:43%;padding:7px 9px;border-radius:5px;background:#f7f5fa;color:#6b6576}.wayyo-search kbd{float:right;border:1px solid #e7e3eb;border-radius:3px;padding:1px 3px;font:8px inherit;background:white}.wayyo-profile{font-weight:600}.wayyo-window-body{display:grid;grid-template-columns:115px 1fr;min-height:355px}.wayyo-sidebar{background:#fff;border-right:1px solid #eee9f4;padding:12px 7px;display:flex;flex-direction:column;gap:4px;font-size:9px;color:#575163}.wayyo-sidebar>div{padding:8px 7px;border-radius:5px}.wayyo-sidebar>div.active{background:#eee8ff;color:#5232c5}.wayyo-sidebar small{margin-top:auto;border-top:1px solid #eee9f4;padding:12px 5px 2px;line-height:2;color:#605a6c;font-size:8px}.wayyo-sidebar small:first-line{color:#168553}.wayyo-sidebar small b{float:right}.wayyo-dash-content{padding:14px;min-width:0}.wayyo-dash-hello{position:relative;background:#fff;border:1px solid #eee9f4;border-radius:7px;padding:13px 14px;margin-bottom:10px}.wayyo-dash-hello small{font-size:8px;color:#5634d0;font-weight:700}.wayyo-dash-hello h3{font:700 19px 'Space Grotesk',sans-serif;margin:4px 0}.wayyo-dash-hello p{font-size:9px;color:#6b6576;margin:0;max-width:75%}.wayyo-dash-hello button{position:absolute;right:12px;bottom:12px;border:0;border-radius:5px;padding:7px 9px;background:#6841e8;color:white;font-size:8px}.wayyo-stat-row{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:10px}.wayyo-stat-row>div{background:#fff;border:1px solid #eee9f4;border-radius:7px;padding:9px}.wayyo-stat-row small{display:block;font-size:8px;color:#6b6576;margin-bottom:5px}.wayyo-stat-row b{font:700 17px 'Space Grotesk',sans-serif;display:block}.wayyo-stat-row em{font:9px 'DM Sans',sans-serif;color:#817b8a;font-style:normal}.wayyo-stat-row>div>span{display:block;font-size:7px;color:#6245d3;background:#f2edff;border-radius:9px;padding:3px 5px;margin-top:5px;width:max-content;max-width:100%}.wayyo-workspace{display:grid;grid-template-columns:1.65fr 1fr;gap:8px}.wayyo-workflows,.wayyo-activity{background:#fff;border:1px solid #eee9f4;border-radius:7px;padding:9px;min-width:0}.wayyo-workflow-heading{display:flex;justify-content:space-between;align-items:center;font-size:9px;padding:1px 2px 7px}.wayyo-workflow-heading span{font-size:7px;color:#6043d0;background:#f4efff;padding:4px;border-radius:4px}.wayyo-workflow{display:flex;align-items:flex-start;gap:8px;padding:8px 2px;border-top:1px solid #f0edf4;min-width:0}.wayyo-flow-icon{width:25px;height:25px;flex:none;border-radius:5px;display:grid;place-items:center;color:#6140d2;background:#eee9ff;font-size:12px}.wayyo-workflow>div{min-width:0;flex:1}.wayyo-workflow b{font-size:9px}.wayyo-workflow label{font-size:7px;background:#f2edff;padding:2px 4px;border-radius:3px;margin-left:5px;color:#5940b8}.wayyo-workflow small{display:block;color:#686274;font-size:7px;margin-top:4px}.wayyo-workflow p{font-size:7px;color:#5b36ca;background:#f7f3ff;border-radius:3px;padding:4px;margin:5px 0 0;width:max-content;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.wayyo-run{align-self:center;display:flex;gap:4px;align-items:center;background:#f3edff;padding:6px 7px;color:#5132c1;border-radius:4px;font-size:8px}.wayyo-activity>b{font-size:9px}.wayyo-activity>div{background:#f5f0ff;padding:8px;border-radius:5px;margin-top:7px}.wayyo-activity>div b,.wayyo-activity>div small{display:block;font-size:8px}.wayyo-activity>div small{font-size:7px;color:#168553;margin-top:4px}.wayyo-preview-note{text-align:right;font-size:7px;color:#888195;margin-top:8px}.wayyo-flow-strip{padding:24px max(7vw,24px);background:#f8f6fc;border-block:1px solid #eee9f4;display:flex;justify-content:center;gap:9vw;flex-wrap:wrap}.wayyo-flow-strip>div{display:flex;flex-direction:column;gap:8px}.wayyo-flow-strip small{font-size:9px;color:#786c92;font-weight:700;letter-spacing:1px}.wayyo-flow-strip b{font-size:12px}.wayyo-flow-strip i{color:#7556de;font-style:normal;padding:0 4px}.wayyo-section{max-width:1150px;margin:auto;padding:95px 24px}.wayyo-section-heading{text-align:center;max-width:650px;margin:0 auto 43px}.wayyo-section h2,.wayyo-use-heading h2,.wayyo-control-copy h2,.wayyo-audience h2,.wayyo-download-copy h2,.wayyo-faq-title h2{font-size:clamp(32px,4vw,46px);margin-top:13px}.wayyo-section-heading>p,.wayyo-use-heading>p{font-size:14px;line-height:1.7;color:var(--wy-muted);margin:15px auto 0;max-width:570px}.wayyo-feature-grid{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid var(--wy-line);border-left:1px solid var(--wy-line)}.wayyo-feature{position:relative;padding:26px;border-right:1px solid var(--wy-line);border-bottom:1px solid var(--wy-line);min-height:203px}.wayyo-feature-icon{width:39px;height:39px;border-radius:8px;background:#f1edff;color:#603fe0;display:grid;place-items:center}.wayyo-feature>small{position:absolute;top:34px;right:25px;font-size:10px;color:#a8a1b2}.wayyo-feature h3{font:700 16px 'Space Grotesk',sans-serif;margin:17px 0 8px}.wayyo-feature p,.wayyo-use-list p,.wayyo-audience-grid p{font-size:12px;line-height:1.65;color:var(--wy-muted);margin:0}.wayyo-use-section{background:#f7f5fb;border-block:1px solid #eee9f4;padding:82px 24px}.wayyo-use-inner{max-width:1120px;margin:auto;display:grid;grid-template-columns:.85fr 1.15fr;gap:85px;align-items:start}.wayyo-use-heading{position:sticky;top:30px}.wayyo-use-heading h2{font-size:clamp(32px,3.6vw,43px);line-height:1.1}.wayyo-use-list article{display:grid;grid-template-columns:30px 1fr 18px;align-items:start;gap:14px;padding:21px 0;border-bottom:1px solid #e6e0ed}.wayyo-use-list article:first-child{border-top:1px solid #e6e0ed}.wayyo-use-list article>span{font-size:10px;color:#7458d1;font-weight:700;padding-top:3px}.wayyo-use-list h3{font:700 16px 'Space Grotesk',sans-serif;margin:0 0 5px}.wayyo-use-list article>svg{color:#8a79b9;margin-top:3px}.wayyo-control-section{max-width:1120px;margin:auto;padding:90px 24px;display:grid;grid-template-columns:1fr 1fr;gap:90px;align-items:center}.wayyo-control-art{height:340px;background:#f6f2ff;border-radius:8px;position:relative;display:grid;place-items:center;overflow:hidden}.wayyo-control-orbit{position:absolute;border:1px solid #d8cafa;border-radius:50%;width:260px;height:260px}.orbit-two{width:190px;height:190px;border-style:dashed}.wayyo-control-lock{width:85px;height:85px;border-radius:24px;background:#6945e4;color:white;display:grid;place-items:center;box-shadow:0 12px 30px #6945e455;z-index:1}.control-label{position:absolute;background:#fff;border:1px solid #e7defb;border-radius:4px;padding:7px 9px;font-size:8px;font-weight:700;color:#65558e}.label-one{top:18%;left:14%}.label-two{top:27%;right:11%}.label-three{bottom:16%;left:37%}.wayyo-control-copy h2{font-size:44px}.wayyo-control-copy>p{font-size:13px;line-height:1.75;color:var(--wy-muted)}.wayyo-control-copy ul{list-style:none;padding:0;margin:20px 0}.wayyo-control-copy li{display:flex;gap:9px;align-items:flex-start;margin:12px 0;font-size:12px;color:#4b4657}.wayyo-control-copy li svg{flex:none;color:#6a45de}.wayyo-control-copy .wayyo-caveat{font-size:10px;border-left:2px solid #c3b1fa;padding-left:11px}.wayyo-audience{padding:60px max(7vw,24px);background:#211a31;color:#fff;display:grid;grid-template-columns:.7fr 1.3fr;gap:50px;align-items:center}.wayyo-audience>div:first-child>span{color:#b7a4ff}.wayyo-audience h2{font-size:36px}.wayyo-audience-grid{display:grid;grid-template-columns:1fr 1fr;gap:23px 32px}.wayyo-audience-grid b{font:600 14px 'Space Grotesk',sans-serif}.wayyo-audience-grid p{color:#b8b2c5;margin-top:6px}.wayyo-download-section{max-width:1050px;margin:0 auto;padding:88px 24px;display:grid;grid-template-columns:1.2fr .8fr;gap:70px;align-items:center}.wayyo-download-copy h2{font-size:42px}.wayyo-download-copy>p{font-size:13px;color:var(--wy-muted);line-height:1.65;margin:12px 0 20px}.wayyo-download-copy #wayyo-release-note-bottom{font-size:10px;color:#858090;max-width:470px}.wayyo-release-card{display:flex;gap:14px;background:#f8f6fc;border:1px solid #ebe6f1;border-radius:8px;padding:22px}.wayyo-release-card>svg{flex:none;color:#6741e8}.wayyo-release-card b{font-size:13px}.wayyo-release-card p{font-size:10px;color:var(--wy-muted)}.wayyo-release-card dl{display:grid;grid-template-columns:1fr auto;gap:9px 18px;font-size:10px;margin:17px 0 0}.wayyo-release-card dt{color:#706a7c}.wayyo-release-card dd{margin:0;font-weight:600}.wayyo-faq-section{max-width:930px;margin:auto;padding:20px 24px 90px;display:grid;grid-template-columns:.7fr 1.3fr;gap:60px}.wayyo-faq-title>svg{color:#6841e8}.wayyo-faq-title>span{display:block;color:#6b48dc;font-size:9px;font-weight:700;letter-spacing:1px;margin-top:10px}.wayyo-faq-title h2{font-size:34px}.wayyo-faq-list details{border-bottom:1px solid var(--wy-line);padding:17px 0}.wayyo-faq-list details:first-child{border-top:1px solid var(--wy-line)}.wayyo-faq-list summary{list-style:none;cursor:pointer;font:600 13px 'Space Grotesk',sans-serif;display:flex;justify-content:space-between;gap:15px}.wayyo-faq-list summary::-webkit-details-marker{display:none}.wayyo-faq-list summary span{font-size:19px;color:#6841e8;line-height:1}.wayyo-faq-list details[open] summary span{transform:rotate(45deg)}.wayyo-faq-list details p{font-size:12px;color:var(--wy-muted);line-height:1.7;margin:12px 28px 0 0}.wayyo-footer{min-height:95px;padding:20px max(5vw,24px);border-top:1px solid #eee9f4;display:flex;align-items:center;justify-content:space-between;gap:20px}.wayyo-footer>p{font-size:11px;color:#716b7d}.wayyo-footer>a:last-child{display:flex;align-items:center;gap:6px;font-size:11px;color:#5e576a}
@media(max-width:900px){.wayyo-hero{grid-template-columns:1fr;gap:35px;padding-top:55px}.wayyo-hero-copy{max-width:650px}.wayyo-window{transform:none}.wayyo-window-body{min-height:320px}.wayyo-use-inner{gap:45px}.wayyo-control-section{gap:45px}.wayyo-audience{grid-template-columns:1fr;gap:30px}.wayyo-faq-section{gap:35px}}
@media(max-width:640px){.wayyo-header{height:65px;padding:0 16px}.wayyo-header nav{display:none}.wayyo-header-cta{padding:10px 11px;font-size:11px}.wayyo-hero{padding:44px 16px 38px;gap:28px}.wayyo-hero h1{font-size:39px}.wayyo-intro{font-size:14px}.wayyo-trust{gap:11px}.wayyo-trust span{font-size:9px}.wayyo-window{border-radius:7px}.wayyo-window-top{padding:0 8px}.wayyo-search{width:44%;font-size:7px}.wayyo-profile{font-size:0}.wayyo-window-body{grid-template-columns:74px 1fr;min-height:270px}.wayyo-sidebar{font-size:7px;padding:8px 4px}.wayyo-sidebar>div{padding:7px 4px}.wayyo-sidebar small{font-size:6px}.wayyo-dash-content{padding:8px}.wayyo-dash-hello{padding:9px}.wayyo-dash-hello h3{font-size:14px}.wayyo-dash-hello p{font-size:7px;max-width:100%}.wayyo-dash-hello button{position:static;margin-top:7px;padding:5px;font-size:7px}.wayyo-stat-row{gap:4px}.wayyo-stat-row>div{padding:6px}.wayyo-stat-row small{font-size:6px}.wayyo-stat-row b{font-size:12px}.wayyo-stat-row em{font-size:6px}.wayyo-stat-row>div>span{font-size:6px}.wayyo-workspace{grid-template-columns:1fr}.wayyo-activity{display:none}.wayyo-workflows{padding:6px}.wayyo-workflow-heading{font-size:8px}.wayyo-workflow-heading span{font-size:6px}.wayyo-workflow{gap:5px;padding:6px 1px}.wayyo-flow-icon{width:20px;height:20px}.wayyo-workflow b{font-size:8px}.wayyo-workflow label{font-size:6px}.wayyo-workflow small,.wayyo-workflow p{font-size:6px}.wayyo-run{font-size:7px;padding:5px}.wayyo-flow-strip{justify-content:flex-start;padding:19px 17px;gap:17px}.wayyo-flow-strip>div{min-width:100%}.wayyo-flow-strip b{font-size:10px}.wayyo-section{padding:67px 17px}.wayyo-section-heading{margin-bottom:28px}.wayyo-section h2,.wayyo-use-heading h2{font-size:32px}.wayyo-feature-grid{grid-template-columns:1fr 1fr}.wayyo-feature{padding:17px;min-height:210px}.wayyo-feature h3{font-size:14px}.wayyo-feature p{font-size:11px}.wayyo-feature>small{top:23px;right:15px}.wayyo-use-section{padding:62px 17px}.wayyo-use-inner{grid-template-columns:1fr;gap:28px}.wayyo-use-heading{position:static}.wayyo-use-list article{grid-template-columns:24px 1fr 15px;gap:9px}.wayyo-control-section{padding:62px 17px;grid-template-columns:1fr;gap:31px}.wayyo-control-art{height:260px}.wayyo-control-copy h2{font-size:38px}.wayyo-audience{padding:52px 18px}.wayyo-audience h2{font-size:31px}.wayyo-audience-grid{gap:20px 15px}.wayyo-download-section{padding:62px 17px;grid-template-columns:1fr;gap:25px}.wayyo-download-copy h2{font-size:34px}.wayyo-release-card{padding:16px}.wayyo-faq-section{padding:5px 17px 65px;grid-template-columns:1fr;gap:20px}.wayyo-faq-title h2{font-size:30px}.wayyo-footer{padding:20px 17px;flex-wrap:wrap}.wayyo-footer>p{order:3;width:100%;margin:0}}
@media(prefers-reduced-motion:reduce){.wayyo-page *{scroll-behavior:auto!important}}
.wayyo-page{--wy-deep:#202A40;--wy-ink:var(--wy-deep);--wy-muted:#626E82;--wy-primary:#3559C7;--wy-purple:var(--wy-primary);--wy-light:#EEF2FC;--wy-lilac:var(--wy-light);--wy-line:#D9E1F2}
.wayyo-nearwe-logo{width:58px;height:38px;flex:none;object-fit:contain}
.wayyo-eyebrow,.wayyo-section-heading>span,.wayyo-use-heading>span,.wayyo-control-copy>span,.wayyo-audience>div:first-child>span,.wayyo-download-copy>span,.wayyo-trust svg,.wayyo-secondary-cta,.wayyo-dash-hello small,.wayyo-flow-strip i,.wayyo-use-list article>span,.wayyo-use-list article>svg,.wayyo-faq-title>svg,.wayyo-faq-list summary span{color:var(--wy-primary)}
.wayyo-eyebrow>span:first-child{background:var(--wy-primary)}
.wayyo-launch-pill,.wayyo-sidebar>div.active,.wayyo-stat-row>div>span,.wayyo-workflow label,.wayyo-flow-icon,.wayyo-feature-icon,.wayyo-release-card,.wayyo-flow-strip,.wayyo-use-section{background:var(--wy-light)}
.wayyo-launch-pill,.wayyo-stat-row>div>span,.wayyo-workflow label,.wayyo-flow-icon,.wayyo-run,.wayyo-feature-icon,.wayyo-release-card>svg,.wayyo-faq-title>svg,.wayyo-faq-list summary span,.wayyo-sidebar>div.active,.wayyo-workflow-heading span,.wayyo-workflow p{color:var(--wy-primary)}
.wayyo-window{border-color:var(--wy-line);background:var(--wy-light);box-shadow:0 25px 65px #203A7820}
.wayyo-dash-hello button,.wayyo-header-cta,.wayyo-download{background:var(--wy-primary)}
.wayyo-workflow-heading span,.wayyo-workflow p,.wayyo-run{background:var(--wy-light)}
.wayyo-use-list article,.wayyo-control-orbit{border-color:#C9D6F1}
.wayyo-control-art{background:var(--wy-light)}
.wayyo-control-lock{background:var(--wy-primary);color:#fff;box-shadow:0 12px 30px #3559C755}
.control-label{background:#DCE6FF;color:var(--wy-deep)}
.wayyo-control-copy li svg{color:var(--wy-primary)}
.wayyo-control-copy .wayyo-caveat{color:#71809A}
.wayyo-audience{background:var(--wy-deep)}
.wayyo-audience>div:first-child>span{color:#B9C9F8}
.wayyo-header nav a:hover,.wayyo-footer>a:last-child:hover{color:var(--wy-primary)}
.wayyo-page a.wayyo-download{color:#fff;opacity:1;cursor:pointer;text-decoration:none}
.wayyo-download:hover{opacity:.9}
.wayyo-download-wrap{display:grid;justify-items:start;gap:12px}
.wayyo-download-social-proof{display:grid;gap:5px;max-width:480px;color:var(--wy-muted);font-size:12px;line-height:1.6}
.wayyo-download-social-proof b{color:var(--wy-deep);font-size:13px}
.wayyo-version-details{border:1px solid var(--wy-line);border-radius:6px;color:var(--wy-ink);font-size:12px;line-height:1.65}
.wayyo-version-details summary{padding:13px 15px;cursor:pointer;font-weight:700}
.wayyo-version-content{padding:0 15px 15px}
.wayyo-version-content p{margin:9px 0;color:var(--wy-muted)}
.wayyo-version-content h3{margin:15px 0 5px;font-size:13px}
.wayyo-version-content ul{margin:6px 0;padding-left:19px;color:var(--wy-muted)}
.wayyo-version-content li+li{margin-top:4px}
.wayyo-version-content code{overflow-wrap:anywhere}
.wayyo-version-status{font-weight:700}
.wayyo-version-details[open] .wayyo-version-content{animation:wayyo-release-open 180ms cubic-bezier(.2,.8,.2,1) both;transform-origin:top}
@keyframes wayyo-release-open{from{opacity:0;transform:translateY(-5px)}to{opacity:1;transform:translateY(0)}}
@media(prefers-reduced-motion:reduce){.wayyo-version-details[open] .wayyo-version-content{animation:none}}
`;

/* ───────────── UI enhancement layer (appended after base styles so it overrides) ───────────── */
const wayyoEnhanceStyles = `
.wayyo-page{overflow:visible;overflow-x:clip}
.wayyo-page::before{content:"";position:fixed;inset:0 0 auto 0;height:3px;z-index:60;background:linear-gradient(90deg,#3559C7,#7ea0ff);transform-origin:0 50%;transform:scaleX(var(--wy-progress,0));pointer-events:none}
.wayyo-page a:focus-visible,.wayyo-page summary:focus-visible{outline:2px solid var(--wy-primary);outline-offset:3px;border-radius:8px}

/* Header */
.wayyo-page .wayyo-header{position:sticky;top:0;z-index:50;background:rgba(255,255,255,.78);-webkit-backdrop-filter:saturate(1.6) blur(14px);backdrop-filter:saturate(1.6) blur(14px);border-bottom-color:var(--wy-line)}
.wayyo-page .wayyo-header nav a:not(.wayyo-header-cta){position:relative;padding:4px 0}
.wayyo-page .wayyo-header nav a:not(.wayyo-header-cta)::after{content:"";position:absolute;left:0;right:0;bottom:-2px;height:2px;background:var(--wy-primary);transform:scaleX(0);transform-origin:0 50%;transition:transform .25s ease}
.wayyo-page .wayyo-header nav a:not(.wayyo-header-cta):hover::after{transform:scaleX(1)}
.wayyo-page .wayyo-header-cta{border-radius:999px;padding:11px 18px;box-shadow:0 8px 20px #3559c740;transition:transform .2s,box-shadow .2s}
.wayyo-page .wayyo-header-cta:hover{transform:translateY(-1px);box-shadow:0 12px 26px #3559c752}

/* Hero */
.wayyo-page .wayyo-hero{position:relative;isolation:isolate;max-width:1360px;padding-top:92px;padding-bottom:84px}
.wayyo-page .wayyo-hero::before,.wayyo-page .wayyo-hero::after{content:"";position:absolute;left:50%;width:100vw;transform:translateX(-50%);top:-76px;height:820px;z-index:-1;pointer-events:none}
.wayyo-page .wayyo-hero::before{background:radial-gradient(55% 55% at 80% 28%,#3559c730,transparent 70%),radial-gradient(40% 45% at 6% 4%,#8fb0ff2e,transparent 70%)}
.wayyo-page .wayyo-hero::after{background:radial-gradient(#20407e2b 1px,transparent 1.3px) 0 0/24px 24px;-webkit-mask-image:linear-gradient(#000,transparent 80%);mask-image:linear-gradient(#000,transparent 80%);opacity:.55}
.wayyo-page .wayyo-hero h1{font-size:clamp(40px,5.1vw,70px);line-height:1.02;letter-spacing:-.035em}
.wayyo-page .wayyo-hero h1 span{background:linear-gradient(100deg,#3559C7 10%,#6f93ff 90%);-webkit-background-clip:text;background-clip:text;color:transparent}
.wayyo-page .wayyo-intro{font-size:17px;max-width:560px}
.wayyo-page .wayyo-intro strong{color:var(--wy-deep)}
.wayyo-page .wayyo-launch-pill{border-radius:999px;padding:5px 10px;box-shadow:inset 0 0 0 1px #3559c71f}
.wayyo-page .wayyo-trust{border-top-color:var(--wy-line)}
.wayyo-page .wayyo-trust span{font-size:11px;font-weight:600}

/* Primary download button */
.wayyo-page a.wayyo-download{border-radius:12px;padding:16px 24px;font-size:14px;background:linear-gradient(135deg,#2f52bd,#4a74ec);box-shadow:0 14px 30px #3559c74a,inset 0 1px 0 #ffffff40;transition:transform .2s,box-shadow .2s}
.wayyo-page a.wayyo-download:hover{transform:translateY(-2px);box-shadow:0 18px 38px #3559c75e,inset 0 1px 0 #ffffff40;opacity:1}
.wayyo-page a.wayyo-download:active{transform:translateY(0) scale(.98)}
.wayyo-page .wayyo-download-social-proof b{font-variant-numeric:tabular-nums}
.wayyo-page .wayyo-secondary-cta{border-radius:12px;padding:15px 16px;transition:background .2s}
.wayyo-page .wayyo-secondary-cta:hover{background:var(--wy-light)}
.wayyo-page .wayyo-version-details{border-radius:12px;background:#fff;transition:box-shadow .2s,border-color .2s}
.wayyo-page .wayyo-version-details:hover{border-color:#b9c8ee}
.wayyo-page .wayyo-version-details[open]{box-shadow:0 14px 36px #20407e14}

/* Hero dashboard */
.wayyo-page .wayyo-window{border-radius:18px;border-color:#cfd9f1;background:#fff;box-shadow:0 2px 0 #ffffffcc inset,0 30px 60px -20px #20407e40,0 12px 24px -12px #20407e29}
.wayyo-page .wayyo-window-top{height:48px;padding:0 16px}
.wayyo-page .wayyo-window-top::before{content:"";width:9px;height:9px;border-radius:50%;background:#e1e7f5;box-shadow:15px 0 #e1e7f5,30px 0 #e1e7f5;margin-right:38px;flex:none}
.wayyo-page .wayyo-search{border-radius:8px;background:var(--wy-light)}
.wayyo-page .wayyo-sidebar>div{transition:background .2s}
.wayyo-page .wayyo-workflow{position:relative;border-radius:10px;padding-inline:8px;border-top-color:transparent;transition:background .4s}
.wayyo-page .wayyo-workflow.is-running{background:var(--wy-light)}
.wayyo-page .wayyo-workflow::after{content:"";position:absolute;left:8px;right:8px;bottom:0;height:2px;border-radius:2px;background:var(--wy-primary);transform:scaleX(0);transform-origin:0 50%}
.wayyo-page .wayyo-workflow.is-running::after{animation:wy-run 2.4s linear forwards}
.wayyo-page .wayyo-run{transition:background .3s,color .3s}
.wayyo-page .wayyo-workflow.is-running .wayyo-run{background:var(--wy-primary);color:#fff}
.wayyo-page .wayyo-activity>div{border-left:2px solid transparent;transition:background .4s,border-color .4s}
.wayyo-page .wayyo-activity>div.is-running{background:#dfe8ff;border-left-color:var(--wy-primary)}
.wayyo-page .wayyo-stat-row>div,.wayyo-page .wayyo-dash-hello,.wayyo-page .wayyo-workflows,.wayyo-page .wayyo-activity{border-radius:12px}
@media(min-width:901px){
.wayyo-page .wayyo-window-body{grid-template-columns:150px 1fr;min-height:430px}
.wayyo-page .wayyo-sidebar{font-size:11px}
.wayyo-page .wayyo-sidebar small{font-size:9px}
.wayyo-page .wayyo-dash-hello h3{font-size:24px}
.wayyo-page .wayyo-dash-hello p{font-size:11px}
.wayyo-page .wayyo-dash-hello small{font-size:9px}
.wayyo-page .wayyo-stat-row small{font-size:9px}
.wayyo-page .wayyo-stat-row b{font-size:20px}
.wayyo-page .wayyo-stat-row>div>span{font-size:9px}
.wayyo-page .wayyo-workflow-heading{font-size:11px}
.wayyo-page .wayyo-workflow-heading span{font-size:9px}
.wayyo-page .wayyo-workflow b{font-size:11px}
.wayyo-page .wayyo-workflow label{font-size:9px}
.wayyo-page .wayyo-workflow small,.wayyo-page .wayyo-workflow p{font-size:9px}
.wayyo-page .wayyo-flow-icon{width:30px;height:30px;font-size:14px}
.wayyo-page .wayyo-run{font-size:10px}
.wayyo-page .wayyo-activity>b{font-size:11px}
.wayyo-page .wayyo-activity>div b{font-size:10px}
.wayyo-page .wayyo-activity>div small{font-size:9px}
}

/* Flow strip */
.wayyo-page .wayyo-flow-strip{background:#fff;gap:20px 32px;border-color:var(--wy-line)}
.wayyo-page .wayyo-flow-strip>div{flex-direction:row;align-items:center;gap:14px}
.wayyo-page .wayyo-flow-strip small{color:var(--wy-muted)}
.wayyo-page .wayyo-flow-strip b{background:var(--wy-light);border:1px solid var(--wy-line);border-radius:999px;padding:9px 16px;color:var(--wy-deep)}

/* Features: bento */
.wayyo-page .wayyo-feature-grid{grid-template-columns:repeat(6,1fr);gap:16px;border:0}
.wayyo-page .wayyo-feature{grid-column:span 2;position:relative;overflow:hidden;border:1px solid var(--wy-line);border-radius:20px;background:#fff;min-height:220px;padding:28px;transition:transform .25s,border-color .25s,box-shadow .25s}
.wayyo-page .wayyo-feature:nth-child(-n+2){grid-column:span 3;min-height:250px}
.wayyo-page .wayyo-feature:nth-child(-n+2) h3{font-size:20px;max-width:420px}
.wayyo-page .wayyo-feature::before{content:"";position:absolute;inset:0;background:radial-gradient(340px circle at var(--mx,50%) var(--my,0%),#3559c71f,transparent 60%);opacity:0;transition:opacity .3s;pointer-events:none}
.wayyo-page .wayyo-feature:hover{transform:translateY(-3px);border-color:#aebfec;box-shadow:0 22px 44px -18px #20407e3d}
.wayyo-page .wayyo-feature:hover::before{opacity:1}
.wayyo-page .wayyo-feature>small{display:none}
.wayyo-page .wayyo-feature-icon{width:46px;height:46px;border-radius:14px;color:#fff;background:linear-gradient(135deg,#2f52bd,#5f86ff);box-shadow:0 10px 20px -8px #3559c799}
.wayyo-page .wayyo-feature h3{margin-top:20px;letter-spacing:-.01em}
.wayyo-page .wayyo-feature p{font-size:13px}

/* Use cases */
.wayyo-page .wayyo-use-section{background:linear-gradient(#f4f7fe,#eef2fc)}
.wayyo-page .wayyo-use-list article{grid-template-columns:1fr 20px;padding:20px 18px;border-radius:14px;border-bottom-color:transparent;transition:background .2s,box-shadow .2s,transform .2s}
.wayyo-page .wayyo-use-list article:first-child{border-top-color:transparent}
.wayyo-page .wayyo-use-list article>span{display:none}
.wayyo-page .wayyo-use-list article:hover{background:#fff;box-shadow:0 12px 30px -16px #20407e40;transform:translateX(4px)}
.wayyo-page .wayyo-use-list article>svg{transition:transform .2s}
.wayyo-page .wayyo-use-list article:hover>svg{transform:translateX(4px);color:var(--wy-primary)}

/* Local control */
.wayyo-page .wayyo-control-art{border-radius:24px;background:radial-gradient(60% 60% at 50% 50%,#dfe8ff,var(--wy-light) 70%);border:1px solid var(--wy-line)}
.wayyo-page .wayyo-control-orbit::after{content:"";position:absolute;top:-4px;left:50%;width:8px;height:8px;margin-left:-4px;border-radius:50%;background:var(--wy-primary);box-shadow:0 0 0 5px #3559c722}
.wayyo-page .control-label{border-radius:999px;padding:8px 12px;box-shadow:0 8px 18px -10px #20407e66}

/* Audience */
.wayyo-page .wayyo-audience{background:radial-gradient(60% 120% at 100% 0%,#3559c740,transparent 60%),var(--wy-deep)}
.wayyo-page .wayyo-audience-grid article{padding:22px;border:1px solid #ffffff1f;border-radius:16px;background:#ffffff0a;transition:background .25s,border-color .25s}
.wayyo-page .wayyo-audience-grid article:hover{background:#ffffff14;border-color:#ffffff3d}

/* Download panel */
.wayyo-page .wayyo-download-section{max-width:1120px;margin:30px auto 90px;padding:60px;border-radius:30px;color:#fff;background:radial-gradient(70% 120% at 100% 0%,#8fb0ff66,transparent 60%),linear-gradient(135deg,#243f9c,#3559C7 55%,#4d74e6);box-shadow:0 40px 80px -30px #3559c78c}
.wayyo-page .wayyo-download-copy h2{color:#fff}
.wayyo-page .wayyo-download-copy>span{color:#cfdcff}
.wayyo-page .wayyo-download-copy>p{color:#dbe5ff;font-size:14px}
.wayyo-page .wayyo-download-section a.wayyo-download{background:#fff;color:var(--wy-deep);box-shadow:0 16px 34px -12px #0a1a5a99}
.wayyo-page .wayyo-download-section a.wayyo-download:hover{box-shadow:0 20px 40px -12px #0a1a5ab3}
.wayyo-page .wayyo-download-section .wayyo-download-social-proof{color:#dbe5ff}
.wayyo-page .wayyo-download-section .wayyo-download-social-proof b{color:#fff}
.wayyo-page .wayyo-release-card{background:#ffffff1a;border-color:#ffffff33;border-radius:18px;color:#fff;-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px)}
.wayyo-page .wayyo-release-card>svg{color:#fff}
.wayyo-page .wayyo-release-card p{color:#dbe5ff}

/* FAQ */
.wayyo-page .wayyo-faq-list details{padding:0;border-bottom-color:var(--wy-line)}
.wayyo-page .wayyo-faq-list summary{padding:19px 4px;font-size:14px;transition:color .2s}
.wayyo-page .wayyo-faq-list summary:hover{color:var(--wy-primary)}
.wayyo-page .wayyo-faq-list summary span{transition:transform .25s}
.wayyo-page .wayyo-faq-list details[open] summary{color:var(--wy-primary)}
.wayyo-page .wayyo-faq-list details p{font-size:13px;margin:0 28px 20px 4px;animation:wy-fade .25s ease both}

/* Footer */
.wayyo-page .wayyo-footer{background:#f8faff}

/* Responsive */
@media(max-width:900px){
.wayyo-page .wayyo-feature-grid{grid-template-columns:repeat(2,1fr)}
.wayyo-page .wayyo-feature,.wayyo-page .wayyo-feature:nth-child(-n+2){grid-column:span 1;min-height:0}
.wayyo-page .wayyo-download-section{margin-inline:16px;padding:40px 28px}
}
@media(max-width:560px){
.wayyo-page .wayyo-feature-grid{grid-template-columns:1fr}
.wayyo-page .wayyo-hero{padding-top:48px}
.wayyo-page .wayyo-flow-strip>div{flex-direction:column;align-items:flex-start;gap:8px}
.wayyo-page .wayyo-flow-strip b{border-radius:14px}
.wayyo-page .wayyo-download-section{padding:32px 20px}
}

/* Motion (disabled for reduced-motion users) */
@keyframes wy-run{to{transform:scaleX(1)}}
@keyframes wy-fade{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}
@keyframes wy-rise{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
@keyframes wy-window{from{opacity:0;transform:perspective(1400px) rotateY(-9deg) translateY(28px)}to{opacity:1;transform:perspective(1400px) rotateY(-2deg)}}
@keyframes wy-spin{to{transform:rotate(360deg)}}
@media(prefers-reduced-motion:no-preference){
.wayyo-page .wayyo-hero-copy>*{animation:wy-rise .7s cubic-bezier(.2,.8,.2,1) both}
.wayyo-page .wayyo-hero-copy>:nth-child(2){animation-delay:.06s}
.wayyo-page .wayyo-hero-copy>:nth-child(3){animation-delay:.12s}
.wayyo-page .wayyo-hero-copy>:nth-child(4){animation-delay:.18s}
.wayyo-page .wayyo-hero-copy>:nth-child(5){animation-delay:.24s}
.wayyo-page .wayyo-hero-copy>:nth-child(n+6){animation-delay:.3s}
.wayyo-page .wayyo-window{animation:wy-window 1s .2s cubic-bezier(.2,.8,.2,1) both}
.wayyo-page .wayyo-control-orbit{animation:wy-spin 28s linear infinite}
.wayyo-page .wayyo-control-orbit.orbit-two{animation-duration:18s;animation-direction:reverse}
}
@media(max-width:900px){.wayyo-page .wayyo-window{animation-name:none}}
/* Product box */
.wayyo-page .wayyo-box-wrap{display:grid;place-items:center}
.wayyo-page .wayyo-box-img{width:100%;max-width:320px;height:auto;filter:drop-shadow(0 30px 40px #0a1a5a66);transition:transform .4s ease}
.wayyo-page .wayyo-box-img:hover{transform:translateY(-6px) rotate(-1deg)}
@media(prefers-reduced-motion:no-preference){.wayyo-page .wayyo-box-img{animation:wy-rise .8s .1s cubic-bezier(.2,.8,.2,1) both}}
@media(max-width:900px){.wayyo-page .wayyo-box-img{max-width:240px}}
@media(max-width:560px){.wayyo-page .wayyo-box-img{max-width:200px}}
/* AI Meetings */
.wayyo-page .wayyo-meet-section{padding:90px 24px;background:radial-gradient(60% 80% at 100% 0%,#8fb0ff33,transparent 60%),linear-gradient(180deg,#fff,#f4f7fe);border-block:1px solid var(--wy-line);scroll-margin-top:80px}
.wayyo-page .wayyo-meet-inner{max-width:1180px;margin:auto;display:grid;grid-template-columns:1fr 1.1fr;gap:60px;align-items:center}
.wayyo-page .wayyo-meet-badge{display:inline-flex;align-items:center;gap:6px;padding:7px 11px;border-radius:999px;background:linear-gradient(90deg,#3559C7,#6a8bf0);color:#fff;font-size:10px;font-weight:700;letter-spacing:1px}
.wayyo-page .wayyo-meet-copy h2{font:700 clamp(32px,4vw,46px)/1.08 'Space Grotesk',sans-serif;margin:16px 0 0}
.wayyo-page .wayyo-meet-copy h2 span{color:var(--wy-primary)}
.wayyo-page .wayyo-meet-copy>p{font-size:15px;line-height:1.7;color:var(--wy-muted);margin:16px 0 24px;max-width:520px}
.wayyo-page .wayyo-meet-perks{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:26px}
.wayyo-page .wayyo-meet-perks article{display:flex;gap:11px;padding:14px;background:#fff;border:1px solid var(--wy-line);border-radius:12px;transition:transform .25s,box-shadow .25s}
.wayyo-page .wayyo-meet-perks article:hover{transform:translateY(-3px);box-shadow:0 14px 30px -16px #3559c766}
.wayyo-page .wayyo-meet-perks article>span{width:36px;height:36px;flex:none;border-radius:9px;display:grid;place-items:center;background:var(--wy-light);color:var(--wy-primary)}
.wayyo-page .wayyo-meet-perks h3{font:700 14px 'Space Grotesk',sans-serif;margin:0 0 4px}
.wayyo-page .wayyo-meet-perks p{font-size:12px;line-height:1.55;color:var(--wy-muted);margin:0}
.wayyo-page .wayyo-meet-free{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:700;color:var(--wy-green)}
.wayyo-page .wayyo-meet-window{background:#141b2d;border-radius:14px;padding:12px;box-shadow:0 30px 70px -25px #0a1a5a99;color:#fff;min-width:0}
.wayyo-page .wayyo-meet-top{display:flex;align-items:center;justify-content:space-between;gap:10px;font-size:11px;padding:2px 4px 12px}
.wayyo-page .wayyo-meet-rec{display:flex;align-items:center;gap:6px;color:#ff8a8a;font-weight:700;font-size:10px}
.wayyo-page .wayyo-meet-rec i{width:8px;height:8px;border-radius:50%;background:#ff5a5a}
.wayyo-page .wayyo-meet-limit{display:flex;align-items:center;gap:4px;font-size:9px;padding:4px 8px;border-radius:999px;background:#3559c740;color:#c9d6ff}
.wayyo-page .wayyo-meet-body{display:grid;grid-template-columns:1.25fr 1fr;gap:10px}
.wayyo-page .wayyo-meet-tiles{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.wayyo-page .wayyo-meet-tiles>div{position:relative;aspect-ratio:4/3;border-radius:10px;background:linear-gradient(135deg,#25304c,#1b2338);display:grid;place-items:center;border:2px solid transparent}
.wayyo-page .wayyo-meet-tiles>div.speaking{border-color:#6a8bf0;box-shadow:0 0 0 4px #6a8bf030}
.wayyo-page .wayyo-meet-tiles span{width:42px;height:42px;border-radius:50%;display:grid;place-items:center;background:#3559C7;font:700 14px 'Space Grotesk',sans-serif}
.wayyo-page .wayyo-meet-tiles small{position:absolute;left:7px;bottom:6px;display:flex;align-items:center;gap:3px;font-size:9px;color:#d5dcf0;background:#00000055;padding:2px 6px;border-radius:5px}
.wayyo-page .wayyo-meet-side{display:flex;flex-direction:column;gap:8px;min-width:0}
.wayyo-page .wayyo-meet-transcript,.wayyo-page .wayyo-meet-mom{background:#1e2740;border-radius:10px;padding:10px}
.wayyo-page .wayyo-meet-side b{display:flex;align-items:center;gap:5px;font-size:10px;margin-bottom:7px;color:#c9d6ff}
.wayyo-page .wayyo-meet-transcript p{font-size:10px;line-height:1.45;margin:0 0 6px;color:#e4e9f7}
.wayyo-page .wayyo-meet-transcript em{display:block;font-style:normal;font-size:8px;color:#8fa3d6;margin-bottom:1px}
.wayyo-page .wayyo-meet-mom{background:linear-gradient(135deg,#3559C7,#4d74e6)}
.wayyo-page .wayyo-meet-mom b{color:#fff}
.wayyo-page .wayyo-meet-mom ul{list-style:none;margin:0;padding:0;display:grid;gap:5px}
.wayyo-page .wayyo-meet-mom li{display:flex;align-items:center;gap:5px;font-size:10px}
.wayyo-page .wayyo-meet-window .wayyo-preview-note{color:#8a93ab;margin:8px 4px 0}
@media(prefers-reduced-motion:no-preference){
.wayyo-page .wayyo-meet-rec i{animation:wy-pulse 1.4s ease-in-out infinite}
.wayyo-page .wayyo-meet-transcript p{animation:wy-rise .6s cubic-bezier(.2,.8,.2,1) both}
.wayyo-page .wayyo-meet-transcript p:nth-of-type(2){animation-delay:.25s}
.wayyo-page .wayyo-meet-transcript p:nth-of-type(3){animation-delay:.5s}
}
@keyframes wy-pulse{50%{opacity:.25}}
@media(max-width:900px){.wayyo-page .wayyo-meet-inner{grid-template-columns:1fr;gap:40px}}
@media(max-width:560px){.wayyo-page .wayyo-meet-section{padding:62px 16px}.wayyo-page .wayyo-meet-perks{grid-template-columns:1fr}.wayyo-page .wayyo-meet-body{grid-template-columns:1fr}.wayyo-page .wayyo-meet-top b{display:none}}
`;