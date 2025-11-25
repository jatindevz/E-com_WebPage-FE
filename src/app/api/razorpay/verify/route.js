import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(req) {
    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    const sign = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(razorpay_order_id + "|" + razorpay_payment_id)
        .digest("hex");

    if (sign === razorpay_signature) {
        return NextResponse.json({ status: "success" });
    } else {
        return NextResponse.json({ status: "failed" }, { status: 400 });
    }
}
