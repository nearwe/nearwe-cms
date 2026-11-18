import React, {
    ReactNode,
    createContext,
    useContext,
    useState,
    useCallback,
    useEffect,
    useRef
} from "react";
import popSound from '../assets/sounds/pop.wav'

type NotificationType = "success" | "error" | "warning";

type Notification = {
    id: number;
    title: string;
    description: string;
    type: NotificationType;
    duration: number;
};

const NotificationContext = createContext({
    showNotification: (
        title: string,
        desc: string,
        type: NotificationType,
        duration: number
    ) => { },
});
interface NotificationProviderProps {
    children: ReactNode;
}
export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context)
        throw new Error("useNotification must be used inside NotificationProvider");
    return context;
};

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const audioRef: any = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        audioRef.current = new Audio(popSound);
        audioRef.current.volume = 0.1;
    }, []);
    const removeNotification = useCallback((id: number) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, []);

    const showNotification = useCallback(
        (
            title: string,
            description: string,
            type: NotificationType,
            duration = 3000
        ) => {
            const id = Date.now() + Math.random();
            const newNotification: Notification = {
                id,
                title,
                description,
                type,
                duration,
            };

            setNotifications((prev) => [...prev, newNotification]);
            if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play()?.catch(() => undefined);
            }
            setTimeout(() => {
                removeNotification(id);
            }, duration);
        },
        [removeNotification]
    );

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            <div className="pointer-events-none fixed top-6 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2 items-center w-full px-4" aria-live="polite">
                {notifications?.map((notification: Notification) => {
                    const tone =
                        notification.type === "success"
                            ? { bar: "bg-green-500", dot: "bg-green-500", ring: "border-green-200" }
                            : notification.type === "error"
                                ? { bar: "bg-red-500", dot: "bg-red-500", ring: "border-red-200" }
                                : { bar: "bg-amber-400", dot: "bg-amber-400", ring: "border-amber-200" };
                    return (
                        <div
                            key={notification.id}
                            role="status"
                            className={`pointer-events-auto relative w-full max-w-[320px] overflow-hidden rounded-xl border ${tone.ring} bg-white px-4 py-3 pr-9 text-left shadow-lg shadow-slate-900/10 animate-bounceIn`}
                        >
                            <div className="flex items-start gap-2.5">
                                <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${tone.dot}`} />
                                <div className="min-w-0">
                                    <div className="text-sm font-semibold leading-tight text-slate-900">{notification.title}</div>
                                    <div className="mt-0.5 text-xs leading-snug text-slate-600">{notification.description}</div>
                                </div>
                            </div>

                            <button
                                type="button"
                                aria-label="Dismiss notification"
                                onClick={() => removeNotification(notification.id)}
                                className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-md text-xs text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                            >
                                ✕
                            </button>

                            {/* Time-remaining bar */}
                            <div
                                className={`absolute bottom-0 left-0 h-0.5 w-full ${tone.bar}`}
                                style={{
                                    transform: "translateX(-100%)",
                                    animation: `fillProgress ${notification.duration}ms linear forwards`,
                                }}
                            />
                        </div>
                    );
                })}
            </div>

        </NotificationContext.Provider>
    );
};
