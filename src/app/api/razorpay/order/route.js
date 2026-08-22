import Razorpay from "razorpay";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json().catch(() => ({}));
        const { amount } = body;

        if (!amount || typeof amount !== "number" || amount <= 0) {
            return NextResponse.json({ error: "Invalid amount provided" }, { status: 400 });
        }

        const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_dummykey";
        const keySecret = process.env.RAZORPAY_KEY_SECRET || "dummysecret";

        // If using test/mock credentials without real Razorpay account, return mock order
        if (keyId === "rzp_test_dummykey" || keySecret === "dummysecret") {
            const mockOrder = {
                id: "order_mock_" + Math.random().toString(36).substring(7),
                entity: "order",
                amount: Math.round(amount * 100),
                amount_paid: 0,
                amount_due: Math.round(amount * 100),
                currency: "INR",
                receipt: "receipt_order_" + Math.random().toString(36).substring(7),
                status: "created",
                attempts: 0,
                notes: [],
                created_at: Math.floor(Date.now() / 1000),
            };
            return NextResponse.json(mockOrder);
        }

        const razorpay = new Razorpay({
            key_id: keyId,
            key_secret: keySecret,
        });

        const order = await razorpay.orders.create({
            amount: Math.round(amount * 100), // amount in paise
            currency: "INR",
            receipt: "receipt_order_" + Math.random().toString(36).substring(7),
        });

        return NextResponse.json(order);
    } catch (error) {
        console.error("Razorpay order creation error:", error);
        return NextResponse.json({ error: error.message || "Failed to create order" }, { status: 500 });
    }
}

