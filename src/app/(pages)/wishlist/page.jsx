"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@/hooks/useUser";

export default function WishlistPage() {
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [cart, setCart] = useState([]);
  const user = useUser();

  // Load cart from localStorage (still local)
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Fetch wishlist -> then fetch products
  useEffect(() => {
    if (!user) {
      setWishlistProducts([]);
      setLoading(false);
      return;
    }

    async function fetchWishlistAndProducts() {
      setLoading(true);

      const { data: wishlistRows, error } = await supabase
        .from("wishlist")
        .select("product_id")
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching wishlist:", error);
        setLoading(false);
        return;
      }

      const ids = (wishlistRows || []).map((row) => row.product_id);

      if (ids.length === 0) {
        setWishlistProducts([]);
        setLoading(false);
        return;
      }

      const { data: products, error: prodErr } = await supabase
        .from("products")
        .select("*")
        .in("id", ids);

      if (prodErr) {
        console.error("Error fetching products for wishlist:", prodErr);
        setLoading(false);
        return;
      }

      setWishlistProducts(products || []);
      setLoading(false);
    }

    fetchWishlistAndProducts();
  }, [user]);

  const handleRemove = async (productId) => {
    if (!user) return;

    const { error } = await supabase
      .from("wishlist")
      .delete()
      .match({ user_id: user.id, product_id: productId });

    if (error) {
      console.error("Error removing from wishlist:", error);
      return;
    }

    setWishlistProducts((prev) => prev.filter((item) => item.id !== productId));
  };

  // Cart still local
  const handleAddToCart = async (product) => {
    if (!user) {
      openLogin(); // global popup trigger
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
    // Optional: also remove from wishlist after adding to cart
    handleRemove(product.id);
  };

  if (!user && !loading) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Your Wishlist ❤️
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          Please log in to view your wishlist.
        </p>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Your Wishlist ❤️
      </h1>

      {loading ? (
        <p className="text-gray-500 dark:text-gray-400 text-lg">Loading wishlist...</p>
      ) : wishlistProducts.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          Your wishlist is empty.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:gap-6 gap-4">
          {wishlistProducts.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-900 shadow-md p-4 rounded-xl border border-gray-200 dark:border-gray-700"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-[200px] object-cover rounded-lg"
              />

              <h3 className="mt-3 text-lg font-semibold dark:text-white">
                {item.name}
              </h3>

              <p className="text-coral-red font-semibold text-xl">
                ${item.price}
              </p>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleRemove(item.id)}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
                >
                  Remove
                </button>

                <button
                  onClick={() => handleAddToCart(item)}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
