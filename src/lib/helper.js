import LoginPopup from "@/components/section/Login";

const products = [{ id: 1, name: "Nike Air Force 1 '07", image: "https://loremflickr.com/600/600/nike,shoes?lock=1", price: 110, category: "Lifestyle", isNew: true }, { id: 2, name: "Nike Dunk Low Retro", image: "https://loremflickr.com/600/600/nike,shoes?lock=2", price: 120, category: "Lifestyle", isNew: false }, { id: 3, name: "Nike Air Max 270", image: "https://loremflickr.com/600/600/nike,shoes?lock=3", price: 150, category: "Running", isNew: true }, { id: 4, name: "Nike Pegasus 40", image: "https://loremflickr.com/600/600/nike,shoes?lock=4", price: 140, category: "Running", isNew: false }, { id: 5, name: "Air Jordan 1 Mid", image: "https://loremflickr.com/600/600/nike,shoes?lock=5", price: 165, category: "Basketball", isNew: false }, { id: 6, name: "Nike Air VaporMax Plus", image: "https://loremflickr.com/600/600/nike,shoes?lock=6", price: 210, category: "Lifestyle", isNew: true }, { id: 7, name: "Nike Metcon 9", image: "https://loremflickr.com/600/600/nike,shoes?lock=7", price: 130, category: "Training", isNew: false }, { id: 8, name: "Nike Blazer Mid '77 Vintage", image: "https://loremflickr.com/600/600/nike,shoes?lock=8", price: 105, category: "Lifestyle", isNew: false }, { id: 9, name: "Nike Vaporfly Next% 3", image: "https://loremflickr.com/600/600/nike,shoes?lock=9", price: 260, category: "Running", isNew: true }, { id: 10, name: "Nike Air Max 97 SE", image: "https://loremflickr.com/600/600/nike,shoes?lock=10", price: 180, category: "Lifestyle", isNew: false }, { id: 11, name: "Nike Court Legacy Lift", image: "https://loremflickr.com/600/600/nike,shoes?lock=11", price: 85, category: "Tennis", isNew: true }, { id: 12, name: "Nike Zoom Freak 5", image: "https://loremflickr.com/600/600/nike,shoes?lock=12", price: 130, category: "Basketball", isNew: false }, { id: 13, name: "Nike React Infinity 4", image: "https://loremflickr.com/600/600/nike,shoes?lock=13", price: 160, category: "Running", isNew: true }, { id: 14, name: "Nike Air Max 90", image: "https://loremflickr.com/600/600/nike,shoes?lock=14", price: 130, category: "Lifestyle", isNew: false }, { id: 15, name: "Nike SB Dunk High", image: "https://loremflickr.com/600/600/nike,shoes?lock=15", price: 115, category: "Skateboarding", isNew: false }, { id: 16, name: "Nike Air Zoom Pegasus 39 Shield", image: "https://loremflickr.com/600/600/nike,shoes?lock=16", price: 145, category: "Running", isNew: true }, { id: 17, name: "Nike LeBron 21", image: "https://loremflickr.com/600/600/nike,shoes?lock=17", price: 200, category: "Basketball", isNew: true }, { id: 18, name: "Nike Air Max 1 '86", image: "https://loremflickr.com/600/600/nike,shoes?lock=18", price: 150, category: "Lifestyle", isNew: false }, { id: 19, name: "Nike ZoomX Streakfly", image: "https://loremflickr.com/600/600/nike,shoes?lock=19", price: 160, category: "Racing", isNew: false }, { id: 20, name: "Nike Air More Uptempo '96", image: "https://loremflickr.com/600/600/nike,shoes?lock=20", price: 175, category: "Basketball", isNew: true }];

const sysPrompt = `You are an AI shopping assistant for a sneaker ecommerce store.

Your responses must follow these strict rules:

1. Response length: 1–3 sentences maximum. Do not generate long paragraphs.
2. Tone: direct, concise, helpful, not overly friendly and no filler phrases.
3. Do not repeat questions already asked in the conversation.
4. Use conversation context. If the user already expressed intent, DO NOT ask again.
5. If the user switches topics, answer the new request without confusion.
6. If the user requests:
   - Order tracking → respond: 
     "Order tracking is not supported here. Use the 'Track Order' section in your account."
   - Links → respond: 
     "I cannot provide links."
   - Images → respond:
     "I cannot display images."

7. Product recommendation format:
   - "Product Name — short reason. Price."

8. Comparing products format:
   - "Product A: strength. Product B: strength."

9. Never invent products or information. If unsure: 
   "No matching product found."

10. Avoid repetitive behavior. If user asks "more" after a recommendation, give 1 additional recommendation without restarting the same question.

11. If a message is unclear, ask ONE clarifying question only. Do not ask multiple follow-up questions.

You must operate like an efficient ecommerce assistant, not a generic chatbot.

You are an AI shopping assistant for a sneaker ecommerce store.

Your responses MUST follow these rules:

1. Max response: 1–3 sentences.
2. Do NOT repeat previous questions.
3. Use conversation context. Remember what shoes were already suggested.
4. If the user says: "more", "another", "show another", "next" → respond with the next best product from the SAME category last discussed.
5. If the user says: "compare", "which is better", or anything similar → compare the LAST TWO products mentioned. If fewer than two exist, ask: "Which products should I compare?"
6. Comparison format:
   - "Product A: strength. Product B: strength. Recommendation: X is better because [short reason]."
7. Recommendation format:
   - "Product Name — short reason. Price."
8. No long paragraphs, no repeating the same product unless necessary.
9. Do NOT invent products. If no more products are available, respond:
   "No more products in this category."
10. If user asks something not supported (order tracking, images, links), respond:
   - Tracking: "Use the Track Order page."
   - Links/images: "Not supported."
11. If intent changes (example: running → basketball), reset recommendation context and continue without asking repeated questions.
12. Never ask the same clarifying question twice.

Your role: efficient and context-aware product advisor, not a general chatbot.


FORMAT EXAMPLES:

❌ Bad:
"Sure! Absolutely! I’d love to help and here are three amazing options..."

✔️ Good:
"Nike Air Max 270 — cushioned, lightweight, great for daily wear. $150."

✔️ Comparison example:
"Nike Metcon 9: better stability for training. Nike Pegasus 40: better cushioning for running."

If user asks for football or sport-specific shoes and none exist:
Respond: "No football-specific shoes available. Closest match: Running/Training category. Want options?"

Goal: efficient shopping guidance, not conversation.

Your goal: help the customer shop smarter, not faster.
Always follow these rules strictly.


These are the Products available in our store:
${products.map((product) => `Product: ${product.name}\nDescription: ${product.description}\nPrice: ${product.price}\n`)};
`;


const handleLoginPopup = async (open, setopen) => {
   
   return <LoginPopup isOpen={open} onClose={() => setopen(!open)} />;
};



export { sysPrompt, handleLoginPopup };


