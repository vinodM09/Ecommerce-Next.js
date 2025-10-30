/**
 * This page demonstrates:
 * - Static Site Generation (SSG) + Incremental Static Regeneration (ISR)
 *   using Next.js caching and revalidation every 60 seconds.
 * - Client-side search/filtering for instant results without reloading.
 * - Combined client & server benefits: faster initial load, dynamic UX. -_-
 */

"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  description?: string;
  category?: string;
  inventory?: number;
  image?: string;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Client-side fetch (using ISR cached data from API)
  useEffect(() => {
    async function fetchProducts() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        const res = await fetch(`${baseUrl}/api/products`, {
          next: { revalidate: 60 },
        });
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Filter products by search input
  const filteredProducts = useMemo(() => {
    return products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, products]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Loading products...
      </div>
    );
  }

  return (
      <main className="min-h-screen flex flex-col items-center bg-gray-50 px-6 py-10">
      {/* Search Bar */}
      <div className="max-w-3xl mx-auto mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 text-black bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Product Grid */}
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 justify-items-center flex-grow w-full max-w-6xl">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
            <Link
              key={p._id}
              href={`/products/${p.slug}`}
              className="group w-80 rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <div className="aspect-square w-full overflow-hidden">
                <img
                  src={
                    p.image ||
                    "https://via.placeholder.com/400x400?text=No+Image"
                  }
                  alt={p.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Card Body */}
              <div className="p-4">
                <h2 className="text-lg font-bold truncate">{p.name}</h2>
                <p className="text-gray-600 mt-1">
                  ₹{p.price.toLocaleString("en-IN")}
                </p>
              </div>
            </Link>
          ))
        ) : (
        <p className="text-center col-span-full text-gray-600 h-[50vh] flex items-center justify-center">
          No products found.
        </p>
        )}
      </div>
    </main>
  );
}