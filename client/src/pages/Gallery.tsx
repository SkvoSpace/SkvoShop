import React, { useContext, useEffect, useState } from 'react'
import { AppContext, Product } from '../types'
import { useApi } from '../hooks/useApi'

interface GalleryProps {
  onAddToCart: (product: Product) => void
}

export const Gallery: React.FC<GalleryProps> = ({ onAddToCart }) => {
  const context = useContext(AppContext)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const galleryImages = (context?.siteContent.galleryImages || '').split(',').map(url => url.trim()).filter(Boolean)

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const data = await useApi<Product[]>('/api/products')
        setProducts(data)
      } catch (error) {
        console.error('Failed to fetch products:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-12">Gallery</h1>

        {galleryImages.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {galleryImages.map((image, index) => (
              <div key={`${image}-${index}`} className="overflow-hidden rounded-3xl shadow-lg bg-white">
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">No products yet</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <div
                key={product.id}
                className="bg-white rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition group"
                onClick={() => onAddToCart(product)}
              >
                <div className="w-full h-48 bg-gray-200 overflow-hidden">
                  <img
                    src={product.image || 'https://via.placeholder.com/300x300?text=Fashion'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-sm line-clamp-1">{product.name}</h3>
                  <p className="text-purple-600 font-bold text-sm">₽{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
