export type Client = {
    name: string;
    detail: string;
    logo?: string;
    /** Turn a dark logo white so it shows on the dark background. */
    invert?: boolean;
    style?: string;
};

export const clients: Client[] = [
    { name: "Reformia", detail: "Saudi Arabia · Consulting", logo: "/assets/reformia.svg", invert: true },
    { name: "Cresco", detail: "Business client", logo: "/assets/cresco.png", invert: true },
    { name: "Cloudflare", detail: "Technology client", logo: "https://cdn.simpleicons.org/cloudflare/F38020", style: "text-2xl font-bold tracking-tight text-white" },
    { name: "Salesforce", detail: "Business client", logo: "/assets/Salesforce-Logo.png" },
    { name: "Leading oil corporation", detail: "India · Energy", style: "text-sm font-bold uppercase tracking-[0.12em] text-white" },
    { name: "Oracle", detail: "United States · Technology", logo: "/assets/Oracle-Logo-1.png" },
];

const carouselStyles = `
@keyframes nwc-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
.nwc-viewport { overflow: hidden; -webkit-mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent); mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent); }
.nwc-track { display: flex; width: max-content; animation: nwc-marquee 30s linear infinite; }
.nwc-viewport:hover .nwc-track { animation-play-state: paused; }
@media (prefers-reduced-motion: reduce) { .nwc-track { animation: none; flex-wrap: wrap; width: auto; justify-content: center; } .nwc-dup { display: none; } }
`;

function ClientItem({ client, hidden }: { client: Client; hidden?: boolean }) {
    return (
        <div aria-hidden={hidden || undefined} className={`flex h-20 w-48 shrink-0 flex-col items-center justify-center gap-1.5 px-6 ${hidden ? "nwc-dup" : ""}`}>
            {client.logo ? (
                <img
                    src={client.logo}
                    alt={hidden ? "" : `${client.name} logo`}
                    loading="lazy"
                    className={`h-10 w-auto max-w-[150px] object-contain opacity-80 transition-opacity hover:opacity-100 ${client.invert ? "brightness-0 invert" : ""}`}
                />
            ) : (
                <span className={`text-center leading-tight ${client.style ?? ""}`}>{client.name}</span>
            )}
            <span className="text-[9px] uppercase tracking-[0.12em] text-gray-500">{client.detail}</span>
        </div>
    );
}

/** Auto-scrolling strip of client logos. Pauses on hover. */
export default function ClientsCarousel({ className = "" }: { className?: string }) {
    return (
        <section aria-label="Clients we’ve worked with" className={className}>
            <style>{carouselStyles}</style>
            <p className="mb-4 text-center text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-300/80">Trusted by teams at</p>
            <div className="nwc-viewport">
                <div className="nwc-track">
                    {clients.map((client) => <ClientItem key={client.name} client={client} />)}
                    {clients.map((client) => <ClientItem key={`dup-${client.name}`} client={client} hidden />)}
                </div>
            </div>
        </section>
    );
}
