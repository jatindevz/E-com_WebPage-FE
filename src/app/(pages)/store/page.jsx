"use client";
import { useState, useEffect } from "react";
import Button from "@/components/section/Button";
import { useUser } from "@/hooks/useUser";
import { supabase } from "@/lib/supabaseClient";

function ProductCard({
    name,
    image,
    price,
    category,
    isNew,
    onAddToCart,
    onAddToWishlist,
    isInWishlist,
}) {
    return (
        <div className="group cursor-pointer bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 ">
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

                {/* Hover button container */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Nested group */}
                    <button
                        onClick={onAddToWishlist}
                        disabled={isInWishlist}
                        className={`group/item bg-white dark:bg-gray-800 p-2 rounded-full shadow-md transition-colors duration-200 relative ${isInWishlist
                                ? "cursor-not-allowed opacity-70"
                                : "hover:bg-coral-red hover:text-white"
                            }`}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>

                        {/* Tooltip */}
                        <span className="absolute top-1/2 -translate-y-1/2 right-0 whitespace-nowrap font-medium bg-gray-800 text-white py-1 px-2 rounded text-xs dark:text-gray-400 opacity-0 group-hover/item:opacity-100 group-hover/item:right-12 transition-all duration-200 z-20 ">
                            {isInWishlist ? "In Wishlist" : "Add to Wishlist"}
                        </span>
                    </button>
                </div>
            </div>

            <div className="mt-4">
                <span className="text-xs text-slate-gray dark:text-gray-400 uppercase tracking-wide">
                    {category}
                </span>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">{name}</h3>

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
    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);

    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortBy, setSortBy] = useState("default");

    const [cart, setCart] = useState([]);
    const [wishlistIds, setWishlistIds] = useState([]); // only product IDs from Supabase

    const user = useUser();

    // Load cart from localStorage (cart still local for now)
    useEffect(() => {
        async function loadCart() {
            const { data, error } = await supabase
                .from("cart")
                .select(`
                id,
                quantity,
                product:products(*)
            `)
                .eq("user_id", user.id);

            if (error) console.error(error);
            else setCart(data);
        }

        if (user) loadCart();
    }, [user]);


    // useEffect(() => {
    //     localStorage.setItem("cart", JSON.stringify(cart));
    // }, [cart]);

    // Fetch products from Supabase
    useEffect(() => {
        async function fetchProducts() {
            setLoadingProducts(true);

            const { data, error } = await supabase
                .from("products")
                .select("*")
                .order("id", { ascending: true });

            if (error) {
                console.error("Error fetching products:", error);
            } else {
                setProducts(data || []);
            }

            setLoadingProducts(false);
        }

        fetchProducts();
    }, []);

    // Fetch wishlist product IDs for current user from Supabase
    useEffect(() => {
        if (!user) {
            setWishlistIds([]);
            return;
        }

        async function fetchWishlist() {
            const { data, error } = await supabase
                .from("wishlist")
                .select("product_id")
                .eq("user_id", user.id);

            if (error) {
                console.log("Error fetching wishlist:", error);
                return;
            }

            setWishlistIds((data || []).map((row) => row.product_id));
        }

        fetchWishlist();
    }, [user]);

    const categories = ["All", "Lifestyle", "Running", "Basketball", "Training", "Tennis", "Skateboarding", "Racing"];

    const filteredProducts = products.filter(
        (product) => selectedCategory === "All" || product.category === selectedCategory
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

    // --- Wishlist now in Supabase ---
    const handleAddToWishlist = async (product) => {
        if (!user) {
            alert("Please log in to add items to your wishlist.");
            return;
        }

        if (wishlistIds.includes(product.id)) {
            console.log("Already in wishlist:", product.name);
            return;
        }

        const { error } = await supabase.from("wishlist").insert({
            user_id: user.id,
            product_id: product.id,
        });

        if (error) {
            console.log("Error adding to wishlist:", error);
            return;
        }

        console.log("Added to wishlist:", product.name);
        setWishlistIds((prev) => [...prev, product.id]);
    };

    // Cart still local
    const handleAddToCart = async (product) => {
        if (!user) {
            alert("Please log in to add items to cart.");
            return;
        }

        const { error } = await supabase
            .from("cart")
            .upsert(
                {
                    user_id: user.id,
                    product_id: product.id,
                    quantity: 1
                },
                { onConflict: "user_id,product_id" }
            )
            .select();

        if (error) {
            console.error("Error adding to cart:", error);
            return;
        }

        console.log("Cart updated:", product.name);
    };


    return (
        <section className="max-container mt-14 py-20 px-4 transition-colors duration-300">
            {/* Header */}
            <div className="text-center mb-12 ">
                <div className="text-white text-sm">
                    {user && <div>{user.email}</div>}
                </div>

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
                    {categories.map((category) => (
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
                    {loadingProducts
                        ? "Loading products..."
                        : `Showing ${sortedProducts.length} of ${products.length} products${selectedCategory !== "All" ? ` in ${selectedCategory}` : ""
                        }`}
                </p>
            </div>

            {/* Products Grid */}
            {!loadingProducts && (
                <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
                    {sortedProducts.map((item) => (
                        <ProductCard
                            key={item.id}
                            {...item}
                            isInWishlist={wishlistIds.includes(item.id)}
                            onAddToWishlist={() => handleAddToWishlist(item)}
                            onAddToCart={() => handleAddToCart(item)}
                        />
                    ))}
                </div>
            )}

            {/* Load More Button */}
            <div className="text-center mt-12">
                <Button label="Load More Products" onClick={() => console.log("Load more functionality")} />
            </div>
        </section>
    );
}
