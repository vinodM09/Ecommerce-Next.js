"use client";

import { useState, FormEvent } from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

interface AddProductFormProps {
  onAdd: () => void;
}

export default function AddProductForm({ onAdd }: AddProductFormProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<string>("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [inventory, setInventory] = useState<string>("");
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

  const addProduct = async (e: FormEvent) => {
    e.preventDefault();

    if (!name || !price || !category) {
      showSnack("Name, price and category are required", "error");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("inventory", inventory || "0");
      formData.append("slug", name.toLowerCase().trim().replace(/\s+/g, "-"));
      formData.append("lastUpdated", new Date().toISOString());
      if (imageFile) formData.append("image", imageFile);

      const res = await fetch("/api/products", {
        method: "POST",
        body: formData,
        // no JSON header for FormData
      });

      if (!res.ok) {
        const body = await res.text();
        console.error("Add product failed:", res.status, body);
        showSnack("Failed to add product", "error");
      } else {
        showSnack("Product added successfully", "success");
        // reset form
        setName("");
        setPrice("");
        setCategory("");
        setDescription("");
        setInventory("");
        setImageFile(null);
        onAdd();
      }
    } catch (err) {
      console.error(err);
      showSnack("Failed to add product", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white p-5 rounded-xl shadow">
      <Typography variant="h6" className="mb-3">
        Add New Product
      </Typography>

      <form
        onSubmit={addProduct}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
      >
        <TextField
          label="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          size="small"
        />
        <TextField
          label="Price (₹)"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          size="small"
        />
        <TextField
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          size="small"
        />
        <TextField
          label="Inventory Count"
          type="number"
          value={inventory}
          onChange={(e) => setInventory(e.target.value)}
          size="small"
        />
        <TextField
          label="Description"
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          size="small"
          className="md:col-span-2 lg:col-span-3"
        />
        <div className="md:col-span-2 lg:col-span-3">
          <input
            id="product-image"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const f = e.target.files?.[0] ?? null;
              setImageFile(f);
            }}
            className="mb-2"
          />
        </div>

        <div className="md:col-span-3">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Product"}
          </Button>
        </div>
      </form>

      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={() => setSnackOpen(false)}
      >
        <Alert
          onClose={() => setSnackOpen(false)}
          severity={snackSeverity}
          sx={{ width: "100%" }}
        >
          {snackMsg}
        </Alert>
      </Snackbar>
    </section>
  );
}