"use client";
import { createContext, useContext, useState } from "react";

const AuthUIContext = createContext();

export function AuthUIProvider({ children }) {
    const [loginOpen, setLoginOpen] = useState(false);

    const openLogin = () => setLoginOpen(true);
    const closeLogin = () => setLoginOpen(false);

    return (
        <AuthUIContext.Provider value={{ loginOpen, openLogin, closeLogin }}>
            {children}
        </AuthUIContext.Provider>
    );
}

export const useAuthUI = () => useContext(AuthUIContext);
