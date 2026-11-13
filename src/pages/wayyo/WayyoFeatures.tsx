import { ArrowRight, CalendarClock, Check, FileCheck2, FolderSync, GitBranch, Laptop, LockKeyhole, Workflow } from "lucide-react";
import { CtaBand, MacWin, PageIntro, WayyoShell } from "./wayyoShared";

const capabilities = [
    { icon: Workflow, file: "visual-builder.app", title: "build it visually. make it work your way.", description: "Connect triggers, actions, conditions, loops and variables. Configure steps, save workflows and review results. Undo, redo, right-click to delete — refine until it feels right." },
    { icon: Laptop, file: "local-ai.app", title: "an ai assistant that works on your computer.", description: "Draft workflows, summarise text, suggest metadata, extract information and explain errors. Bundled Qwen3 0.6B runs locally — no cloud subscription. Review suggestions before using them." },
    { icon: GitBranch, file: "templates.app", title: "start with a template. make it your own.", description: "24 templates across 11 industries. Pick an input CSV and an output XLSX; required columns are checked. Workflows open paused in the builder so you can review and test first." },
    { icon: FileCheck2, file: "reports.app", title: "from spreadsheet exports to useful reports.", description: "Preview CSV and XLSX data. Filter, transform, group and aggregate it into reports, then save the workflow to reuse with the next export." },
    { icon: FolderSync, file: "documents.app", title: "keep your documents organised and close.", description: "Import, search, tag and preview files in your local library. Keep version history, restore earlier versions, create backups and watch selected folders." },
    { icon: CalendarClock, file: "schedules.app", title: "put everyday windows tasks in motion.", description: "Move files, launch apps, add delays and notifications. Schedules, file and app triggers, with conditions, variables, loops, retries, timeouts and cancellation." },
];

const useCases = [
    { title: "see where expenses go", detail: "Summarise expenses by category from a CSV export." },
    { title: "clean invoice records", detail: "Remove duplicate invoice records before reporting." },
    { title: "prepare attendance and timesheets", detail: "Turn attendance or timesheet exports into reviewable reports." },
    { title: "spot low stock", detail: "Flag inventory records below your chosen threshold." },
    { title: "keep files in order", detail: "Organise files with rules and watch folders for changes." },
    { title: "get the gist of a document", detail: "Summarise document text with local AI, then review it." },
    { title: "open your daily workspace", detail: "Launch your apps, prepare folders and get notified when done." },
];

const audience = [
    { title: "developers", line: "Automate local scripts and dev setup." },
    { title: "professionals", line: "Streamline recurring file and reporting tasks." },
    { title: "creators", line: "Organise assets and desktop routines." },
    { title: "power users", line: "Combine actions into reusable workflows." },
];

export default function WayyoFeatures() {
    return (
        <WayyoShell>
            <PageIntro kicker="features" title={<>everything wayyo does,<br /><span>in one place.</span></>}>
                Local AI, visual workflows, documents and reports — one Windows workspace that does the boring parts for you.
            </PageIntro>

            <section className="wy-feat-grid">
                {capabilities.map(({ icon: Icon, file, title, description }, i) => (
                    <MacWin key={file} title={file} className="wy-feat">
                        <span className="wy-feat-icon"><Icon size={20} /></span>
                        <small>0{i + 1}</small>
                        <h3>{title}</h3>
                        <p>{description}</p>
                    </MacWin>
                ))}
            </section>

            <section className="wy-split">
                <div className="wy-split-head">
                    <span className="wy-pill">use cases</span>
                    <h2>made for the in-between tasks.</h2>
                    <p>Start with a local export, a document or a desktop routine. Review the workflow, test it and make it your own.</p>
                </div>
                <ol className="wy-uses">
                    {useCases.map((u, i) => (
                        <li key={u.title}><span>0{i + 1}</span><div><b>{u.title}</b><p>{u.detail}</p></div><ArrowRight size={16} /></li>
                    ))}
                </ol>
            </section>

            <section className="wy-local">
                <div className="wy-local-art" aria-hidden="true">
                    <div className="ring r1" /><div className="ring r2" />
                    <span className="lock"><LockKeyhole size={30} /></span>
                    <i className="l1">your computer</i><i className="l2">your workflows</i><i className="l3">your control</i>
                </div>
                <div>
                    <span className="wy-pill">local by design</span>
                    <h2>your device. your rules.</h2>
                    <p>Workflows, settings and run history stay in local SQLite storage. Review execution logs to see what ran and where a step needs attention.</p>
                    <ul>
                        <li><Check size={15} /> Core local workflows work offline</li>
                        <li><Check size={15} /> Local AI runs on your device</li>
                        <li><Check size={15} /> Network actions may need internet access and your approval</li>
                    </ul>
                </div>
            </section>

            <section className="wy-audience">
                <h2>made to fit your kind of work.</h2>
                <div>{audience.map((a) => <article key={a.title}><b>{a.title}</b><p>{a.line}</p></article>)}</div>
            </section>

            <section className="wy-specs">
                <MacWin title="requirements.txt">
                    <dl>
                        <dt>platform</dt><dd>Windows 10 and newer · x64</dd>
                        <dt>mac</dt><dd>coming soon</dd>
                        <dt>storage</dt><dd>Local SQLite for workflows and history</dd>
                        <dt>actions</dt><dd>File, CSV, Excel, JSON, reports, JavaScript</dd>
                        <dt>advanced</dt><dd>Edge automation, Python, Windows UI Automation, Office — each needs its own app installed</dd>
                        <dt>heads-up</dt><dd>Workflows need your PC awake; sleep or shutdown stops them</dd>
                    </dl>
                </MacWin>
            </section>

            <CtaBand title="try every feature. free." />
        </WayyoShell>
    );
}
