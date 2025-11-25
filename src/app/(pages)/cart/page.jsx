"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@/hooks/useUser";

export default function CartPage() {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false); // 🔥 hook upar

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

    const subtotal = cart.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    const shipping = subtotal > 50 ? 0 : 5.99;
    const total = subtotal + shipping;

    const handleCheckout = async () => {
        if (!user) return;
        if (cart.length === 0) return;

        setLoading(true);

        try {
            // 🔥 1) Create order on backend with actual total
            const res = await fetch("/api/razorpay/order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ amount: 1 }), // amount in rupees, server 100x karega
            });

            const order = await res.json();

            // 🔥 2) Razorpay options
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: "Your Project",
                order_id: order.id,
                handler: async function (response) {
                    const verifyRes = await fetch("/api/razorpay/verify", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            ...response,           // razorpay_order_id, razorpay_payment_id, razorpay_signature 
                        }),
                    });
                        const { data, error } = await supabase
                        .from("orders")
                        .insert({
                            user_id: user.id,
                            order_id: response.razorpay_order_id,
                            payment_id: response.razorpay_payment_id,
                            items: cart, // JSONB column recommended
                            amount: total,
                            status: "paid",
                        }).select().single();
                    
                    if (error) {
                        console.error("Order save error:", error);
                        // return;
                    }
                    
                    
                    
                    const verifyData = await verifyRes.json();

                    if (verifyRes.ok && verifyData.status === "success") {
                        alert("Payment successful & order placed!");
                        // optional: front-end cart empty karo
                        setCart([]);
                    } else {
                        alert("Payment verified nahi hua / order save failed");
                    }
                },
                theme: { color: "#3359cc" },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            console.error("Checkout error:", err);
            alert("Something went wrong in checkout");
        } finally {
            setLoading(false);

            // 3) clear cart for this user
            const { error: cartError } = await supabase
                .from("cart")
                .delete()
                .eq("user_id", user.id);

            if (cartError) {
                console.error("Cart delete error:", cartError);
            }

        }
    };

    if (!user) {
        return (
            <section className="max-w-7xl mx-auto px-6 py-12">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Your Cart 🛒
                </h1>
                <div className="text-center py-12">
                    <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
                        Please sign in to view your cart.
                    </p>
                    <button className="bg-coral-red text-white px-6 py-3 rounded-lg hover:bg-coral-red/90 transition-colors">
                        Sign In
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Your Cart 🛒
            </h1>

            {loading ? (
                <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-coral-red"></div>
                </div>
            ) : cart.length === 0 ? (
                <div className="text-center py-12">
                    <div className="text-6xl mb-4">🛒</div>
                    <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
                        Your cart is empty.
                    </p>
                    <button
                        onClick={() => (window.location.href = "/store")}
                        className="bg-coral-red text-white px-6 py-3 rounded-lg hover:bg-coral-red/90 transition-colors"
                    >
                        Continue Shopping
                    </button>
                </div>
            ) : (
                <>
                    {/* Cart Items */}
                    <div className="space-y-4 mb-8">
                        {cart.map((item) => (
                            <div
                                key={item.id}
                                className="flex flex-col md:flex-row items-center gap-4 bg-white dark:bg-gray-900 shadow-lg p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
                            >
                                {/* Product Image */}
                                <img
                                    src={item.product.image}
                                    className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg"
                                    alt={item.product.name}
                                />

                                {/* Product Info */}
                                <div className="flex-1 text-center md:text-left">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                                        {item.product.name}
                                    </h3>
                                    <p className="text-coral-red font-semibold text-xl mt-2">
                                        ${item.product.price}
                                    </p>

                                    {/* Quantity Controls */}
                                    <div className="flex items-center justify-center md:justify-start gap-3 mt-3">
                                        <button
                                            onClick={() => decreaseQty(item.id)}
                                            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
                                        >
                                            −
                                        </button>

                                        <span className="font-medium text-gray-900 dark:text-white min-w-8 text-center">
                                            {item.quantity}
                                        </span>

                                        <button
                                            onClick={() => increaseQty(item.id)}
                                            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Remove Button */}
                                <button
                                    onClick={() => handleRemove(item.id)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium w-full md:w-auto"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Summary Section */}
                    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                Subtotal:
                            </h2>
                            <p className="text-2xl font-bold text-coral-red">
                                ${subtotal.toFixed(2)}
                            </p>
                        </div>

                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                Shipping:
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400">
                                {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                            </p>
                        </div>

                        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Total:
                                </h2>
                                <p className="text-3xl font-bold text-coral-red">
                                    ${total.toFixed(2)}
                                </p>
                            </div>
                            {subtotal < 50 && (
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                    Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                                </p>
                            )}
                        </div>

                        <button
                            onClick={handleCheckout}
                            className="w-full bg-coral-red text-white py-4 rounded-xl text-lg font-semibold hover:bg-coral-red/90 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                        >
                            Proceed to Checkout
                        </button>
                    </div>

                    {/* Continue Shopping */}
                    <div className="text-center mt-6">
                        <button
                            onClick={() => (window.location.href = "/store")}
                            className="text-coral-red hover:text-coral-red/80 transition-colors font-medium"
                        >
                            ← Continue Shopping
                        </button>
                    </div>
                </>
            )}
        </section>
    );
}
