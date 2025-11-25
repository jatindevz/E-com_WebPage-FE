"use client";
import { supabase } from "@/lib/supabaseClient";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginPopup({ isOpen, onClose, onLoginSuccess }) {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [step, setStep] = useState(1); // 1: email, 2: success
    const popupRef = useRef(null);

    const handleLogin = async () => {
        if (!email) {
            setMessage("Please enter your email");
            return;
        }

        setIsLoading(true);
        setMessage("");

        try {
            const { error } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: "https://e-com-web-page-fe.vercel.app"
                }
            });


            if (error) {
                setMessage(error.message);
            } else {
                setMessage("✨ Magic link sent! Check your email");
                setStep(2);
                setTimeout(() => {
                    onClose();
                    if (onLoginSuccess) onLoginSuccess();
                }, 3000);
            }
        } catch (error) {
            setMessage("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleLogin();
        }
        if (e.key === "Escape") {
            onClose();
        }
    };

    // Reset form when popup opens/closes
    useEffect(() => {
        if (isOpen) {
            setEmail("");
            setMessage("");
            setStep(1);
        }
    }, [isOpen]);

    // Close on backdrop click
    useEffect(() => {
        function handleClickOutside(event) {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                onClose();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl"
                >
                    {/* Animated Background Particles */}
                    <div className="absolute inset-0 overflow-hidden">
                        {[...Array(20)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-2 h-2 bg-coral-red/20 rounded-full"
                                initial={{
                                    x: 1 * 100 + 'vw',
                                    y: 1 * 100 + 'vh',
                                }}
                                animate={{
                                    y: [0, -30, 0],
                                    opacity: [0.3, 0.7, 0.3],
                                }}
                                transition={{
                                    duration: 3 + Math.random() * 2,
                                    repeat: Infinity,
                                    delay: Math.random() * 2,
                                }}
                            />
                        ))}
                    </div>

                    <motion.div
                        ref={popupRef}
                        initial={{ scale: 0.8, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: 50 }}
                        transition={{
                            type: "spring",
                            damping: 25,
                            stiffness: 300
                        }}
                        className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-md w-full p-8 border border-white/20 dark:border-gray-700/50"
                    >
                        {/* Close Button */}
                        <motion.button
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={onClose}
                            className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-gray-100 dark:bg-gray-800 rounded-full transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </motion.button>

                        {/* Animated Header */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-center mb-8"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    type: "spring",
                                    delay: 0.2,
                                    stiffness: 200
                                }}
                                className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-coral-red to-red-500 rounded-2xl flex items-center justify-center shadow-2xl"
                            >
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </motion.div>

                            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-coral-red dark:from-white dark:to-red-400 bg-clip-text text-transparent">
                                Welcome Back
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg">
                                {step === 1 ? "Sign in to continue your journey" : "Check your email! 🎉"}
                            </p>
                        </motion.div>

                        <AnimatePresence mode="wait">
                            {step === 1 ? (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {/* Email Input */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="mb-6"
                                    >
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                            Email Address
                                        </label>
                                        <motion.input
                                            whileFocus={{ scale: 1.02 }}
                                            id="email"
                                            type="email"
                                            placeholder="Enter your email"
                                            className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-coral-red/20 focus:border-coral-red transition-all duration-300"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            onKeyDown={handleKeyPress}
                                            disabled={isLoading}
                                        />
                                    </motion.div>

                                    {/* Message */}
                                    <AnimatePresence>
                                        {message && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className={`p-4 rounded-2xl mb-6 text-sm ${message.includes("error") || message.includes("Please enter")
                                                    ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 border border-red-200 dark:border-red-800"
                                                    : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 border border-green-200 dark:border-green-800"
                                                    }`}
                                            >
                                                {message}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Login Button */}
                                    <motion.button
                                        whileHover={{
                                            scale: isLoading ? 1 : 1.02,
                                            boxShadow: "0 20px 40px rgba(249, 72, 72, 0.3)"
                                        }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full bg-gradient-to-r from-coral-red to-red-500 text-white py-4 rounded-2xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 relative overflow-hidden group"
                                        onClick={handleLogin}
                                        disabled={isLoading}
                                    >
                                        <div className="relative z-10 flex items-center justify-center">
                                            {isLoading ? (
                                                <>
                                                    <motion.svg
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                        className="w-5 h-5 mr-3"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v4m0 12v4m8-10h-4M8 12H4m13.657-5.657l-2.828 2.828m-9.9 9.9l-2.828 2.828m14.142 0l-2.828-2.828M6.343 6.343l-2.828-2.828" />
                                                    </motion.svg>
                                                    Sending Magic...
                                                </>
                                            ) : (
                                                <>
                                                    <motion.span
                                                        initial={{ x: -20, opacity: 0 }}
                                                        animate={{ x: 0, opacity: 1 }}
                                                        transition={{ delay: 0.2 }}
                                                    >
                                                        ✨
                                                    </motion.span>
                                                    <span className="mx-2">Send Magic Link</span>
                                                    <motion.span
                                                        initial={{ x: 20, opacity: 0 }}
                                                        animate={{ x: 0, opacity: 1 }}
                                                        transition={{ delay: 0.2 }}
                                                    >
                                                        🚀
                                                    </motion.span>
                                                </>
                                            )}
                                        </div>

                                        {/* Animated background */}
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-red-500 to-coral-red opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            initial={false}
                                            animate={{ x: isLoading ? [-100, 100] : 0 }}
                                            transition={{
                                                x: {
                                                    repeat: isLoading ? Infinity : 0,
                                                    duration: 1.5,
                                                    ease: "easeInOut"
                                                }
                                            }}
                                        />
                                    </motion.button>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="text-center py-8"
                                >
                                    {/* Success Animation */}
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{
                                            type: "spring",
                                            delay: 0.2,
                                            stiffness: 200
                                        }}
                                        className="w-24 h-24 mx-auto mb-6 bg-green-500 rounded-full flex items-center justify-center shadow-2xl"
                                    >
                                        <motion.svg
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ duration: 0.5, delay: 0.5 }}
                                            className="w-12 h-12 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </motion.svg>
                                    </motion.div>

                                    <motion.h3
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
                                    >
                                        Check Your Email!
                                    </motion.h3>

                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 }}
                                        className="text-gray-600 dark:text-gray-300 text-lg"
                                    >
                                        We sent a magic link to <br />
                                        <span className="font-semibold text-coral-red">{email}</span>
                                    </motion.p>

                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.8 }}
                                        className="mt-6 text-sm text-gray-500 dark:text-gray-400"
                                    >
                                        Closing automatically...
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Footer */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-6 text-center"
                        >
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Secure authentication powered by Supabase
                            </p>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}