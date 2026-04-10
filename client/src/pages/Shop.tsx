import React, { useEffect, useState } from 'react'
import { ProductCard } from '../components/ProductCard'
import { Product } from '../types'
import { useApi } from '../hooks/useApi'

interface ShopProps {
  onAddToCart: (product: Product) => void
}

export const Shop: React.FC<ShopProps> = ({ onAddToCart }) => {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = selectedCategory === 'all'
          ? '/api/products'
          : `/api/products?category=${selectedCategory}`
        const data = await useApi<Product[]>(url)
        setProducts(data)
      } catch (error) {
        console.error('Failed to fetch products:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [selectedCategory])

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'clothes', label: 'Clothes' },
    { id: 'accessories', label: 'Accessories' },
    { id: 'shoes', label: 'Shoes' }
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">Shop</h1>

        {/* Category Filter */}
        <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-2 rounded whitespace-nowrap transition ${
                selectedCategory === cat.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-900 hover:bg-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">No products found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
