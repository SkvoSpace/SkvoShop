import React, { createContext, ReactNode, useState } from 'react'

export interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
  featured: boolean
}

export interface CartItem {
  product: Product
  quantity: number
}

interface AppContextType {
  products: Product[]
  cart: CartItem[]
  addToCart: (product: Product, quantity: number) => void
  removeFromCart: (productId: number) => void
  clearCart: () => void
  siteContent: Record<string, string>
  updateSiteContent: (content: Record<string, string>) => void
}

const defaultSiteContent: Record<string, string> = {
  brand: 'FashionBrand',
  menuHome: 'Home',
  menuShop: 'Shop',
  menuGallery: 'Gallery',
  menuAdmin: 'Admin',
  heroTitle: 'Welcome to FashionBrand',
  heroSubtitle: 'Discover the latest trends and express your unique style with our exclusive collection.',
  heroButton: 'Shop Now',
  heroBackground: 'https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=1600&q=80',
  footerAbout: 'FashionBrand - ваш источник стильной одежды и аксессуаров.',
  footerLinks: 'Terms,Privacy,Contact',
  footerSocial: 'Instagram,Twitter,TikTok',
  carouselImages: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80,https://images.unsplash.com/photo-1495121605193-b116b5b9c5d4?auto=format&fit=crop&w=1200&q=80,https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=1200&q=80',
  galleryImages: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80,https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80,https://images.unsplash.com/photo-1495121605193-b116b5b9c5d4?auto=format&fit=crop&w=800&q=80',
  feature1: 'Fast Delivery|Get your items within 3-5 business days|truck',
  feature2: 'Quality Guaranteed|Premium materials and careful craftsmanship|award',
  feature3: '24/7 Support|We are here to help whenever you need us|message-circle'
}

export const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart')
    return saved ? JSON.parse(saved) : []
  })
  const [products] = useState<Product[]>([])
  const [siteContent, setSiteContent] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('siteContent')
    return saved ? JSON.parse(saved) : defaultSiteContent
  })

  const addToCart = (product: Product, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id)
      let newCart
      if (existing) {
        newCart = prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        newCart = [...prev, { product, quantity }]
      }
      localStorage.setItem('cart', JSON.stringify(newCart))
      return newCart
    })
  }

  const removeFromCart = (productId: number) => {
    setCart(prev => {
      const newCart = prev.filter(item => item.product.id !== productId)
      localStorage.setItem('cart', JSON.stringify(newCart))
      return newCart
    })
  }

  const clearCart = () => {
    setCart([])
    localStorage.removeItem('cart')
  }

  const updateSiteContent = (content: Record<string, string>) => {
    setSiteContent(content)
    localStorage.setItem('siteContent', JSON.stringify(content))
  }

  return (
    <AppContext.Provider value={{ products, cart, addToCart, removeFromCart, clearCart, siteContent, updateSiteContent }}>
      {children}
    </AppContext.Provider>
  )
}
