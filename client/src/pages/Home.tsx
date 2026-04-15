import React, { useContext, useEffect, useState } from 'react'
import { ProductCard } from '../components/ProductCard'
import { Product, AppContext } from '../types'
import { useApi } from '../hooks/useApi'
import { Award, Truck, MessageCircle } from 'lucide-react'

interface HomeProps {
  onAddToCart: (product: Product) => void
}

export const Home: React.FC<HomeProps> = ({ onAddToCart }) => {
  const context = useContext(AppContext)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)

  const heroTitle = context?.siteContent.heroTitle || 'Welcome to FashionBrand'
  const heroSubtitle = context?.siteContent.heroSubtitle || 'Discover the latest trends and express your unique style with our exclusive collection.'
  const heroButton = context?.siteContent.heroButton || 'Shop Now'
  const heroBackground = context?.siteContent.heroBackground || 'https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=1600&q=80'
  const carouselImages = (context?.siteContent.carouselImages || '').split(',').map(url => url.trim()).filter(Boolean)
  const featureRows = [
    context?.siteContent.feature1,
    context?.siteContent.feature2,
    context?.siteContent.feature3
  ].map(item => {
    const [title = '', text = '', icon = 'sparkles'] = item?.split('|').map(part => part.trim()) || []
    return { title, text, icon }
  })

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

  useEffect(() => {
    if (carouselImages.length === 0) return
    const interval = window.setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % carouselImages.length)
    }, 5000)
    return () => window.clearInterval(interval)
  }, [carouselImages.length])

  const getFeatureIcon = (name: string) => {
    switch (name) {
      case 'truck':
        return <Truck size={36} className="mx-auto text-purple-400" />
      case 'award':
        return <Award size={36} className="mx-auto text-purple-400" />
      case 'message-circle':
        return <MessageCircle size={36} className="mx-auto text-purple-400" />
      default:
        return <div className="mx-auto text-purple-400 text-4xl">✨</div>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div
        className="relative overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.9)), url('${heroBackground}')` }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 relative z-10">
          <div className="max-w-3xl text-white">
            <p className="text-sm uppercase tracking-[0.3em] text-purple-300 mb-4">Brand Stories</p>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              {heroTitle}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8">
              {heroSubtitle}
            </p>
            <button className="bg-white text-purple-700 px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-100 transition">
              {heroButton}
            </button>
          </div>
        </div>
      </div>

      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative h-[420px] overflow-hidden rounded-3xl shadow-2xl">
          {carouselImages.length > 0 ? (
            carouselImages.map((image, index) => (
              <div
                key={`${image}-${index}`}
                className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}
              >
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
              </div>
            ))
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-700 text-white">
              No carousel images configured
            </div>
          )}
          <div className="absolute bottom-6 left-6 z-20 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur">
            {carouselImages.length > 0 && `Slide ${currentSlide + 1} / ${carouselImages.length}`}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <h2 className="text-4xl font-bold text-white mb-10">Featured Products</h2>

        {loading ? (
          <div className="text-center text-gray-400 py-8">Loading...</div>
        ) : products.length === 0 ? (
          <div className="text-center text-gray-400 py-8">No featured products yet</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
          </div>
        )}
      </section>

      <section className="bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featureRows.map((feature, index) => (
              <div key={index} className="text-center bg-white/5 border border-white/10 rounded-3xl p-8">
                {getFeatureIcon(feature.icon)}
                <h3 className="text-xl font-semibold text-white mt-6 mb-3">{feature.title || 'Feature'}</h3>
                <p className="text-gray-400">{feature.text || 'Create unique content in admin.'}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
