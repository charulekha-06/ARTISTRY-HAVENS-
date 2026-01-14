"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Phone, ArrowRight, Loader2, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// Add types to window
declare global {
    interface Window {
        recaptchaVerifier: any;
    }
}

function AuthPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const role = searchParams.get("role") || "buyer";

    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [verificationId, setVerificationId] = useState<ConfirmationResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [step, setStep] = useState<"phone" | "otp">("phone");

    useEffect(() => {
        // Check if auth is properly initialized
        if (!auth || !auth.app) {
            setMessage("Error: Firebase configuration missing. Check your .env file.");
            console.error("Firebase Auth not initialized. Missing API Key?");
            return;
        }

        if (!window.recaptchaVerifier) {
            try {
                window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
                    size: "invisible",
                    callback: () => {
                        // reCAPTCHA solved, allow signInWithPhoneNumber.
                    },
                });
            } catch (e: any) {
                console.error("RecaptchaVerifier error:", e);
                setMessage("Error initializing reCAPTCHA: " + e.message);
            }
        }
    }, []);

    const sendOtp = async () => {
        setLoading(true);
        setMessage("");
        try {
            const formattedPhone = phoneNumber.startsWith("+") ? phoneNumber : `+91${phoneNumber}`;
            const appVerifier = window.recaptchaVerifier;
            const confirmationResult = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
            setVerificationId(confirmationResult);
            setStep("otp");
            setMessage("OTP sent successfully!");
        } catch (error: any) {
            console.error(error);
            setMessage("Error sending OTP: " + error.message);
            // Reset recaptcha on error so user can try again
            if (window.recaptchaVerifier) {
                window.recaptchaVerifier.clear();
                window.recaptchaVerifier = null;
            }
        } finally {
            setLoading(false);
        }
    };

    const verifyOtp = async () => {
        if (!verificationId) return;
        setLoading(true);
        setMessage("");
        try {
            await verificationId.confirm(otp);
            setMessage("Verified successfully!");
            // Redirect to home/dashboard or profile setup
            setTimeout(() => {
                router.push("/");
            }, 1000);
        } catch (error: any) {
            console.error(error);
            setMessage("Invalid OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-background p-6">
            <div className="flex-1 flex flex-col items-center justify-center space-y-8">
                <div className="w-full max-w-sm space-y-6">
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-serif font-bold text-foreground">
                            {step === "phone" ? "Enter Phone Number" : "Verify OTP"}
                        </h1>
                        <p className="text-muted-foreground">
                            {step === "phone"
                                ? `Log in as ${role} to continue`
                                : `Enter the code sent to ${phoneNumber}`}
                        </p>
                    </div>

                    {step === "phone" ? (
                        <div className="space-y-4">
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <input
                                    type="tel"
                                    placeholder="Phone Number (e.g., 9876543210)"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50"
                                />
                            </div>
                            <div id="recaptcha-container"></div>
                            <button
                                onClick={sendOtp}
                                disabled={loading || !phoneNumber}
                                className="w-full py-3 rounded-full font-bold text-lg bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Send OTP"}
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Enter 6-digit OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 text-center tracking-widest text-lg"
                                maxLength={6}
                            />
                            <button
                                onClick={verifyOtp}
                                disabled={loading || otp.length !== 6}
                                className="w-full py-3 rounded-full font-bold text-lg bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Verify OTP"}
                            </button>
                            <button
                                onClick={() => setStep("phone")}
                                className="w-full text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                                Change Phone Number
                            </button>
                        </div>
                    )}

                    {message && (
                        <div className={cn("text-center text-sm font-medium", message.includes("Error") || message.includes("Invalid") ? "text-red-500" : "text-green-500")}>
                            {message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function AuthPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <AuthPageContent />
        </Suspense>
    );
}
