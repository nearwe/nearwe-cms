import { Check, FileText, Infinity as InfinityIcon, Languages, Mic, Sparkles, Video } from "lucide-react";
import { CtaBand, MacWin, PageIntro, WayyoShell } from "./wayyoShared";

const perks = [
    { icon: InfinityIcon, title: "unlimited meeting time", line: "No 40-minute cut-offs. Talk as long as you need." },
    { icon: Video, title: "one-click recording", line: "Record every call in HD, ready to replay or share." },
    { icon: Languages, title: "transcripts in any language", line: "Live AI transcripts — Hindi, English, Marathi, Spanish and more." },
    { icon: Sparkles, title: "MoMs on the fly", line: "Minutes, decisions and action items the moment you hang up." },
];

export default function WayyoMeetings() {
    return (
        <WayyoShell>
            <PageIntro kicker="coming soon · ai meetings" title={<>meet without limits.<br /><span>let ai take the notes.</span></>}>
                Video calls with unlimited time, one-click recording, AI transcripts and Minutes of Meeting — built into Wayyo.
            </PageIntro>

            <section className="wy-meet">
                <MacWin title="weekly product sync" caption="ai-meetings-preview.mov" className="wy-meet-win">
                    <div className="wy-meet-top"><span className="rec"><i /> REC 01:12:48</span><span className="lim"><InfinityIcon size={12} /> no time limit</span></div>
                    <div className="wy-meet-body">
                        <div className="wy-meet-tiles">
                            {[["AK", "Aniket"], ["PS", "Priya"], ["RM", "Rahul"], ["SJ", "Sara"]].map(([ini, name], i) => (
                                <div key={name} className={i === 0 ? "on" : undefined}><span>{ini}</span><small><Mic size={9} /> {name}</small></div>
                            ))}
                        </div>
                        <aside>
                            <div className="tr"><b><Languages size={12} /> live transcript</b>
                                <p><em>Aniket · EN</em>Let's lock the launch date for Friday.</p>
                                <p><em>Priya · HI</em>Haan, design final ho gaya hai.</p>
                                <p><em>Sara · ES</em>Enviaré el informe mañana.</p>
                            </div>
                            <div className="mom"><b><FileText size={12} /> ai minutes of meeting</b>
                                <ul><li><Check size={10} /> Launch date: Friday</li><li><Check size={10} /> Design signed off</li><li><Check size={10} /> Sara → send report</li></ul>
                            </div>
                        </aside>
                    </div>
                </MacWin>
                <div className="wy-perks">
                    {perks.map(({ icon: Icon, title, line }) => (
                        <article key={title}><span><Icon size={18} /></span><div><b>{title}</b><p>{line}</p></div></article>
                    ))}
                </div>
                <p className="wy-soon">AI Meetings are coming soon and will be part of the Wayyo Full License.</p>
            </section>

            <CtaBand title="meanwhile, automate everything else." />
        </WayyoShell>
    );
}
