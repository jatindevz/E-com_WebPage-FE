"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@/hooks/useUser";
import { loadStripe } from "@stripe/stripe-js";


export default function CartPage() {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    const user = useUser();

    // Fetch cart with joined product data
    useEffect(() => {
        if (!user) return;

        async function loadCart() {
            setLoading(true);

            const { data, error } = await supabase
                .from("cart")
                .select(
                    `
            id,
            quantity,
            product:products(*)
          `
                )
                .eq("user_id", user.id);

            if (error) {
                console.error("Error loading cart:", error);
            } else {
                setCart(data || []);
            }

            setLoading(false);
        }

        loadCart();
    }, [user]);

    // Increase quantity
    const increaseQty = async (cartId) => {
        const item = cart.find((c) => c.id === cartId);
        if (!item) return;

        await supabase.from("cart").update({ quantity: item.quantity + 1 }).eq("id", cartId);

        setCart((prev) =>
            prev.map((c) =>
                c.id === cartId ? { ...c, quantity: c.quantity + 1 } : c
            )
        );
    };

    // Decrease quantity
    const decreaseQty = async (cartId) => {
        const item = cart.find((c) => c.id === cartId);
        if (!item) return;

        // if quantity will be 0 remove it
        if (item.quantity === 1) {
            await handleRemove(cartId);
            return;
        }

        await supabase.from("cart").update({ quantity: item.quantity - 1 }).eq("id", cartId);

        setCart((prev) =>
            prev.map((c) =>
                c.id === cartId ? { ...c, quantity: c.quantity - 1 } : c
            )
        );
    };

    // Remove product from cart
    const handleRemove = async (cartId) => {
        await supabase.from("cart").delete().eq("id", cartId);
        setCart((prev) => prev.filter((c) => c.id !== cartId));
    };

    const total = cart.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    if (!user) {
        return (
            <section className="max-w-7xl mx-auto px-6 py-12">
                <h1 className="text-3xl font-bold text-white">Your Cart 🛒</h1>
                <p className="text-gray-400 mt-4">
                    Please sign in to view your cart.
                </p>
            </section>
        );
    }

    const handleCheckout = async () => {
        if (!user) return alert("Login first");

        const res = await fetch("/api/checkout", {
            method: "POST",
            body: JSON.stringify({ items: cart, user }),
        });

        const { id } = await res.json();
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
        await stripe.redirectToCheckout({ sessionId: id });
    };


    return (
        <section className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold text-white mb-6">Your Cart 🛒</h1>

            {loading ? (
                <p className="text-gray-400">Loading cart...</p>
            ) : cart.length === 0 ? (
                <p className="text-gray-400 text-lg">Your cart is empty.</p>
            ) : (
                <>
                    <div className="space-y-6 flex">
                        {cart.map((item) => (
                            <div
                                key={item.id}
                                className="flex  items-center gap-6 bg-white dark:bg-gray-900 shadow-md p-4 rounded-xl border border-gray-700"
                            >
                                <img
                                    src={item.product.image}
                                    className="w-28 h-28 object-cover rounded-lg"
                                    alt={item.product.name}
                                />

                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold dark:text-white">
                                        {item.product.name}
                                    </h3>
                                    <p className="text-coral-red font-semibold text-xl">
                                        ${item.product.price}
                                    </p>

                                    <div className="flex items-center gap-4 mt-3">
                                        <button
                                            onClick={() => decreaseQty(item.id)}
                                            className="px-3 py-1 rounded-full border dark:border-gray-400"
                                        >
                                            −
                                        </button>

                                        <span className="font-medium text-white">
                                            {item.quantity}
                                        </span>

                                        <button
                                            onClick={() => increaseQty(item.id)}
                                            className="px-3 py-1 rounded-full border dark:border-gray-400"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleRemove(item.id)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="mt-10 flex items-center justify-between border-t pt-6 dark:border-gray-700">
                        <h2 className="text-xl font-bold text-white">Total:</h2>
                        <p className="text-2xl font-bold text-coral-red">
                            ${total.toFixed(2)}
                        </p>
                    </div>

                    <button
                        className="mt-6 w-full bg-coral-red text-white py-3 rounded-lg text-lg font-semibold hover:bg-coral-red/90 transition"
                                onClick={handleCheckout}
                    >
                        Checkout
                    </button>
                </>
            )}
        </section>
    );
}
