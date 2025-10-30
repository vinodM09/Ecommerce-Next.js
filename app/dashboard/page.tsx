"use client";

import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  inventory: number;
  lastUpdated: string;
}

const COLORS = ["#22C55E", "#3B82F6", "#FACC15", "#EC4899", "#8B5CF6", "#F97316"];

export default function DashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  async function getInventory() {
    try {
      const res = await fetch("/api/products", { cache: "no-store" });
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getInventory();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Loading dashboard...
      </div>
    );
  }

  // derived stats
  const totalProducts = products.length;
  const lowStock = products.filter((p) => p.inventory < 5);
  const totalValue = products.reduce((sum, p) => sum + p.price * p.inventory, 0);

// category distribution
const categoryCounts: { name: string; value: number }[] = Object.values(
  products.reduce<Record<string, { name: string; value: number }>>((acc, p) => {
    acc[p.category] = acc[p.category] || { name: p.category, value: 0 };
    acc[p.category].value += 1;
    return acc;
  }, {})
);

  // inventory trend
  const topStocked = products
    .sort((a, b) => b.inventory - a.inventory)
    .slice(0, 6)
    .map((p) => ({ name: p.name.slice(0, 10) + "...", stock: p.inventory }));

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <h1 className="text-3xl font-bold">Inventory Dashboard</h1>
        <p className="text-gray-500">Live overview of product stock and categories</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl shadow text-center">
          <div className="text-sm text-gray-500">Total Products</div>
          <div className="text-3xl font-bold text-blue-600">{totalProducts}</div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow text-center">
          <div className="text-sm text-gray-500">Low Stock Items</div>
          <div className="text-3xl font-bold text-red-600">{lowStock.length}</div>
        </div>
        <div className="bg-white p-5 rounded-xl shadow text-center">
          <div className="text-sm text-gray-500">Total Inventory Value (Real Time)</div>
          <div className="text-3xl font-bold text-green-600">
            ₹{totalValue.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <div className="bg-white p-5 rounded-xl shadow">
          <div className="text-lg font-semibold mb-2">Category Breakdown</div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryCounts}
                  dataKey="value"
                  outerRadius={80}
                  label
                >
                  {categoryCounts.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Stocked Products */}
        <div className="bg-white p-5 rounded-xl shadow">
          <div className="text-lg font-semibold mb-2">Top Stocked Products</div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topStocked}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="stock" fill="#3B82F6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Low Stock Table */}
      <div className="bg-white p-5 rounded-xl shadow">
        <div className="text-lg font-semibold mb-3">Low Stock Alerts</div>
        {lowStock.length === 0 ? (
          <p className="text-gray-500 text-sm">All products are sufficiently stocked.</p>
        ) : (
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b text-left">
                <th className="py-2">Product</th>
                <th>Category</th>
                <th>Inventory</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {lowStock.map((p) => (
                <tr key={p._id} className="border-b hover:bg-gray-50">
                  <td className="py-2 font-medium">{p.name}</td>
                  <td>{p.category}</td>
                  <td className="text-red-600 font-semibold">{p.inventory}</td>
                  <td>{new Date(p.lastUpdated).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}