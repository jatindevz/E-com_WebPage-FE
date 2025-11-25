"use client";
import { AuthUIProvider } from "@/context/AuthUIContext";
import { useAuthUI } from "@/context/AuthUIContext";
import LoginPopup from "@/components/section/Login";
import Toggel from "@/components/section/toggle";


export default function RootLayout({ children }) {
   

    return (
        <div>
                <AuthUIProvider>
                {children}
                <Toggel />
                    <LoginPopupWrapper />
                </AuthUIProvider>
        </div>
            
    );
}

function LoginPopupWrapper() {
    const { loginOpen, closeLogin } = useAuthUI();
    return <LoginPopup isOpen={loginOpen} onClose={closeLogin} />;
}
