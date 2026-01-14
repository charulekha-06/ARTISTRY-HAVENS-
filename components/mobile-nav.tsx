"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, PlusSquare, MessageCircle, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileNav() {
    const pathname = usePathname();

    const navItems = [
        { href: "/", label: "Home", icon: Home },
        { href: "/explore", label: "Explore", icon: Compass },
        { href: "/create", label: "Create", icon: PlusSquare },
        { href: "/inbox", label: "Inbox", icon: MessageCircle },
        { href: "/profile", label: "Profile", icon: User },
    ];

    // Hide mobile nav on auth pages and onboarding
    if (pathname?.startsWith("/auth") || pathname?.startsWith("/onboarding")) {
        return null;
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-background/80 backdrop-blur-md pb-safe-area-inset-bottom z-50 md:hidden">
            <nav className="flex items-center justify-around h-16">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center w-full h-full space-y-1",
                                isActive
                                    ? "text-primary"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <Icon className="h-6 w-6" />
                            <span className="text-[10px] font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
