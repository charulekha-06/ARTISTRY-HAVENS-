"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, Suspense } from "react";
import { cn } from "@/lib/utils";
import { User, Store, HandHeart } from "lucide-react";
import Image from "next/image";

import artisanImg from "@/public/artisan.jpg";
import buyerImg from "@/public/buyer.png";
import sponsorImg from "@/public/sponsor.png";

// Translations for Roles
const translations: Record<string, { title: string; subtitle: string; artisan: string; buyer: string; sponsor: string; continue: string }> = {
    en: { title: "Choose your category", subtitle: "How will you participate in Artistry Havens?", artisan: "Artisan", buyer: "Buyer", sponsor: "Sponsor", continue: "Continue" },
    hi: { title: "अपनी श्रेणी चुनें", subtitle: "आप आर्टिस्ट्री हेवेन्स में कैसे भाग लेंगे?", artisan: "कारीगर", buyer: "खरीदार", sponsor: "प्रायोजक", continue: "जारी रखें" },
    ml: { title: "നിങ്ങളുടെ വിഭാഗം തിരഞ്ഞെടുക്കുക", subtitle: "നിങ്ങൾ ആർട്ടിസ്ട്രി ഹാവെൻസിൽ എങ്ങനെ പങ്കെടുക്കും?", artisan: "കലാകാരൻ", buyer: "വാങ്ങുന്നയാൾ", sponsor: "സ്പോൺസർ", continue: "തുടരുക" },
    ta: { title: "உங்கள் வகையைத் தேர்ந்தெடுக்கவும்", subtitle: "ஆர்டிஸ்ட்ரி ஹேவன்ஸில் நீங்கள் எவ்வாறு பங்கேற்பீர்கள்?", artisan: "கலைஞர்", buyer: "வாங்குபவர்", sponsor: "ஸ்பான்சர்", continue: "தொடரவும்" },
    ur: { title: "اپنی قسم منتخب کریں", subtitle: "آپ آرٹسٹری ہیونز میں کیسے حصہ لیں گے؟", artisan: "کاریگر", buyer: "خریدار", sponsor: "اسپانسر", continue: "جاری رکھیں" },
    kn: { title: "ನಿಮ್ಮ ವರ್ಗವನ್ನು ಆಯ್ಕೆಮಾಡಿ", subtitle: "ನೀವು ಆರ್ಟಿಸ್ಟ್ರಿ ಹ್ಯಾವೆನ್ಸ್‌ನಲ್ಲಿ ಹೇಗೆ ಭಾಗವಹಿಸುತ್ತೀರಿ?", artisan: "ಕುಶಲಕರ್ಮಿ", buyer: "ಖರೀದಿದಾರ", sponsor: "ಪ್ರಾಯೋಜಕ", continue: "ಮುಂದುಾಯಿಸಿ" },
    mr: { title: "तुमची श्रेणी निवडा", subtitle: "तुम्ही आर्टिस्ट्री हेवेन्समध्ये कसे सहभागी व्हाल?", artisan: "कारागीर", buyer: "ग्राहक", sponsor: "प्रायोजक", continue: "पुढे चालू ठेवा" },
};

function RoleSelectionContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const lang = searchParams.get("lang") || "en";
    const t = translations[lang] || translations.en;

    const [selectedRole, setSelectedRole] = useState<"artisan" | "buyer" | "sponsor" | null>(null);

    const handleContinue = () => {
        if (selectedRole) {
            localStorage.setItem("user-role", selectedRole);
            router.push("/auth?role=" + selectedRole);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-background p-6">
            <div className="flex-1 flex flex-col items-center pt-10 space-y-6">
                <h1 className="text-3xl font-serif font-bold text-foreground text-center">
                    {t.title}
                </h1>
                <p className="text-muted-foreground text-center">
                    {t.subtitle}
                </p>

                <div className="w-full max-w-lg grid grid-cols-2 gap-4">
                    <button
                        onClick={() => setSelectedRole("artisan")}
                        className={cn(
                            "flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200",
                            selectedRole === "artisan"
                                ? "border-primary bg-primary/5 shadow-md scale-105"
                                : "border-border bg-card hover:border-primary/50"
                        )}
                    >
                        <div className="h-40 w-40 mb-2 relative rounded-md overflow-hidden flex-shrink-0">
                            <Image
                                src={artisanImg}
                                alt="Artisan"
                                fill
                                className="object-cover"
                                placeholder="blur"
                                priority
                            />
                        </div>
                        <span className="text-lg font-medium text-foreground">{t.artisan}</span>
                    </button>

                    <button
                        onClick={() => setSelectedRole("buyer")}
                        className={cn(
                            "flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200",
                            selectedRole === "buyer"
                                ? "border-primary bg-primary/5 shadow-md scale-105"
                                : "border-border bg-card hover:border-primary/50"
                        )}
                    >
                        <div className="h-40 w-40 mb-2 relative rounded-md overflow-hidden flex-shrink-0">
                            <Image
                                src={buyerImg}
                                alt="Buyer"
                                fill
                                className="object-cover"
                                placeholder="blur"
                                priority
                            />
                        </div>
                        <span className="text-lg font-medium text-foreground">{t.buyer}</span>
                    </button>

                    <button
                        onClick={() => setSelectedRole("sponsor")}
                        className={cn(
                            "flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 col-span-2 sm:col-span-1 sm:col-start-2",
                            selectedRole === "sponsor"
                                ? "border-primary bg-primary/5 shadow-md scale-105"
                                : "border-border bg-card hover:border-primary/50"
                        )}
                    >
                        <div className="h-40 w-40 mb-2 relative rounded-md overflow-hidden flex-shrink-0">
                            <Image
                                src={sponsorImg}
                                alt="Sponsor"
                                fill
                                className="object-cover"
                                placeholder="blur"
                                priority
                            />
                        </div>
                        <span className="text-lg font-medium text-foreground">{t.sponsor}</span>
                    </button>
                </div>
            </div>

            <div className="pb-10">
                <button
                    onClick={handleContinue}
                    disabled={!selectedRole}
                    className={cn(
                        "w-full py-4 rounded-full font-bold text-lg transition-all duration-200",
                        selectedRole
                            ? "bg-primary text-primary-foreground shadow-lg hover:bg-primary/90"
                            : "bg-muted text-muted-foreground cursor-not-allowed"
                    )}
                >
                    {t.continue}
                </button>
            </div>
        </div>
    );
}

export default function RoleSelectionPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <RoleSelectionContent />
        </Suspense>
    );
}
