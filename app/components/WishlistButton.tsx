"use client"

import { useState } from "react"
import { Heart } from "lucide-react"

export default function WishlistButton({ productId }: { productId: number }) {
  const [isWishlisted, setIsWishlisted] = useState(false)

  const toggleWishlist = () => {
    setIsWishlisted((prev) => !prev)
    console.log(`Product ${productId} ${!isWishlisted ? "added to" : "removed from"} wishlist`)
  }

  return (
    <button
      onClick={toggleWishlist}
      className={`flex items-center gap-1 px-3 py-1 rounded-full border ${
        isWishlisted ? "bg-red-100 border-red-400" : "bg-white border-gray-300"
      }`}
    >
      <Heart
        className={`w-5 h-5 ${isWishlisted ? "fill-red-500 stroke-red-500" : "stroke-gray-500"}`}
      />
      <span className="text-sm">{isWishlisted ? "Wishlisted" : "Add to Wishlist"}</span>
    </button>
  )
}