'use client'
import React, { useState, useEffect, useRef } from 'react';
import { User } from 'lucide-react';
import { useUser } from "@/hooks/useUser";
import { supabase } from "@/lib/supabaseClient";
import { useAuthUI } from "@/context/AuthUIContext";
import {  toast } from 'sonner';


const Toggel = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef(null);

  const user = useUser();
  const { openLogin } = useAuthUI();

  // Set mounted state to avoid hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    if (!mounted) return;

    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
      const isDark = savedTheme === 'dark';
      setIsDarkMode(isDark);
      document.documentElement.classList.toggle('dark', isDark);
    } else {
      // Use system preference if no saved theme
      setIsDarkMode(systemPrefersDark);
      document.documentElement.classList.toggle('dark', systemPrefersDark);
    }
  }, [mounted]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Logout failed:", error);
        return;
      }
      console.log("Logged out successfully");
      setIsOpen(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleLogin = () => {
    setIsOpen(false);
    openLogin();
  };

  const toggleTheme = () => {
    if (!mounted) return;

    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
  };

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="fixed top-4 right-4 z-[100]">
        <button className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></button>
      </div>
    );
  }

  return (
    <div className="fixed top-4 right-4 z-[100]" ref={dropdownRef}>
      {/* User Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative flex items-center justify-center w-12 h-12 bg-gradient-to-r from-coral-red to-red-500 text-white rounded-full shadow-2xl transition-all duration-500 hover:shadow-3xl hover:scale-110 group ${isOpen ? 'ring-4 ring-coral-red/30 scale-110' : ''
          }`}
        aria-label="User menu"
        aria-expanded={isOpen}
      >
        <User className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />

        {/* Pulsing animation effect */}
        <div className={`absolute inset-0 rounded-full bg-coral-red animate-ping opacity-0 group-hover:opacity-40 transition-opacity duration-300 ${isOpen ? 'opacity-40' : ''
          }`}></div>
      </button>

      {/* Dropdown Menu with Ultra Pro Max Animations */}
      <div className={`absolute right-0 mt-3 w-64 origin-top-right transition-all duration-500 ${isOpen
          ? 'opacity-100 scale-100 translate-y-0 visible'
          : 'opacity-0 scale-95 -translate-y-4 invisible'
        }`}>
        {/* Background Blur Effect */}
        <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/50 shadow-2xl"></div>

        {/* Content */}
        <div className="relative p-6 space-y-4">
          {/* User Info */}
          <div className="text-center mb-4">
            <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-r from-coral-red to-red-500 rounded-full flex items-center justify-center shadow-lg">
              {user ? (
                <span className="text-white font-bold text-lg">
                  {user.email?.charAt(0).toUpperCase()}
                </span>
              ) : (
                <User className="w-8 h-8 text-white" />
              )}
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {user ? user.email?.split('@')[0] : 'Guest User'}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
              {user ? user.email : "Not logged in"}
            </p>
          </div>

          <div className="space-y-2">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50/50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group"
            >
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </span>
              <div className={`w-12 h-6 flex items-center rounded-full p-1 transition-all duration-500 ${isDarkMode
                  ? 'bg-coral-red justify-end'
                  : 'bg-gray-300 justify-start'
                }`}>
                <div className="w-4 h-4 bg-white rounded-full shadow-lg transform transition-transform duration-500"></div>
              </div>
            </button>

            {/* Login/Logout Button */}
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-red-50/50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="font-medium">Logout</span>
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-green-50/50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg group"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                <span className="font-medium">Login</span>
              </button>
            )}
          </div>

          {/* Additional Menu Items - Only show when logged in */}
          {user && (
            <div className="pt-3 border-t border-gray-200 dark:border-gray-700 space-y-2">
              <button className="w-full text-left p-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
                Profile Settings
              </button>
              <button className="w-full text-left p-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
                Order History
              </button>
              <button className="w-full text-left p-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">
                Help & Support
              </button>
              <button onClick={() => toast('My first toast')}>Give me a toast</button>

            </div>
          )}
        </div>

        {/* Arrow Indicator */}
        <div className="absolute -top-2 right-3 w-4 h-4 bg-white dark:bg-gray-900 rotate-45 border-l border-t border-white/20 dark:border-gray-700/50"></div>
      </div>

      {/* Backdrop Blur */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/10 backdrop-blur-sm z-[-1] transition-opacity duration-500"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default Toggel;