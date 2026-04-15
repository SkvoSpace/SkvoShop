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
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart')
    return saved ? JSON.parse(saved) : []
  })
  const [products] = useState<Product[]>([])
  const [siteContent] = useState<Record<string, string>>({})

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

  return (
    <AppContext.Provider value={{ products, cart, addToCart, removeFromCart, clearCart, siteContent }}>
      {children}
    </AppContext.Provider>
  )
}
