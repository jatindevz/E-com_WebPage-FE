import Stripe from "stripe";
import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function POST(req) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const { items, user } = await req.json();

    if (!user) {
        return NextResponse.json({ error: "User not logged in" }, { status: 401 });
    }

    // Convert cart products to Stripe format
    const lineItems = items.map((item) => ({
        price_data: {
            currency: "usd",
            product_data: { name: item.product.name, images: [item.product.image] },
            unit_amount: item.product.price * 100, // cents
        },
        quantity: item.quantity,
    }));

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        success_url: `${process.env.NEXT_PUBLIC_URL}/checkout/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_URL}/cart`,
        metadata: {
            user_id: user.id, // used later in webhook
        },
        line_items: lineItems,
    });

    return NextResponse.json({ id: session.id });
}
