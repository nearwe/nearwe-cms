import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
    ArrowDown,
    ArrowRight,
    Bell,
    CalendarDays,
    Check,
    MapPin,
    MessageCircle,
    ShieldCheck,
    Sparkles,
    Users,
    type LucideIcon,
} from "lucide-react";

import iosLogo from "../assets/logo/ios.png";
import playstoreLogo from "../assets/logo/playstore.png";
import nearweLogo from "../assets/logo/logo-removebg.png";
import eventFeed from "../assets/images/home.png";
import communityFeed from "../assets/images/social.png";
import localMap from "../assets/images/map.png";

const APP_STORE_URL = "https://apps.apple.com/sv/app/nearwe/id6760259527?l=en-GB";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.pp2053.nearwe";

const features: { Icon: LucideIcon; title: string; description: string; points: string[]; tone: string }[] = [
    {
        Icon: MapPin,
        title: "Find what's happening nearby",
        description: "Explore local events in real time and narrow things down by category, distance, date, or vibe.",
        points: ["Location-based event search", "Category and date filters", "Save events for later"],
        tone: "cyan",
    },
    {
        Icon: Users,
        title: "Meet your kind of people",
        description: "Find people who share your interests, follow local profiles, and grow a circle around the things you enjoy.",
        points: ["Interest-based discovery", "Follow and connect with locals", "Build your community circle"],
        tone: "blue",
    },
    {
        Icon: CalendarDays,
        title: "Bring people together",
        description: "Create an event, share the details, and manage attendees right from your phone.",
        points: ["Create and share events", "Manage attendee capacity", "Invite people to join"],
        tone: "teal",
    },
    {
        Icon: Sparkles,
        title: "A feed shaped around you",
        description: "Discover recommendations informed by your preferences and activity, so relevant events are easier to find.",
        points: ["Personalized event feed", "Recommendations based on activity", "Discover people and experiences"],
        tone: "amber",
    },
    {
        Icon: MessageCircle,
        title: "Keep the conversation going",
        description: "Coordinate with attendees before an event and stay connected with your group afterward.",
        points: ["Direct messages", "Event group conversations", "Share media and locations"],
        tone: "rose",
    },
    {
        Icon: Bell,
        title: "Stay in the loop",
        description: "Get timely reminders for your plans and updates from people and communities you follow.",
        points: ["Event reminders", "Friend activity updates", "Customizable notifications"],
        tone: "violet",
    },
];

const toneClasses: Record<string, string> = {
    cyan: "border-cyan-400/25 bg-cyan-400/10 text-cyan-300",
    blue: "border-sky-400/25 bg-sky-400/10 text-sky-300",
    teal: "border-teal-400/25 bg-teal-400/10 text-teal-300",
    amber: "border-amber-400/25 bg-amber-400/10 text-amber-300",
    rose: "border-rose-400/25 bg-rose-400/10 text-rose-300",
    violet: "border-violet-400/25 bg-violet-400/10 text-violet-300",
};

export default function NearWeApp() {
    return (
        <div className="min-h-screen overflow-hidden bg-[#0a0e1a] text-white">
            <Helmet>
                <title>NearWe App | Discover Local Events & Community</title>
                <meta
                    name="description"
                    content="Discover nearby events, meet people who share your interests, host plans, and build real connections with the NearWe app."
                />
                <meta property="og:title" content="NearWe App | Discover Local Events & Community" />
                <meta
                    property="og:description"
                    content="Find your next event, meet your local community, and make plans happen with NearWe."
                />
                <meta name="theme-color" content="#0a0e1a" />
            </Helmet>

            <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#080b13]/90 backdrop-blur-xl">
                <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6" aria-label="Main">
                    <Link to="/" className="flex items-center gap-3" aria-label="NearWe Labs home">
                        <img src={nearweLogo} alt="" className="h-8 w-auto object-contain" />
                        <span className="font-display text-lg font-bold">NearWe <span className="text-slate-500">Labs</span></span>
                    </Link>
                    <div className="flex items-center gap-3 sm:gap-6">
                        <a href="#features" className="hidden text-sm font-medium text-slate-300 transition-colors hover:text-white sm:inline">Explore features</a>
                        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition-colors hover:text-white">
                            <span className="hidden sm:inline">NearWe Labs</span>
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </nav>
            </header>

            <main>
                <section className="relative px-4 pb-20 pt-32 sm:px-6 sm:pb-28 sm:pt-40">
                    <div className="pointer-events-none absolute -right-48 top-16 h-[32rem] w-[32rem] rounded-full bg-cyan-500/10 blur-[120px]" aria-hidden="true" />
                    <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
                        <div className="max-w-2xl">
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-200">
                                <MapPin className="h-4 w-4" /> Your city, a little closer
                            </div>
                            <h1 className="font-display text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
                                Make more of <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-emerald-300 bg-clip-text text-transparent">where you are.</span>
                            </h1>
                            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300 sm:text-xl">
                                NearWe brings local events, communities, and people together, so finding something to do can turn into a real-life connection.
                            </p>
                            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                                <a href={PLAY_STORE_URL} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-3 rounded-xl bg-cyan-300 px-5 py-3 text-left text-slate-950 transition-colors hover:bg-cyan-200">
                                    <img src={playstoreLogo} alt="" className="h-6 w-6 object-contain" />
                                    <span><span className="block text-[10px] leading-tight opacity-70">Get it on</span><span className="block font-bold leading-tight">Google Play</span></span>
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </a>
                                <a href={APP_STORE_URL} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-3 rounded-xl border border-white/20 px-5 py-3 text-left transition-colors hover:border-cyan-300/60 hover:bg-white/5">
                                    <img src={iosLogo} alt="" className="h-6 w-6 object-contain" />
                                    <span><span className="block text-[10px] leading-tight text-slate-400">Download on the</span><span className="block font-bold leading-tight">App Store</span></span>
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </a>
                            </div>
                            <a href="#features" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition-colors hover:text-white">
                                See what you can do <ArrowDown className="h-4 w-4" />
                            </a>
                        </div>

                        <div className="relative mx-auto w-full max-w-2xl">
                            <div className="absolute inset-8 rounded-full bg-sky-400/10 blur-3xl" aria-hidden="true" />
                            <figure className="relative z-10 rotate-[-2deg] overflow-hidden rounded-2xl border border-white/15 bg-[#101a2b] shadow-2xl shadow-cyan-950/50 sm:rounded-3xl">
                                <img src={eventFeed} alt="NearWe event discovery screen showing local events" className="block h-auto w-full" />
                                <figcaption className="flex items-center justify-between border-t border-white/10 px-4 py-3 text-sm text-slate-300 sm:px-5">
                                    <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-cyan-300" /> Events around you</span>
                                    <span className="text-xs text-slate-500">Discover</span>
                                </figcaption>
                            </figure>
                            <figure className="absolute -bottom-12 -left-2 z-20 w-[46%] -rotate-3 overflow-hidden rounded-xl border border-white/15 bg-[#101a2b] shadow-xl sm:-bottom-16 sm:-left-8 sm:rounded-2xl">
                                <img src={localMap} alt="NearWe map view with nearby places" className="block h-auto w-full" />
                                <figcaption className="flex items-center gap-2 px-3 py-2 text-xs text-slate-300 sm:px-4 sm:py-3"><MapPin className="h-3.5 w-3.5 text-cyan-300" /> Nearby on the map</figcaption>
                            </figure>
                            <figure className="absolute -bottom-8 -right-1 z-20 w-[44%] rotate-2 overflow-hidden rounded-xl border border-white/15 bg-[#101a2b] shadow-xl sm:-bottom-12 sm:-right-5 sm:rounded-2xl">
                                <img src={communityFeed} alt="NearWe community feed with local updates" className="block h-auto w-full" />
                                <figcaption className="flex items-center gap-2 px-3 py-2 text-xs text-slate-300 sm:px-4 sm:py-3"><Users className="h-3.5 w-3.5 text-sky-300" /> Your local community</figcaption>
                            </figure>
                        </div>
                    </div>
                </section>

                <section className="border-y border-white/10 bg-white/[0.025] px-4 py-8 sm:px-6">
                    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 text-center sm:grid-cols-3 sm:gap-0">
                        {[
                            { value: "10,000+", label: "community members" },
                            { value: "500+", label: "events daily" },
                            { value: "50+", label: "cities" },
                        ].map((item, index) => (
                            <div key={item.label} className={index ? "border-white/10 sm:border-l" : ""}>
                                <p className="font-display text-2xl font-bold text-white">{item.value}</p>
                                <p className="mt-1 text-sm text-slate-400">{item.label}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section id="features" className="scroll-mt-20 px-4 py-24 sm:px-6 sm:py-28">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-12 max-w-2xl">
                            <p className="mb-3 text-sm font-bold uppercase text-cyan-300">Made for real life</p>
                            <h2 className="font-display text-3xl font-bold sm:text-4xl">One app for the plans, people, and places around you.</h2>
                            <p className="mt-4 leading-relaxed text-slate-400">From finding a local event to bringing your own group together, NearWe helps make the next step easy.</p>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                            {features.map(({ Icon, title, description, points, tone }) => (
                                <article key={title} className="border-t border-white/15 bg-gradient-to-b from-white/[0.045] to-transparent p-6 sm:p-7">
                                    <div className={`mb-5 flex h-11 w-11 items-center justify-center rounded-xl border ${toneClasses[tone]}`}>
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <h3 className="font-display text-xl font-bold">{title}</h3>
                                    <p className="mt-3 min-h-[4.5rem] leading-relaxed text-slate-400">{description}</p>
                                    <ul className="mt-5 space-y-2.5">
                                        {points.map((point) => (
                                            <li key={point} className="flex items-start gap-2.5 text-sm text-slate-300">
                                                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" /> {point}
                                            </li>
                                        ))}
                                    </ul>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="px-4 pb-24 sm:px-6 sm:pb-32">
                    <div className="relative mx-auto max-w-7xl overflow-hidden border border-cyan-300/20 bg-[#101925] px-6 py-12 sm:px-12 sm:py-16">
                        <div className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full bg-cyan-400/10 blur-[90px]" aria-hidden="true" />
                        <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
                            <div className="max-w-2xl">
                                <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-cyan-300"><ShieldCheck className="h-4 w-4" /> Find your people, nearby</div>
                                <h2 className="font-display text-3xl font-bold sm:text-4xl">Your next good plan could be just around the corner.</h2>
                                <p className="mt-4 text-slate-400">Get NearWe and discover what is happening in your city.</p>
                            </div>
                            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                                <a href={PLAY_STORE_URL} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-300 px-5 py-3 font-bold text-slate-950 transition-colors hover:bg-cyan-200">
                                    <img src={playstoreLogo} alt="" className="h-5 w-5 object-contain" /> Google Play
                                </a>
                                <a href={APP_STORE_URL} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 px-5 py-3 font-bold transition-colors hover:border-cyan-300/60 hover:bg-white/5">
                                    <img src={iosLogo} alt="" className="h-5 w-5 object-contain" /> App Store
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="border-t border-white/10 px-4 py-7 sm:px-6">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-sm text-slate-500 sm:flex-row">
                    <p>© {new Date().getFullYear()} NearWe Labs. All rights reserved.</p>
                    <div className="flex items-center gap-5">
                        <Link to="/privacy" className="transition-colors hover:text-cyan-300">Privacy</Link>
                        <Link to="/terms" className="transition-colors hover:text-cyan-300">Terms</Link>
                        <a href="mailto:support@nearwe.in" className="transition-colors hover:text-cyan-300">Support</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}