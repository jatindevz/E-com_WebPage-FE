"use client";
import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");

    const handleLogin = async () => {
        const { error } = await supabase.auth.signInWithOtp({ email });

        if (error) console.log(error.message);
        else alert("Check your email for login link.");
    };

    return (
        <section className="max-w-lg mx-auto p-10">
            <h1 className="text-3xl font-bold mb-5">Login</h1>

            <input
                type="email"
                placeholder="Email"
                className="border px-3 py-2 rounded w-full dark:bg-gray-900"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <button
                className="mt-5 w-full bg-coral-red text-white py-2 rounded hover:bg-coral-red/80"
                onClick={handleLogin}
            >
                Send Sign-in Email
            </button>
        </section>
    );
}
