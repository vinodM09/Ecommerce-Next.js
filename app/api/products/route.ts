import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import products from "@/data/products";

interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  inventory: number;
  image: string;
  lastUpdated: string;
}

// GET all products
export async function GET() {
  return NextResponse.json(products, { status: 200 });
}

// POST create new product
export async function POST(request: Request) {
  try {
    const form = await request.formData();

    const name = form.get("name")?.toString() || "";
    const price = parseFloat(form.get("price")?.toString() || "0");
    const category = form.get("category")?.toString() || "Uncategorized";
    const description = form.get("description")?.toString() || "";
    const inventory = parseInt(form.get("inventory")?.toString() || "0");
    const slug =
      form.get("slug")?.toString() ||
      name.toLowerCase().replace(/\s+/g, "-");
    const lastUpdated =
      form.get("lastUpdated")?.toString() || new Date().toISOString();

    // Handle image upload
    const file = form.get("image");
    let imagePath = "";

    if (file && typeof file !== "string") {
      const filename = `${Date.now()}-${(file.name || "upload").replace(
        /\s+/g,
        "-"
      )}`;
      const buffer = Buffer.from(await file.arrayBuffer());

      const imagesDir = path.join(process.cwd(), "public", "images");
      if (!fs.existsSync(imagesDir)) {
        fs.mkdirSync(imagesDir, { recursive: true });
      }

      const filepath = path.join(imagesDir, filename);
      fs.writeFileSync(filepath, buffer);
      imagePath = `/images/${filename}`;
    }

    // Create a new product that matches your data/products structure
    const newProduct: Product = {
      _id: String(products.length + 1),
      name,
      slug,
      description,
      price,
      category,
      inventory,
      image: imagePath || "/images/default.png",
      lastUpdated,
    };

    // Add to array
    products.push(newProduct);

    return NextResponse.json(newProduct, { status: 201 });
  } catch (err) {
    console.error("POST /api/products error:", err);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}