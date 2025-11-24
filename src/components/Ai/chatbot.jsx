"use client";
import { useState } from "react";

export default function Chatbot() {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const handleSend = () => {
        if (!message.trim()) return;

        // Add user message
        setMessages(prev => [...prev, { sender: "user", text: message }]);
        setMessage("");

        // Placeholder bot response
        setTimeout(() => {
            setMessages(prev => [
                ...prev,
                { sender: "bot", text: "I'm still learning, but this will eventually respond using AI 😊" }
            ]);
        }, 700);
    };

    return (
        <div className="z-20">
            {/* Floating Button */}
            <button
                onClick={() => setOpen(!open)}
                className="fixed bottom-5 right-5 bg-coral-red text-white p-4 rounded-full shadow-lg hover:bg-red-600 transition"
            >
                💬
            </button>

            {/* Chat Window */}
            {open && (
                <div className="fixed bottom-20 right-5 w-80 h-96 bg-white dark:bg-gray-800 shadow-xl rounded-lg border border-gray-200 dark:border-gray-700 flex flex-col">

                    {/* Header */}
                    <div className="p-4 bg-coral-red text-white rounded-t-lg font-semibold flex justify-between">
                        AI Assistant
                        <button onClick={() => setOpen(false)}>✖</button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-3 space-y-3">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`p-2 rounded-lg text-sm max-w-[80%] ${msg.sender === "user"
                                        ? "bg-coral-red text-white ml-auto"
                                        : "bg-gray-200 dark:bg-gray-700 dark:text-gray-100"
                                    }`}
                            >
                                {msg.text}
                            </div>
                        ))}
                    </div>

                    {/* Input */}
                    <div className="p-3 border-t dark:border-gray-700 flex gap-2">
                        <input
                            type="text"
                            className="flex-1 border rounded-lg px-3 py-2 dark:bg-gray-900 dark:text-white"
                            placeholder="Type a message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        />
                        <button
                            onClick={handleSend}
                            className="bg-coral-red text-white px-3 py-2 rounded-lg hover:bg-red-600"
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
