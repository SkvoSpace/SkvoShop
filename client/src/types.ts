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

export interface SiteContent {
  id: number
  key: string
  value: string
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
}

export const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([])
  const [products] = useState<Product[]>([])
  const [siteContent] = useState<Record<string, string>>({})

  const addToCart = (product: Product, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { product, quantity }]
    })
  }

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.product.id !== productId))
  }

  const clearCart = () => setCart([])

  return (
    <AppContext.Provider value={{ products, cart, addToCart, removeFromCart, clearCart, siteContent }}>
      {children}
    </AppContext.Provider>
  )
}
