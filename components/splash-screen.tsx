"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function SplashScreen() {
    const router = useRouter();
    useEffect(() => {
        // Redirect to onboarding after 2 seconds
        const timer = setTimeout(() => {
            router.push("/onboarding/language");
        }, 2000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-700 animate-out fade-out">
            <div className="absolute inset-0 animate-in zoom-in-50 duration-700">
                <Image
                    src="/splash-image.jpg"
                    alt="Artistry Havens"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-black/30" />
            </div>
            <h1 className="relative z-10 mt-8 text-4xl font-serif font-bold text-white animate-pulse drop-shadow-md">
                Artistry Havens
            </h1>
        </div>
    );
}
