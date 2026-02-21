import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function ProgressBar() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let timer;
        const handleStart = (url) => {
            if (url !== router.asPath) {
                setLoading(true);
                setProgress(5);
                timer = setInterval(() => {
                    setProgress((old) => {
                        const next = old + Math.random() * 15;
                        return next > 90 ? 90 : next;
                    });
                }, 300);
            }
        };

        const handleComplete = () => {
            setProgress(100);
            clearInterval(timer);
            setTimeout(() => {
                setLoading(false);
                setProgress(0);
            }, 300);
        };

        router.events.on("routeChangeStart", handleStart);
        router.events.on("routeChangeComplete", handleComplete);
        router.events.on("routeChangeError", handleComplete);

        return () => {
            clearInterval(timer);
            router.events.off("routeChangeStart", handleStart);
            router.events.off("routeChangeComplete", handleComplete);
            router.events.off("routeChangeError", handleComplete);
        };
    }, [router]);

    if (!loading) return null;

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "3px",
                zIndex: 9999,
                pointerEvents: "none",
            }}
        >
            <div
                style={{
                    width: `${progress}%`,
                    height: "100%",
                    backgroundColor: "var(--accent, #3b82f6)",
                    transition: "width 0.2s ease-out",
                    boxShadow: "0 0 10px var(--accent, #3b82f6), 0 0 5px var(--accent, #3b82f6)",
                }}
            />
        </div>
    );
}
