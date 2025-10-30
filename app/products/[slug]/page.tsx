interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  inventory: number;
  image?: string;
  category?: string;
}

async function getProduct(slug: string): Promise<Product> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}/api/products/${slug}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}

export default async function ProductPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const product = await getProduct(slug);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 py-10 px-6 flex justify-center">
      <div className="w-full max-w-3xl">
        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-400 overflow-hidden">
          {/* Product Image */}
          <img
            src={product.image || "https://via.placeholder.com/800x600?text=No+Image"}
            alt={product.name}
            className="w-full h-96 object-cover bg-gray-100"
          />

          {/* Card Body */}
          <div className="p-6 space-y-4">
            <h1 className="text-3xl font-extrabold">{product.name}</h1>
            <p className="text-lg text-gray-900 leading-relaxed">
              {product.description}
            </p>

            <p className="text-2xl font-semibold">
              ₹{product.price.toLocaleString("en-IN")}{" "}
              <span className="text-base italic font-normal text-gray-500"></span>
            </p>

            <p className="text-gray-600 dark:text-gray-400">
              In stock: <span className="font-medium">{product.inventory}</span>
            </p>

            <p className="text-sm text-gray-500">Last updated 3 mins ago</p>
          </div>
        </div>
      </div>
    </main>
  );
}