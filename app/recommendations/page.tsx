// Description:
// This page demonstrates how to combine React Server Components (RSC) and Client Components in Next.js.
// 1. We fetch recommended products server-side using an async server component (faster, SEO-friendly).
// 2. The products are rendered on the server and sent to the client as HTML. -__-
// 3. Each product includes a client-side WishlistButton that runs only in the browser.
// This pattern helps achieve optimal performance by minimizing client-side JavaScript usage.

import WishlistButton from "../components/WishlistButton"

type Product = {
  id: number
  name: string
  price: number
  image: string
}

// server-side data fetch
async function getRecommendedProducts(): Promise<Product[]> {
  // In real-world: fetch from database
  await new Promise((res) => setTimeout(res, 400)) // simulate latency
  return [
    { id: 1, name: "Smart Watch", price: 14999, image: "/images/watch.avif" },
    { id: 2, name: "Wireless Earbuds", price: 4999, image: "/images/earbuds.avif" },
    { id: 3, name: "Laptop Stand", price: 2499, image: "/images/laptop-stand.avif" },
  ]
}

// This is a React Server Component
export default async function RecommendationsPage() {
  const products = await getRecommendedProducts()

  return (
    <main className="p-8">
      <h1 className="text-3xl font-semibold mb-6">Recommended Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-2xl shadow-md p-4 flex flex-col items-center"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-40 h-40 object-cover mb-4 rounded-xl"
            />
            <h2 className="text-lg font-medium mb-1">{product.name}</h2>
            <p className="text-gray-600 mb-3">₹{product.price}</p>
            {/* This part is client-side interactive */}
            <WishlistButton productId={product.id} />
          </div>
        ))}
      </div>
    </main>
  )
}