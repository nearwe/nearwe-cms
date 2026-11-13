import { Helmet } from "react-helmet-async";
import { CtaBand, PageIntro, WayyoShell } from "./wayyoShared";

const questions = [
    { question: "What is Wayyo?", answer: "Wayyo is your personal AI automation tool for Windows. Build visual workflows, get help from local AI, organise documents and turn spreadsheet exports into reports." },
    { question: "Is Wayyo free?", answer: "Yes. Wayyo is free for now — ₹0 with every current feature included." },
    { question: "How much will Wayyo cost later?", answer: "A full Wayyo license, including AI Meetings, is coming soon at ₹19,999 (about US$229)." },
    { question: "Is Wayyo available for Mac?", answer: "Not yet. Wayyo runs on Windows 10 and newer (x64). A Mac version is coming soon." },
    { question: "Does Wayyo include video meetings?", answer: "AI Meetings are coming soon: unlimited call time, recording, live transcripts and Minutes of Meeting." },
    { question: "Does local AI need a cloud AI subscription?", answer: "No. The bundled Qwen3 0.6B model runs on your device. Review AI suggestions before using them. Advanced integrations may have their own requirements." },
    { question: "Can Wayyo work offline?", answer: "Yes. Core local workflows and local AI run on your device. Website automation and network-using scripts may need internet access and your approval." },
    { question: "Do I need coding skills?", answer: "No. Build workflows visually. JavaScript, Python and reusable subworkflows are there when you want more." },
    { question: "What can templates automate?", answer: "24 templates across 11 industries — expense summaries, invoice cleanup, attendance, sales reporting, inventory exceptions and timesheets. They turn local CSV exports into XLSX reports and open paused so you can review and test first." },
    { question: "Can workflows run while the PC is asleep or shut down?", answer: "No. Local workflows need your PC awake and running; sleep interrupts execution." },
    { question: "Do advanced actions require other software?", answer: "Some do. Edge automation needs Edge, Python actions need Python, and Office actions need compatible Office desktop apps. Windows UI Automation support varies by app and permissions." },
    { question: "The Microsoft Store link isn't working. What now?", answer: "Use the Direct Download button for Windows — it downloads the same x64 installer." },
];

export default function WayyoFaq() {
    return (
        <WayyoShell>
            <Helmet>
                <script type="application/ld+json">{JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    mainEntity: questions.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
                })}</script>
            </Helmet>
            <PageIntro kicker="faq" title={<>questions, <span>answered.</span></>} />
            <section className="wy-faq">
                {questions.map(({ question, answer }) => (
                    <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>
                ))}
            </section>
            <CtaBand />
        </WayyoShell>
    );
}
