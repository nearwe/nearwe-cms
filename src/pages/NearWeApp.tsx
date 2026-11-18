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
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
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
    cyan: "border-cyan-100 bg-cyan-50 text-cyan-700",
    blue: "border-sky-100 bg-sky-50 text-sky-700",
    teal: "border-teal-100 bg-teal-50 text-teal-700",
    amber: "border-amber-100 bg-amber-50 text-amber-700",
    rose: "border-rose-100 bg-rose-50 text-rose-700",
    violet: "border-violet-100 bg-violet-50 text-violet-700",
};

export default function NearWeApp() {
    return (
        <div className="min-h-screen overflow-hidden bg-white text-slate-900">
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
                <meta name="theme-color" content="#ffffff" />
            </Helmet>

            <SiteHeader />

            <main>
                <section className="relative border-b border-slate-200 bg-gradient-to-b from-blue-50/70 to-white px-4 pb-28 pt-32 sm:px-6 sm:pb-36 sm:pt-40">
                    <div className="pointer-events-none absolute -right-48 top-16 h-[32rem] w-[32rem] rounded-full bg-blue-200/40 blur-[120px]" aria-hidden="true" />
                    <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
                        <div className="max-w-2xl">
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-700">
                                <MapPin className="h-4 w-4" /> Your city, a little closer
                            </div>
                            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                                Make more of <span className="bg-gradient-to-r from-blue-700 via-sky-600 to-teal-600 bg-clip-text text-transparent">where you are.</span>
                            </h1>
                            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 sm:text-xl">
                                NearWe brings local events, communities, and people together, so finding something to do can turn into a real-life connection.
                            </p>
                            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                                <a href={PLAY_STORE_URL} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-3 rounded-xl bg-slate-900 px-5 py-3 text-left text-white shadow-sm transition-colors hover:bg-slate-800">
                                    <img src={playstoreLogo} alt="" className="h-6 w-6 object-contain" />
                                    <span><span className="block text-[10px] leading-tight opacity-70">Get it on</span><span className="block font-bold leading-tight">Google Play</span></span>
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </a>
                                <a href={APP_STORE_URL} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white px-5 py-3 text-left text-slate-900 shadow-sm transition-colors hover:border-slate-400 hover:bg-slate-50">
                                    <img src={iosLogo} alt="" className="h-6 w-6 object-contain" />
                                    <span><span className="block text-[10px] leading-tight text-slate-500">Download on the</span><span className="block font-bold leading-tight">App Store</span></span>
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </a>
                            </div>
                            <a href="#features" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 transition-colors hover:text-blue-900">
                                See what you can do <ArrowDown className="h-4 w-4" />
                            </a>
                        </div>

                        <div className="relative mx-auto w-full max-w-2xl">
                            <div className="absolute inset-8 rounded-full bg-sky-200/50 blur-3xl" aria-hidden="true" />
                            <figure className="relative z-10 rotate-[-2deg] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-300/60 sm:rounded-3xl">
                                <img src={eventFeed} alt="NearWe event discovery screen showing local events" className="block h-auto w-full" />
                                <figcaption className="flex items-center justify-between border-t border-slate-200 px-4 py-3 text-sm text-slate-700 sm:px-5">
                                    <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-blue-700" /> Events around you</span>
                                    <span className="text-xs text-slate-500">Discover</span>
                                </figcaption>
                            </figure>
                            <figure className="absolute -bottom-12 -left-2 z-20 w-[46%] -rotate-3 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-300/50 sm:-bottom-16 sm:-left-8 sm:rounded-2xl">
                                <img src={localMap} alt="NearWe map view with nearby places" className="block h-auto w-full" />
                                <figcaption className="flex items-center gap-2 px-3 py-2 text-xs text-slate-700 sm:px-4 sm:py-3"><MapPin className="h-3.5 w-3.5 text-blue-700" /> Nearby on the map</figcaption>
                            </figure>
                            <figure className="absolute -bottom-8 -right-1 z-20 w-[44%] rotate-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-300/50 sm:-bottom-12 sm:-right-5 sm:rounded-2xl">
                                <img src={communityFeed} alt="NearWe community feed with local updates" className="block h-auto w-full" />
                                <figcaption className="flex items-center gap-2 px-3 py-2 text-xs text-slate-700 sm:px-4 sm:py-3"><Users className="h-3.5 w-3.5 text-sky-700" /> Your local community</figcaption>
                            </figure>
                        </div>
                    </div>
                </section>

                <section className="border-b border-slate-200 bg-slate-50 px-4 py-10 sm:px-6">
                    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 text-center sm:grid-cols-3 sm:gap-0">
                        {[
                            { value: "10,000+", label: "community members" },
                            { value: "500+", label: "events daily" },
                            { value: "50+", label: "cities" },
                        ].map((item, index) => (
                            <div key={item.label} className={index ? "border-slate-200 sm:border-l" : ""}>
                                <p className="text-3xl font-bold tracking-tight text-blue-700">{item.value}</p>
                                <p className="mt-1 text-sm text-slate-600">{item.label}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section id="features" className="scroll-mt-24 px-4 py-24 sm:px-6 sm:py-28">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-12 max-w-2xl">
                            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">Made for real life</p>
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">One app for the plans, people, and places around you.</h2>
                            <p className="mt-4 text-lg leading-relaxed text-slate-600">From finding a local event to bringing your own group together, NearWe helps make the next step easy.</p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {features.map(({ Icon, title, description, points, tone }) => (
                                <article key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/70 sm:p-7">
                                    <div className={`mb-5 flex h-11 w-11 items-center justify-center rounded-xl border ${toneClasses[tone]}`}>
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <h3 className="text-xl font-bold tracking-tight">{title}</h3>
                                    <p className="mt-3 min-h-[4.5rem] leading-relaxed text-slate-600">{description}</p>
                                    <ul className="mt-5 space-y-2.5">
                                        {points.map((point) => (
                                            <li key={point} className="flex items-start gap-2.5 text-sm text-slate-700">
                                                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" /> {point}
                                            </li>
                                        ))}
                                    </ul>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="px-4 pb-24 sm:px-6 sm:pb-32">
                    <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-br from-blue-800 to-blue-950 px-6 py-12 text-white shadow-xl shadow-blue-900/20 sm:px-12 sm:py-16">
                        <div className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full bg-sky-400/20 blur-[90px]" aria-hidden="true" />
                        <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
                            <div className="max-w-2xl">
                                <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-sky-200"><ShieldCheck className="h-4 w-4" /> Find your people, nearby</div>
                                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Your next good plan could be just around the corner.</h2>
                                <p className="mt-4 text-blue-100">Get NearWe and discover what is happening in your city.</p>
                            </div>
                            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                                <a href={PLAY_STORE_URL} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 font-semibold text-slate-900 transition-colors hover:bg-blue-50">
                                    <img src={playstoreLogo} alt="" className="h-5 w-5 object-contain" /> Google Play
                                </a>
                                <a href={APP_STORE_URL} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 px-5 py-3 font-semibold text-white transition-colors hover:bg-white/10">
                                    <img src={iosLogo} alt="" className="h-5 w-5 object-contain" /> App Store
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <SiteFooter />
        </div>
    );
}