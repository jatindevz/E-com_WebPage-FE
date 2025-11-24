import Stripe from "stripe";
import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function POST(req) {
    const body = await req.text();
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const signature = req.headers.get("stripe-signature");

    try {
        const event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        );

        if (event.type === "checkout.session.completed") {
            const data = event.data.object;

            await supabase.from("orders").insert({
                user_id: data.metadata.user_id,
                stripe_session: data.id,
                status: "paid",
            });

            // Optionally clear cart
            await supabase.from("cart").delete().eq("user_id", data.metadata.user_id);
        }

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.log("Webhook error:", err.message);
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}
