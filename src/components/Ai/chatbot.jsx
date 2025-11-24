"use client";
import { useState, useRef, useEffect } from "react";
import { GoogleGenAI } from "@google/genai";
import { sysPrompt } from "@/lib/helper";

export default function Chatbot() {
    const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GOOGLE_GENAI_API_KEY });
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const prompt = `Conversation so far:${messages} User: ${message} AI: Go ahead and answer.`;

    const handleSend = async () => {
        if (!message.trim()) return;

        // Add user message immediately
        const userMessage = { sender: "user", text: message };
        setMessages(prev => [...prev, userMessage]);
        setMessage("");
        setIsTyping(true);

        // Focus input again
        inputRef.current?.focus();

        try {
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
                config: {
                    systemInstruction: sysPrompt,
                },
            });

            // Simulate typing delay for better UX
            setTimeout(() => {
                setMessages(prev => [
                    ...prev,
                    { sender: "bot", text: response.text }
                ]);
                setIsTyping(false);
            }, 1000);

        } catch (error) {
            console.error("AI Error:", error);
            setMessages(prev => [
                ...prev,
                { sender: "bot", text: "Sorry, I'm having trouble responding right now. Please try again." }
            ]);
            setIsTyping(false);
        }
    };

    return (
        <div className="fixed bottom-5 right-5 z-[9999]">
            {/* Enhanced Floating Button with Animation */}
            <button
                onClick={() => setOpen(!open)}
                className={`fixed bottom-5 right-5 bg-gradient-to-r from-coral-red to-red-500 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 group ${open ? 'rotate-90 scale-0' : 'rotate-0 scale-100'
                    }`}
            >
                <div className="relative">
                   <span className="text-lg inline-block"> <img src="/cb.svg" alt="Chatbot" className="w-12 h-12 block" /> </span>
                    {/* Pulsing animation */}
                    <div className="absolute inset-0 rounded-full bg-coral-red animate-ping opacity-20 group-hover:opacity-40"></div>
                </div>
            </button>

            {/* Enhanced Chat Window with Animations */}
            <div className={`fixed bottom-20 right-5 w-[400px] h-[600px] bg-white dark:bg-gray-800 shadow-2xl rounded-2xl border border-gray-200 dark:border-gray-700 flex flex-col transform transition-all duration-300 ${open
                    ? 'opacity-100 scale-100 translate-y-0'
                    : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
                }`}>

                {/* Enhanced Header */}
                <div className="p-4 bg-gradient-to-r from-coral-red to-red-500 text-white rounded-t-2xl font-semibold flex justify-between items-center shadow-lg">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <span>AI Assistant</span>
                    </div>
                    <button
                        onClick={() => setOpen(false)}
                        className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors duration-200"
                    >
                        ✕
                    </button>
                </div>

                {/* Enhanced Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 dark:bg-gray-900/50">
                    {messages.length === 0 && (
                        <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
                            <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-r from-coral-red to-red-500 rounded-full flex items-center justify-center">
                                <span className="text-2xl">🤖</span>
                            </div>
                            <p className="text-sm">Hello! How can I help you today?</p>
                        </div>
                    )}

                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`p-3 rounded-2xl text-sm max-w-[85%] transform transition-all duration-200 hover:scale-[1.02] ${msg.sender === "user"
                                        ? "bg-gradient-to-r from-coral-red to-red-500 text-white rounded-br-none shadow-lg"
                                        : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none shadow-lg border border-gray-100 dark:border-gray-600"
                                    }`}
                            >
                                {msg.text}
                                <div className={`text-xs opacity-50 mt-1 text-right ${msg.sender === "user" ? "text-white/70" : "text-gray-500"
                                    }`}>
                                    {msg.sender === "user" ? "You" : "AI"}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="bg-white dark:bg-gray-700 p-3 rounded-2xl rounded-bl-none shadow-lg">
                                <div className="flex space-x-1">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Enhanced Input Area */}
                <div className="p-4 border-t dark:border-gray-700 bg-white dark:bg-gray-800 rounded-b-2xl">
                    <div className="flex gap-2">
                        <input
                            ref={inputRef}
                            type="text"
                            className="flex-1 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-coral-red/50 focus:border-transparent transition-all duration-200"
                            placeholder="Type your message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            disabled={isTyping}
                        />
                        <button
                            onClick={handleSend}
                            disabled={!message.trim() || isTyping}
                            className="bg-gradient-to-r from-coral-red to-red-500 text-white px-4 py-3 rounded-xl hover:shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-none transition-all duration-200 flex items-center justify-center min-w-[60px]"
                        >
                            {isTyping ? (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            )}
                        </button>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
                        Powered by Gemini AI
                    </p>
                </div>
            </div>

            {/* Backdrop */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/10 z-[-1]"
                    onClick={() => setOpen(false)}
                />
            )}
        </div>
    );
}