import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { ArrowDownToLine, ArrowRight, CalendarClock, Check, CircleHelp, FileCheck2, FolderSync, GitBranch, History, Laptop, LoaderCircle, LockKeyhole, Play, Workflow } from "lucide-react";
import { core_services } from "../utils/api";

const WAYYO_INSTALLER_URL = process.env.REACT_APP_WAYYO_INSTALLER_URL || "https://github.com/nearwe/nearwe-cms/releases/latest/download/WayyoSetup.exe";
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

const capabilities = [
    { icon: Workflow, title: "Build workflows visually", description: "Connect triggers, actions and conditions in a visual builder. Keep workflows easy to understand, change and reuse." },
    { icon: CalendarClock, title: "Schedule recurring work", description: "Set supported workflows to run at a chosen time or on a recurring schedule." },
    { icon: FolderSync, title: "Automate everyday tasks", description: "Organize files, launch applications, create folders and run supported scripts." },
    { icon: GitBranch, title: "Add logic when you need it", description: "Combine conditions, delays, loops and error handling for more than a simple sequence." },
    { icon: LockKeyhole, title: "Keep control on your device", description: "Wayyo is designed around local execution. Core workflows are intended to work without a cloud account or constant internet connection." },
    { icon: History, title: "See what happened", description: "Review workflow history and execution logs to understand completed and failed steps." },
];

const useCases = [
    { title: "Start your day", detail: "Open your development tools, prepare a workspace and run startup scripts on a schedule." },
    { title: "Tidy your downloads", detail: "Sort supported files into folders using rules you configure." },
    { title: "Prepare daily reports", detail: "Run a local script at a scheduled time and get a notification when it finishes." },
    { title: "Repeat less at work", detail: "Combine file operations, app launches and other supported actions into reusable workflows." },
];

const questions = [
    { question: "What is Wayyo?", answer: "Wayyo is a Windows desktop application for creating and running visual workflow automations." },
    { question: "Do I need to know how to code?", answer: "The visual builder is designed for no-code workflows. Advanced workflows may use scripts where supported." },
    { question: "Does Wayyo work offline?", answer: "Wayyo is designed for local, offline-first execution. Actions that rely on online services still need an internet connection." },
    { question: "Will workflows run while my computer is asleep or shut down?", answer: "Execution normally pauses during sleep, and a fully shut-down computer cannot run local workflows. Wake timers or missed-run recovery depend on Windows settings and hardware." },
    { question: "Can it automate any Windows application?", answer: "Automation depends on supported actions, the target application's accessibility and permissions. Not every application can be automated reliably." },
    { question: "Is Wayyo free, and which Windows versions are supported?", answer: "Pricing, supported Windows versions and minimum system requirements will be published with the release. They are not confirmed yet." },
    { question: "How do I get the installer?", answer: "Use the Download for Windows button on this page to download the official Wayyo installer." },
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
            {isLoading ? "Starting download..." : "Download for Windows"}
        </a>
        <div className="wayyo-download-social-proof" aria-live="polite">
            <b>{downloadCount === null ? "Make Wayyo work your way." : `${downloadCount.toLocaleString()} download ${downloadCount === 1 ? "click" : "clicks"} so far.`}</b>
            <span>Build automations around your needs. Try it free and make it fit the way you work.</span>
        </div>
    </div>;
}

function DashboardPreview() {
    return (
        <div className="wayyo-window" aria-label="Illustrative Wayyo dashboard preview">
            <div className="wayyo-window-top"><div className="wayyo-wordmark"><span className="wayyo-mark">w</span><b>wayyo</b><i>● Local Engine Active</i></div><div className="wayyo-search">⌕ &nbsp; Search workflows, actions, logs... <kbd>Ctrl+K</kbd></div><div className="wayyo-profile">◉ &nbsp; Engineer</div></div>
            <div className="wayyo-window-body">
                <aside className="wayyo-sidebar">{["⌂  Home", "◇  Visual Builder", "▦  Templates", "◷  Schedules", "⌁  Activity", "☷  Settings"].map((item, index) => <div className={index === 0 ? "active" : ""} key={item}>{item}</div>)}<small>● Running locally<br />Automations <b>8 active</b><br />◉ SQLite</small></aside>
                <div className="wayyo-dash-content">
                    <div className="wayyo-dash-hello"><small>LOCAL NODE · WINDOWS · ● Ready</small><h3>Good evening, Alex</h3><p>Let’s make your repetitive work disappear. Automations executing locally on Windows.</p><button type="button" disabled>＋ Create workflow</button></div>
                    <div className="wayyo-stat-row"><div><small>Active workflows</small><b>08 <em>/ 10 installed</em></b><span>● Running in background</span></div><div><small>Successful runs today</small><b>24 <em>0 failed</em></b><span>● Success rate today</span></div><div><small>Time saved this week</small><b>4h 35m</b><span>↗ Compared with last week</span></div></div>
                    <div className="wayyo-workspace"><section className="wayyo-workflows"><div className="wayyo-workflow-heading"><b>Your workflows</b><span>All (8)　 Active (6)　 Paused (2)</span></div>
                        {[["▣", "Daily Project Setup", "Scheduled", "Every weekday at 9:00 AM", "Open apps → Prepare files → Notify"], ["▧", "Downloads Organizer", "File Watcher", "When a new file is added", "Sort extension → Move archive"], ["☁", "Evening Backup", "Scheduled", "Every day at 8:00 PM", "Zip directory → Copy NAS → Verify"]].map(([icon, name, tag, when, steps]) => <div className="wayyo-workflow" key={name}><span className="wayyo-flow-icon">{icon}</span><div><b>{name}</b><label>{tag}</label><small>◷ {when}</small><p>{steps}</p></div><span className="wayyo-run"><Play size={12} /> Run</span></div>)}
                    </section><aside className="wayyo-activity"><b>◴ Recent activity</b>{["Daily Project Setup", "Downloads Organizer", "Git Workspace Pull"].map((item) => <div key={item}><b>{item}</b><small>● Success　 ·　 just now</small></div>)}</aside></div>
                    <div className="wayyo-preview-note">Concept interface preview · Workflow examples are illustrative</div>
                </div>
            </div>
        </div>
    );
}

export default function Wayyo() {
    return (
        <div className="wayyo-page">
            <style>{wayyoStyles}</style>
            <Helmet>
                <title>Wayyo Download for Windows | Workflow Automation</title>
                <meta name="description" content="Download Wayyo for Windows, a desktop automation app for building visual workflows, scheduling repetitive tasks and running supported automations locally." />
                <meta name="robots" content="index, follow, max-image-preview:large" />
                <meta name="application-name" content="Wayyo" />
                <meta name="apple-mobile-web-app-title" content="Wayyo" />
                <meta name="theme-color" content="#3559C7" />
                <link rel="canonical" href="https://nearwe.in/wayyo" />
                <link rel="icon" type="image/png" href="/wayyo-icon-cobalt.png" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Wayyo" />
                <meta property="og:title" content="Wayyo for Windows | Your Work, On Autopilot" />
                <meta property="og:description" content="Download Wayyo for Windows, a desktop automation app for building visual workflows and automating repetitive tasks locally." />
                <meta property="og:url" content="https://nearwe.in/wayyo" />
                <meta property="og:image" content="https://nearwe.in/wayyo-og-cobalt.png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content="Wayyo, a Windows desktop automation app for visual workflows" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Wayyo for Windows | Your Work, On Autopilot" />
                <meta name="twitter:description" content="Download Wayyo and build visual workflows to automate repetitive Windows tasks locally." />
                <meta name="twitter:image" content="https://nearwe.in/wayyo-og-cobalt.png" />
                <script type="application/ld+json">{JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    name: "Wayyo",
                    url: "https://nearwe.in/wayyo",
                    description: "A Windows desktop automation app for building visual workflows and running supported repetitive tasks locally.",
                    applicationCategory: "UtilitiesApplication",
                    operatingSystem: "Windows",
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
            <header className="wayyo-header"><Link to="/wayyo" className="wayyo-brand"><img className="wayyo-nearwe-logo" src="/logo-bg-trans.png" alt="NearWe Labs" /><span>wayyo<small>BY NEARWE LABS</small></span></Link><nav aria-label="Wayyo navigation"><a href="#features">Features</a><a href="#use-cases">Use cases</a><a href="#faq">FAQ</a><Link to="/">NearWe Labs <ArrowRight size={14} /></Link></nav><a className="wayyo-header-cta" href="#download">Get Wayyo <ArrowRight size={15} /></a></header>
            <main>
                <section className="wayyo-hero"><div className="wayyo-hero-copy"><div className="wayyo-eyebrow"><span /> WAYYO · MADE FOR WINDOWS <span className="wayyo-launch-pill">AVAILABLE NOW</span></div><p className="wayyo-overline">Your personal automation workspace</p><h1>Stop repeating tasks.<br /><span>Start automating.</span></h1><p className="wayyo-intro">Wayyo is a Windows desktop automation app for building visual workflows. Schedule actions, connect steps and let Wayyo handle repetitive work locally on your PC.</p><div className="wayyo-hero-actions"><DownloadButton /><a className="wayyo-secondary-cta" href="#features">See how it works <ArrowRight size={17} /></a></div><p id="wayyo-release-note" className="wayyo-release-note">Download the official Windows installer below.</p><div className="wayyo-trust"><span><Check size={15} /> Local-first by design</span><span><Laptop size={15} /> Windows desktop</span><span><Workflow size={15} /> Visual workflows</span></div></div><DashboardPreview /></section>
                <section className="wayyo-flow-strip" aria-label="Example workflows"><div><small>DAILY WORKSPACE SETUP</small><b>Schedule <i>→</i> Open apps <i>→</i> Prepare files <i>→</i> Notify</b></div><div><small>DOWNLOADS ORGANIZER</small><b>Detect files <i>→</i> Sort by type <i>→</i> Move into folders</b></div></section>
                <section className="wayyo-section" id="features"><div className="wayyo-section-heading"><span>LESS REPETITION, MORE FLOW</span><h2>Everything you do repeatedly<br />can become a workflow.</h2><p>Bring everyday desktop tasks together in one workspace you can shape around the way you work.</p></div><div className="wayyo-feature-grid">{capabilities.map(({ icon: Icon, title, description }, index) => <article className="wayyo-feature" key={title}><span className="wayyo-feature-icon"><Icon size={21} /></span><small>0{index + 1}</small><h3>{title}</h3><p>{description}</p></article>)}</div></section>
                <section className="wayyo-use-section" id="use-cases"><div className="wayyo-use-inner"><div className="wayyo-use-heading"><span>MADE FOR THE IN-BETWEEN TASKS</span><h2>Automate the little things that take up your day.</h2><p>Start small, make a routine reusable, then add steps as your needs grow.</p></div><div className="wayyo-use-list">{useCases.map((item, index) => <article key={item.title}><span>0{index + 1}</span><div><h3>{item.title}</h3><p>{item.detail}</p></div><ArrowRight size={18} /></article>)}</div></div></section>
                <section className="wayyo-control-section"><div className="wayyo-control-art"><div className="wayyo-control-orbit orbit-one" /><div className="wayyo-control-orbit orbit-two" /><div className="wayyo-control-lock"><LockKeyhole size={34} /></div><span className="control-label label-one">YOUR COMPUTER</span><span className="control-label label-two">YOUR WORKFLOWS</span><span className="control-label label-three">YOUR CONTROL</span></div><div className="wayyo-control-copy"><span>LOCAL BY DESIGN</span><h2>Your device.<br />Your rules.</h2><p>Wayyo is designed to prioritize local execution and user control. Keep workflow definitions on your device, review execution logs and decide which actions are allowed to run.</p><ul><li><Check size={16} /> Core workflows designed for local execution</li><li><Check size={16} /> No mandatory cloud account for local workflows</li><li><Check size={16} /> Online actions still require an internet connection</li></ul><p className="wayyo-caveat">What a workflow can do depends on its selected action, Windows permissions and the state of your computer.</p></div></section>
                <section className="wayyo-audience"><div><span>FOR YOUR KIND OF WORK</span><h2>Made to fit your workflow.</h2></div><div className="wayyo-audience-grid"><article><b>Developers</b><p>Automate local scripts and development setup.</p></article><article><b>Professionals</b><p>Streamline recurring file and reporting tasks.</p></article><article><b>Creators</b><p>Organize assets and supported desktop routines.</p></article><article><b>Power users</b><p>Combine actions into workflows you can reuse.</p></article></div></section>
                <section className="wayyo-download-section" id="download"><div className="wayyo-download-copy"><span>YOUR NEXT STEP</span><h2>Get started with Wayyo.</h2><p>Start with a simple workflow. Add more actions as your needs grow.</p><DownloadButton /><p id="wayyo-release-note-bottom">Download the official Windows installer below.</p></div><div className="wayyo-release-card"><FileCheck2 size={23} /><div><b>Official Windows installer</b><p>Hosted on GitHub Releases.</p></div></div></section>
                <section className="wayyo-faq-section" id="faq"><div className="wayyo-faq-title"><CircleHelp size={22} /><span>GOOD TO KNOW</span><h2>Questions, answered.</h2></div><div className="wayyo-faq-list">{questions.map(({ question, answer }) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section>
            </main>
            <footer className="wayyo-footer"><Link to="/wayyo" className="wayyo-brand"><img className="wayyo-nearwe-logo" src="/logo-bg-trans.png" alt="NearWe Labs" /><span>wayyo<small>BY NEARWE LABS</small></span></Link><p>Your work. On autopilot.</p><Link to="/">A product by NearWe Labs <ArrowRight size={14} /></Link></footer>
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
.wayyo-download{opacity:1;cursor:pointer;text-decoration:none}
.wayyo-download:hover{opacity:.9}
.wayyo-download-wrap{display:grid;justify-items:start;gap:12px}
.wayyo-download-social-proof{display:grid;gap:5px;max-width:480px;color:var(--wy-muted);font-size:12px;line-height:1.6}
.wayyo-download-social-proof b{color:var(--wy-deep);font-size:13px}
`;