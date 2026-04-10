import React from 'react'
import { Product } from '../types'
import { formatPrice } from '../lib/utils'

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-xl transition-shadow overflow-hidden">
      <div className="relative h-64 bg-gray-200 overflow-hidden">
        <img
          src={product.image || 'https://via.placeholder.com/300x300?text=Fashion'}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
        {product.featured && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded text-sm font-bold">
            Featured
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 line-clamp-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mt-2 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-2xl font-bold text-purple-600">
            {formatPrice(product.price)}
          </span>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  )
}
