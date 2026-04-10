import React, { useEffect, useState } from 'react'
import { ProductCard } from '../components/ProductCard'
import { Product } from '../types'
import { useApi } from '../hooks/useApi'

interface HomeProps {
  onAddToCart: (product: Product) => void
}

export const Home: React.FC<HomeProps> = ({ onAddToCart }) => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const featured = await useApi<Product[]>('/api/products?featured=true')
        setProducts(featured)
      } catch (error) {
        console.error('Failed to fetch featured products:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchFeatured()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Welcome to FashionBrand
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">
            Discover the latest trends and express your unique style with our exclusive collection.
          </p>
          <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Shop Now
          </button>
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-white mb-12">Featured Products</h2>

        {loading ? (
          <div className="text-center text-gray-400 py-8">Loading...</div>
        ) : products.length === 0 ? (
          <div className="text-center text-gray-400 py-8">No featured products yet</div>
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

      {/* Info Section */}
      <div className="bg-gray-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
              <p className="text-gray-400">Get your items within 3-5 business days</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💯</div>
              <h3 className="text-xl font-bold mb-2">Quality Guaranteed</h3>
              <p className="text-gray-400">Premium materials and careful craftsmanship</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
              <p className="text-gray-400">We're here to help whenever you need us</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
