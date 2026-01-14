"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function SplashScreen() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Hide splash screen after 2.5 seconds
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background transition-opacity duration-700 animate-out fade-out">
            <div className="relative w-64 h-64 md:w-96 md:h-96 animate-in zoom-in-50 duration-700">
                <Image
                    src="/splash-image.jpg"
                    alt="Artistry Havens"
                    fill
                    className="object-contain"
                    priority
                />
            </div>
            <h1 className="mt-8 text-2xl font-serif font-bold text-primary animate-pulse">
                Artistry Havens
            </h1>
        </div>
    );
}
