"use client";

import { useState, useEffect } from "react";
import AddProductForm from "./components/AddProductForm";
import EditProductRow from "./components/EditProductRow";

interface Product {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  category: string;
  inventory: number;
  image?: string;
  lastUpdated?: string;
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  async function fetchProducts() {
    try {
      const res = await fetch("/api/products", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Fetch products error:", err);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p._id === id ? { ...p, ...updated } : p)));
    setEditingId(null);
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6 space-y-6 w-full max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>
      <p className="text-gray-500 mb-4">Manage and update your product catalog</p>

      <AddProductForm onAdd={fetchProducts} />

      <section className="bg-white p-5 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Product List</h2>
        {products.length === 0 ? (
          <p className="text-gray-500 text-sm">No products found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b bg-gray-100 text-left">
                  <th className="p-2">Name</th>
                  <th className="p-2">Category</th>
                  <th className="p-2">Price (₹)</th>
                  <th className="p-2">Inventory</th>
                  <th className="p-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <EditProductRow
                    key={p._id}
                    product={p}
                    editingId={editingId}
                    setEditingId={setEditingId}
                    setProducts={setProducts}
                    onSave={updateProduct}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}