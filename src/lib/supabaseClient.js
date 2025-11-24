
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://yqbcfdguraeqlnvsbjzt.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
// const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxYmNmZGd1cmFlcWxudnNianp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5MTU1MTgsImV4cCI6MjA3OTQ5MTUxOH0.TWiEMklSEQjXMFt4MCMqoKzTjoo1FnIjZSpKBacFxxo"

const supabase = createClient(supabaseUrl, supabaseKey)



//  const products = [
//         {
//             id: 1,
//             name: "Nike Air Force 1 '07",
//             image: "https://loremflickr.com/600/600/nike,shoes?lock=1",
//             price: 110,
//             category: "Lifestyle",
//             isNew: true
//         },
//         {
//             id: 2,
//             name: "Nike Dunk Low Retro",
//             image: "https://loremflickr.com/600/600/nike,shoes?lock=2",
//             price: 120,
//             category: "Lifestyle",
//             isNew: false
//         },
//         {
//             id: 3,
//             name: "Nike Air Max 270",
//             image: "https://loremflickr.com/600/600/nike,shoes?lock=3",
//             price: 150,
//             category: "Running",
//             isNew: true
//         },
//         {
//             id: 4,
//             name: "Nike Pegasus 40",
//             image: "https://loremflickr.com/600/600/nike,shoes?lock=4",
//             price: 140,
//             category: "Running",
//             isNew: false
//         },
//         {
//             id: 5,
//             name: "Air Jordan 1 Mid",
//             image: "https://loremflickr.com/600/600/nike,shoes?lock=5",
//             price: 165,
//             category: "Basketball",
//             isNew: false
//         },
//         {
//             id: 6,
//             name: "Nike Air VaporMax Plus",
//             image: "https://loremflickr.com/600/600/nike,shoes?lock=6",
//             price: 210,
//             category: "Lifestyle",
//             isNew: true
//         },
//         {
//             id: 7,
//             name: "Nike Metcon 9",
//             image: "https://loremflickr.com/600/600/nike,shoes?lock=7",
//             price: 130,
//             category: "Training",
//             isNew: false
//         },
//         {
//             id: 8,
//             name: "Nike Blazer Mid '77 Vintage",
//             image: "https://loremflickr.com/600/600/nike,shoes?lock=8",
//             price: 105,
//             category: "Lifestyle",
//             isNew: false
//         },
//         {
//             id: 9,
//             name: "Nike Vaporfly Next% 3",
//             image: "https://loremflickr.com/600/600/nike,shoes?lock=9",
//             price: 260,
//             category: "Running",
//             isNew: true
//         },
//         {
//             id: 10,
//             name: "Nike Air Max 97 SE",
//             image: "https://loremflickr.com/600/600/nike,shoes?lock=10",
//             price: 180,
//             category: "Lifestyle",
//             isNew: false
//         },
//         {
//             id: 11,
//             name: "Nike Court Legacy Lift",
//             image: "https://loremflickr.com/600/600/nike,shoes?lock=11",
//             price: 85,
//             category: "Tennis",
//             isNew: true
//         },
//         {
//             id: 12,
//             name: "Nike Zoom Freak 5",
//             image: "https://loremflickr.com/600/600/nike,shoes?lock=12",
//             price: 130,
//             category: "Basketball",
//             isNew: false
//         },
//         {
//             id: 13,
//             name: "Nike React Infinity 4",
//             image: "https://loremflickr.com/600/600/nike,shoes?lock=13",
//             price: 160,
//             category: "Running",
//             isNew: true
//         },
//         {
//             id: 14,
//             name: "Nike Air Max 90",
//             image: "https://loremflickr.com/600/600/nike,shoes?lock=14",
//             price: 130,
//             category: "Lifestyle",
//             isNew: false
//         },
//         {
//             id: 15,
//             name: "Nike SB Dunk High",
//             image: "https://loremflickr.com/600/600/nike,shoes?lock=15",
//             price: 115,
//             category: "Skateboarding",
//             isNew: false
//         },
//         {
//             id: 16,
//             name: "Nike Air Zoom Pegasus 39 Shield",
//             image: "https://loremflickr.com/600/600/nike,shoes?lock=16",
//             price: 145,
//             category: "Running",
//             isNew: true
//         },
//         {
//             id: 17,
//             name: "Nike LeBron 21",
//             image: "https://loremflickr.com/600/600/nike,shoes?lock=17",
//             price: 200,
//             category: "Basketball",
//             isNew: true
//         },
//         {
//             id: 18,
//             name: "Nike Air Max 1 '86",
//             image: "https://loremflickr.com/600/600/nike,shoes?lock=18",
//             price: 150,
//             category: "Lifestyle",
//             isNew: false
//         },
//         {
//             id: 19,
//             name: "Nike ZoomX Streakfly",
//             image: "https://loremflickr.com/600/600/nike,shoes?lock=19",
//             price: 160,
//             category: "Racing",
//             isNew: false
//         },
//         {
//             id: 20,
//             name: "Nike Air More Uptempo '96",
//             image: "https://loremflickr.com/600/600/nike,shoes?lock=20",
//             price: 175,
//             category: "Basketball",
//             isNew: true
//         }
//     ];


// async function run() {
//     console.log("Seeding products...");

//     const { data, error } = await supabase.from("products").insert(products);

//     if (error) {
//         console.error("❌ ERROR:", error);
//     } else {
//         console.log("✅ Seed complete:", data);
//     }
// }

// run();


export { supabase }