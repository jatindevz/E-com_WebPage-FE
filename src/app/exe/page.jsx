"use client";

import { useState } from "react";

export default function Checkout() {
    const [loading, setLoading] = useState(false);

    const handlePay = async () => {
        setLoading(true);

        const res = await fetch("/api/razorpay/order", {
            method: "POST",
            body: JSON.stringify({ amount: 500 }), // ₹500
        });

        const order = await res.json();

        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: "Your Project",
            order_id: order.id,
            handler: async function (response) {
                // verify payment
                await fetch("/api/razorpay/verify", {
                    method: "POST",
                    body: JSON.stringify(response),
                });
                alert("Payment successful!");
            },
            theme: { color: "#3399cc" },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
        setLoading(false);
    };

    return (
        <button disabled={loading} onClick={handlePay} className="fixed  bg-black text-white p-4 rounded cursor-pointer">
            {loading ? "Processing..." : "Pay ₹500"}
        </button>
    );
}
