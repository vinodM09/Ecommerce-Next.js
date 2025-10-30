"use client";

import React, { useState } from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

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

interface EditProductRowProps {
  product: Product;
  editingId: string | null;
  setEditingId: (id: string | null) => void;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  onSave: (id: string, updated: Partial<Product>) => void;
}

export default function EditProductRow({
  product,
  editingId,
  setEditingId,
  setProducts,
  onSave,
}: EditProductRowProps) {
  const [local, setLocal] = useState<Product>({ ...product });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [snackSeverity, setSnackSeverity] = useState<"success" | "error">(
    "success"
  );

  const showSnack = (msg: string, severity: "success" | "error" = "success") => {
    setSnackMsg(msg);
    setSnackSeverity(severity);
    setSnackOpen(true);
  };

  const save = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", local.name);
      formData.append("price", String(local.price));
      formData.append("category", local.category);
      formData.append("description", local.description ?? "");
      formData.append("inventory", String(local.inventory ?? 0));
      formData.append("slug", local.slug ?? local.name.toLowerCase().replace(/\s+/g, "-"));
      formData.append("lastUpdated", new Date().toISOString());
      if (imageFile) formData.append("image", imageFile);

      const res = await fetch(`/api/products/${product.slug}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) {
        const body = await res.text();
        console.error("Update failed:", res.status, body);
        showSnack("Failed to update product", "error");
      } else {
        const updatedProduct = await res.json();
        // Update parent products state
        setProducts((prev) => prev.map((p) => (p._id === product._id ? updatedProduct : p)));
        showSnack("Product updated", "success");
        setEditingId(null);
        onSave(product._id, updatedProduct);
      }
    } catch (err) {
      console.error(err);
      showSnack("Failed to update product", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <tr key={product._id} className="border-b hover:bg-gray-50">
      <td className="p-2">
        {editingId === product._id ? (
          <input
            className="border p-1 rounded w-full"
            value={local.name}
            onChange={(e) => setLocal({ ...local, name: e.target.value })}
          />
        ) : (
          <div className="flex items-center gap-3">
            {product.image ? (
              <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded" />
            ) : null}
            <span>{product.name}</span>
          </div>
        )}
      </td>

      <td className="p-2">
        {editingId === product._id ? (
          <input
            className="border p-1 rounded w-full"
            value={local.category}
            onChange={(e) => setLocal({ ...local, category: e.target.value })}
          />
        ) : (
          product.category
        )}
      </td>

      <td className="p-2">
        {editingId === product._id ? (
          <input
            className="border p-1 rounded w-24"
            type="number"
            value={local.price}
            onChange={(e) => setLocal({ ...local, price: parseFloat(e.target.value || "0") })}
          />
        ) : (
          `₹${product.price}`
        )}
      </td>

      <td className="p-2">
        {editingId === product._id ? (
          <input
            className="border p-1 rounded w-20"
            type="number"
            value={local.inventory}
            onChange={(e) => setLocal({ ...local, inventory: parseInt(e.target.value || "0") })}
          />
        ) : (
          product.inventory
        )}
      </td>

      <td className="p-2">
        {editingId === product._id ? (
          <>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
            />
            <div className="mt-2 flex gap-2">
              <Button variant="contained" color="success" size="small" onClick={save} disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </Button>
              <Button variant="outlined" color="inherit" size="small" onClick={() => setEditingId(null)}>
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <div className="flex gap-2 justify-center">
            <Button variant="contained" color="warning" size="small" onClick={() => setEditingId(product._id)}>
              Edit
            </Button>
          </div>
        )}
      </td>

      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={() => setSnackOpen(false)}
      >
        <Alert onClose={() => setSnackOpen(false)} severity={snackSeverity} sx={{ width: "100%" }}>
          {snackMsg}
        </Alert>
      </Snackbar>
    </tr>
  );
}