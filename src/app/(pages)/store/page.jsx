"use client";
import { useState } from "react";
import Button from "@/components/section/Button";

function ProductCard({ name, image, price, category, isNew, onAddToCart }) {
    return (
        <div className="group cursor-pointer bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
            <div className="relative overflow-hidden rounded-lg">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-[230px] object-cover group-hover:scale-105 transition-all duration-300"
                />
                {isNew && (
                    <span className="absolute top-3 left-3 bg-coral-red text-white px-2 py-1 rounded-full text-xs font-bold">
                        New
                    </span>
                )}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                        onClick={onAddToCart}
                        className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:bg-coral-red hover:text-white transition-colors duration-200"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="mt-4">
                <span className="text-xs text-slate-gray dark:text-gray-400 uppercase tracking-wide">{category}</span>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">
                    {name}
                </h3>
                <div className="flex items-center justify-between mt-2">
                    <p className="text-coral-red font-semibold text-xl">${price}</p>
                    <button
                        onClick={onAddToCart}
                        className="text-xs bg-coral-red text-white px-3 py-1 rounded-full hover:bg-coral-red/90 transition-colors duration-200"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function Store() {
    const [products] = useState([
        {
            id: 1,
            name: "Nike Air Force 1 '07",
            image: "https://loremflickr.com/600/600/nike,shoes?lock=1",
            price: 110,
            category: "Lifestyle",
            isNew: true
        },
        {
            id: 2,
            name: "Nike Dunk Low Retro",
            image: "https://loremflickr.com/600/600/nike,shoes?lock=2",
            price: 120,
            category: "Lifestyle",
            isNew: false
        },
        {
            id: 3,
            name: "Nike Air Max 270",
            image: "https://loremflickr.com/600/600/nike,shoes?lock=3",
            price: 150,
            category: "Running",
            isNew: true
        },
        {
            id: 4,
            name: "Nike Pegasus 40",
            image: "https://loremflickr.com/600/600/nike,shoes?lock=4",
            price: 140,
            category: "Running",
            isNew: false
        },
        {
            id: 5,
            name: "Air Jordan 1 Mid",
            image: "https://loremflickr.com/600/600/nike,shoes?lock=5",
            price: 165,
            category: "Basketball",
            isNew: false
        },
        {
            id: 6,
            name: "Nike Air VaporMax Plus",
            image: "https://loremflickr.com/600/600/nike,shoes?lock=6",
            price: 210,
            category: "Lifestyle",
            isNew: true
        },
        {
            id: 7,
            name: "Nike Metcon 9",
            image: "https://loremflickr.com/600/600/nike,shoes?lock=7",
            price: 130,
            category: "Training",
            isNew: false
        },
        {
            id: 8,
            name: "Nike Blazer Mid '77 Vintage",
            image: "https://loremflickr.com/600/600/nike,shoes?lock=8",
            price: 105,
            category: "Lifestyle",
            isNew: false
        },
        {
            id: 9,
            name: "Nike Vaporfly Next% 3",
            image: "https://loremflickr.com/600/600/nike,shoes?lock=9",
            price: 260,
            category: "Running",
            isNew: true
        },
        {
            id: 10,
            name: "Nike Air Max 97 SE",
            image: "https://loremflickr.com/600/600/nike,shoes?lock=10",
            price: 180,
            category: "Lifestyle",
            isNew: false
        },
        {
            id: 11,
            name: "Nike Court Legacy Lift",
            image: "https://loremflickr.com/600/600/nike,shoes?lock=11",
            price: 85,
            category: "Tennis",
            isNew: true
        },
        {
            id: 12,
            name: "Nike Zoom Freak 5",
            image: "https://loremflickr.com/600/600/nike,shoes?lock=12",
            price: 130,
            category: "Basketball",
            isNew: false
        },
        {
            id: 13,
            name: "Nike React Infinity 4",
            image: "https://loremflickr.com/600/600/nike,shoes?lock=13",
            price: 160,
            category: "Running",
            isNew: true
        },
        {
            id: 14,
            name: "Nike Air Max 90",
            image: "https://loremflickr.com/600/600/nike,shoes?lock=14",
            price: 130,
            category: "Lifestyle",
            isNew: false
        },
        {
            id: 15,
            name: "Nike SB Dunk High",
            image: "https://loremflickr.com/600/600/nike,shoes?lock=15",
            price: 115,
            category: "Skateboarding",
            isNew: false
        },
        {
            id: 16,
            name: "Nike Air Zoom Pegasus 39 Shield",
            image: "https://loremflickr.com/600/600/nike,shoes?lock=16",
            price: 145,
            category: "Running",
            isNew: true
        },
        {
            id: 17,
            name: "Nike LeBron 21",
            image: "https://loremflickr.com/600/600/nike,shoes?lock=17",
            price: 200,
            category: "Basketball",
            isNew: true
        },
        {
            id: 18,
            name: "Nike Air Max 1 '86",
            image: "https://loremflickr.com/600/600/nike,shoes?lock=18",
            price: 150,
            category: "Lifestyle",
            isNew: false
        },
        {
            id: 19,
            name: "Nike ZoomX Streakfly",
            image: "https://loremflickr.com/600/600/nike,shoes?lock=19",
            price: 160,
            category: "Racing",
            isNew: false
        },
        {
            id: 20,
            name: "Nike Air More Uptempo '96",
            image: "https://loremflickr.com/600/600/nike,shoes?lock=20",
            price: 175,
            category: "Basketball",
            isNew: true
        }
    ]);

    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState("default");

    const categories = ["All", "Lifestyle", "Running", "Basketball", "Training", "Tennis", "Skateboarding", "Racing"];

    const filteredProducts = products.filter(product =>
        selectedCategory === "All" || product.category === selectedCategory
    );

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case "price-low":
                return a.price - b.price;
            case "price-high":
                return b.price - a.price;
            case "new":
                return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
            default:
                return 0;
        }
    });

    const handleAddToCart = (product) => {
        // Add to cart functionality would go here
        console.log("Added to cart:", product);
        // You can integrate with your cart context or state management
    };

    return (
        <section className="max-container mt-14 py-20 px-4 transition-colors duration-300">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-palanquin font-bold text-gray-900 dark:text-white">
                    Explore Our <span className="text-coral-red">Nike Store</span>
                </h1>
                <p className="text-slate-gray dark:text-gray-400 mt-3 max-w-2xl mx-auto">
                    Discover the latest Nike sneakers and athletic footwear. Find the perfect pair for every activity and style.
                </p>
            </div>

            {/* Filters and Sort */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                {/* Category Filter */}
                <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${selectedCategory === category
                                    ? "bg-coral-red text-white"
                                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                    <label className="text-sm text-slate-gray dark:text-gray-400">Sort by:</label>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-coral-red/50 transition-colors duration-200"
                    >
                        <option value="default">Default</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="new">Newest First</option>
                    </select>
                </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
                <p className="text-slate-gray dark:text-gray-400">
                    Showing {sortedProducts.length} of {products.length} products
                    {selectedCategory !== "All" && ` in ${selectedCategory}`}
                </p>
            </div>

            {/* Products Grid */}
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
                {sortedProducts.map((item) => (
                    <ProductCard
                        key={item.id}
                        {...item}
                        onAddToCart={() => handleAddToCart(item)}
                    />
                ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-12">
                <Button
                    label="Load More Products"
                    onClick={() => console.log("Load more functionality")}
                />
            </div>
        </section>
    );
}