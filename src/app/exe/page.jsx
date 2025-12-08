"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const container = useRef(null);
    const title = useRef(null);
    const subtitle = useRef(null);
    const buttons = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // PAGE LOAD ANIMATION
            const tl = gsap.timeline({
                defaults: { ease: "power3.out", duration: 1.2 },
            });

            tl.from(container.current, { opacity: 0 })
                .from(title.current, { y: 60, opacity: 0 }, "-=0.6")
                .from(subtitle.current, { y: 40, opacity: 0 }, "-=0.8")
                .from(buttons.current, {
                    y: 20,
                    opacity: 0,
                    stagger: 0.15,
                });

            // === SCROLL: animate EACH card as it enters view ===
            // Select all cards (works inside gsap.context)
            const cards = gsap.utils.toArray(".feature-card");

            // Option A - Animate each card individually with its own ScrollTrigger
            cards.forEach((card) => {
                gsap.from(card, {
                    y: 10,
                    x: 800,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",         // when top of card hits 85% of viewport height
                        toggleActions: "play none none reverse",
                        // markers: true,         // uncomment for debugging
                    },
                });
            });

            // --- Alternative: if you prefer a little stagger when multiple cards appear together,
            // use ScrollTrigger.batch(cards, { onEnter: (batch) => gsap.to(batch, {opacity:1, y:0, x:0, stagger:0.12, duration:0.8}) })
            // I kept individual triggers above because you asked "one by one when I scroll".
        }, container);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={container}
            className="min-h-screen flex flex-col justify-center items-start px-20"
        >
            <h1 ref={title} className="text-6xl font-bold">
                Build Better. Faster.
            </h1>
            <p ref={subtitle} className="mt-4 text-xl text-gray-500">
                A modern starter for your next web experience.
            </p>

            <div className="mt-8 flex gap-4">
                {["Get Started", "Learn More"].map((txt, i) => (
                    <button
                        key={i}
                        ref={(el) => (buttons.current[i] = el)}
                        className="px-6 py-3 rounded-xl bg-black text-white"
                    >
                        {txt}
                    </button>
                ))}
            </div>

            {/* FEATURE SECTION */}
            <div className="feature-section mt-40 grid grid-cols-1 gap-6">
                {[
                    "bg-lime-950",
                    "bg-lime-900",
                    "bg-lime-800",
                    "bg-lime-700",
                    "bg-lime-600",
                    "bg-lime-500",
                    "bg-lime-400",
                    "bg-lime-300",
                    "bg-lime-200",
                    "bg-lime-100",
                ].map((c, i) => (
                    <div key={i} className={`feature-card h-52 w-56 ${c}`}></div>
                ))}
            </div>
        </section>
    );
}
