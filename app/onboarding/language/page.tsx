"use client";

import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const languages = [
    { code: "en", name: "English", localName: "English" },
    { code: "hi", name: "Hindi", localName: "हिंदी" },
    { code: "es", name: "Spanish", localName: "Español" },
    { code: "fr", name: "French", localName: "Français" },
];

export default function LanguageSelectionPage() {
    const router = useRouter();
    const [selectedLang, setSelectedLang] = useState<string | null>(null);

    const handleContinue = () => {
        if (selectedLang) {
            // Save language preference (e.g., to localStorage or context)
            localStorage.setItem("user-language", selectedLang);
            // Navigate to the next step (e.g., Authentication or Home)
            router.push("/auth?role=buyer"); // Defaulting to buyer auth flow for now or home
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-background p-6">
            <div className="flex-1 flex flex-col items-center pt-20 space-y-8">
                <h1 className="text-3xl font-serif font-bold text-foreground text-center">
                    Choose your language
                </h1>
                <p className="text-muted-foreground text-center">
                    Select your preferred language to continue.
                </p>

                <div className="w-full max-w-sm space-y-4">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => setSelectedLang(lang.code)}
                            className={cn(
                                "w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200",
                                selectedLang === lang.code
                                    ? "border-primary bg-primary/5 shadow-md"
                                    : "border-border bg-card hover:border-primary/50"
                            )}
                        >
                            <div className="flex flex-col items-start">
                                <span className="text-lg font-medium text-foreground">
                                    {lang.localName}
                                </span>
                                <span className="text-sm text-muted-foreground">{lang.name}</span>
                            </div>
                            {selectedLang === lang.code && (
                                <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                                    <Check className="h-4 w-4 text-primary-foreground" />
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <div className="pb-10">
                <button
                    onClick={handleContinue}
                    disabled={!selectedLang}
                    className={cn(
                        "w-full py-4 rounded-full font-bold text-lg transition-all duration-200",
                        selectedLang
                            ? "bg-primary text-primary-foreground shadow-lg hover:bg-primary/90"
                            : "bg-muted text-muted-foreground cursor-not-allowed"
                    )}
                >
                    Continue
                </button>
            </div>
        </div>
    );
}
