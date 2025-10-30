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

interface RouteContext {
  params: Promise<{ slug: string }>;
}

// GET /api/products/[slug]
export async function GET(
  _request: Request,
  context: RouteContext
): Promise<NextResponse> {
  try {
    const { slug } = await context.params;
    const product = (products as Product[]).find((p) => p.slug === slug);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (err) {
    console.error("GET /api/products/[slug] error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// PUT /api/products/[slug]
export async function PUT(
  request: Request,
  context: RouteContext
): Promise<NextResponse> {
  try {
    const { slug } = await context.params;
    const productIndex = (products as Product[]).findIndex((p) => p.slug === slug);

    if (productIndex === -1) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const form = await request.formData();
    const current = (products as Product[])[productIndex];

    const name = form.get("name")?.toString() || current.name;
    const price = parseFloat(form.get("price")?.toString() || String(current.price));
    const category = form.get("category")?.toString() || current.category;
    const description = form.get("description")?.toString() || current.description;
    const inventory = parseInt(form.get("inventory")?.toString() || String(current.inventory));
    const newSlug = form.get("slug")?.toString() || name.toLowerCase().replace(/\s+/g, "-");
    const lastUpdated =
      form.get("lastUpdated")?.toString() || new Date().toISOString();

    // Handle image upload if provided
    const file = form.get("image");
    let imagePath = current.image;

    if (file && typeof file !== "string") {
      const filename = `${Date.now()}-${(file.name || "upload").replace(/\s+/g, "-")}`;
      const buffer = Buffer.from(await file.arrayBuffer());

      const imagesDir = path.join(process.cwd(), "public", "images");
      if (!fs.existsSync(imagesDir)) {
        fs.mkdirSync(imagesDir, { recursive: true });
      }

      const filepath = path.join(imagesDir, filename);
      fs.writeFileSync(filepath, buffer);
      imagePath = `/images/${filename}`;
    }

    const updated: Product = {
      ...current,
      name,
      slug: newSlug,
      description,
      price,
      category,
      inventory,
      image: imagePath,
      lastUpdated,
    };

    (products as Product[])[productIndex] = updated;

    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    console.error("PUT /api/products/[slug] error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}