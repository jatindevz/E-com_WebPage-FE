'use client'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function LoadingPage() {
    const [progress, setProgress] = useState(0)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)

        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval)
                    return 100
                }
                return prev + Math.random() * 15
            })
        }, 200)

        return () => clearInterval(interval)
    }, [])

    if (!mounted) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Floating Shapes */}
                <motion.div
                    className="absolute top-1/4 left-1/4 w-20 h-20 bg-coral-red/10 rounded-full blur-xl"
                    animate={{
                        y: [0, -30, 0],
                        x: [0, 20, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute top-3/4 right-1/4 w-16 h-16 bg-blue-500/10 rounded-full blur-xl"
                    animate={{
                        y: [0, 40, 0],
                        x: [0, -20, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                />
                <motion.div
                    className="absolute bottom-1/4 left-3/4 w-24 h-24 bg-green-500/10 rounded-full blur-xl"
                    animate={{
                        y: [0, -50, 0],
                        x: [0, 30, 0],
                        scale: [1, 1.3, 1],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                />
            </div>

            <div className="text-center relative z-10">
                {/* Main Logo/Icon */}
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        duration: 1
                    }}
                    className="mb-8"
                >
                    <div className="w-24 h-24 mx-auto bg-gradient-to-r from-coral-red to-red-500 rounded-2xl flex items-center justify-center shadow-2xl">
                        <motion.svg
                            animate={{
                                rotate: 360,
                                scale: [1, 1.1, 1]
                            }}
                            transition={{
                                rotate: {
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "linear"
                                },
                                scale: {
                                    duration: 1,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }
                            }}
                            className="w-12 h-12 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </motion.svg>
                    </div>
                </motion.div>

                {/* Loading Text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-12"
                >
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-coral-red dark:from-white dark:to-red-400 bg-clip-text text-transparent mb-4">
                        Loading Experience
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 text-lg">
                        Preparing something amazing for you
                    </p>
                </motion.div>

                {/* Progress Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="w-80 mx-auto mb-8"
                >
                    <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
                        <span>Loading...</span>
                        <span>{Math.min(100, Math.round(progress))}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ type: "spring", damping: 25 }}
                            className="h-full bg-gradient-to-r from-coral-red to-red-500 rounded-full relative overflow-hidden"
                        >
                            {/* Shine effect */}
                            <motion.div
                                className="absolute inset-0 bg-white/30"
                                animate={{
                                    x: [-100, 300],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Loading Dots */}
                <motion.div className="flex justify-center space-x-2">
                    {[0, 1, 2].map((index) => (
                        <motion.div
                            key={index}
                            className="w-3 h-3 bg-coral-red rounded-full"
                            animate={{
                                y: [0, -10, 0],
                                opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: index * 0.2,
                            }}
                        />
                    ))}
                </motion.div>

                {/* Subtle Tips */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-12"
                >
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                        "Good things come to those who wait"
                    </p>
                </motion.div>
            </div>

            {/* Corner Accents */}
            <div className="absolute top-8 left-8 w-4 h-4 border-t-2 border-l-2 border-coral-red opacity-50"></div>
            <div className="absolute top-8 right-8 w-4 h-4 border-t-2 border-r-2 border-coral-red opacity-50"></div>
            <div className="absolute bottom-8 left-8 w-4 h-4 border-b-2 border-l-2 border-coral-red opacity-50"></div>
            <div className="absolute bottom-8 right-8 w-4 h-4 border-b-2 border-r-2 border-coral-red opacity-50"></div>
        </div>
    )
}

// Optional: A simpler loading spinner component for inline use
export function LoadingSpinner({ size = "medium", text = "Loading..." }) {
    const sizeClasses = {
        small: "w-8 h-8",
        medium: "w-12 h-12",
        large: "w-16 h-16"
    }

    return (
        <div className="flex flex-col items-center justify-center p-8">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className={`${sizeClasses[size]} border-4 border-gray-200 border-t-coral-red rounded-full`}
            />
            {text && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-4 text-gray-600 dark:text-gray-400 text-sm"
                >
                    {text}
                </motion.p>
            )}
        </div>
    )
}

