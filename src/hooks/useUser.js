"use client";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

export function useUser() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            const { data } = await supabase.auth.getUser();
            setUser(data.user || null);
        };

        getUser();

        // Listen to auth changes
        const { data: listener } = supabase.auth.onAuthStateChange(
            (_, session) => {
                setUser(session?.user || null);
            }
        );

        return () => listener.subscription.unsubscribe();
    }, []);

    return user;
}

