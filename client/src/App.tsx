import React, { useContext, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AppProvider, AppContext, Product } from './types'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Home } from './pages/Home'
import { Shop } from './pages/Shop'
import { Gallery } from './pages/Gallery'
import { Admin } from './pages/Admin'
import { CartDrawer } from './components/CartDrawer'
import './index.css'

const AppContent: React.FC = () => {
  const context = useContext(AppContext)
  const [showCart, setShowCart] = useState(false)

  if (!context) {
    return <div>Loading...</div>
  }

  const handleAddToCart = (product: Product) => {
    context.addToCart(product, 1)
    alert('Added to cart!')
  }

  const handleCheckout = () => {
    alert('Thank you for your purchase! This is a demo checkout.')
    context.clearCart()
    setShowCart(false)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header cartCount={context.cart.length} />

      <main className="flex-1">
        {showCart ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <button
              onClick={() => setShowCart(false)}
              className="mb-4 text-blue-500 hover:text-blue-700"
            >
              ← Continue Shopping
            </button>
            <CartDrawer
              items={context.cart}
              onRemove={context.removeFromCart}
              onCheckout={handleCheckout}
            />
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />
            <Route path="/shop" element={<Shop onAddToCart={handleAddToCart} />} />
            <Route path="/gallery" element={<Gallery onAddToCart={handleAddToCart} />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/cart" element={<div onClick={() => setShowCart(true)} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"><CartDrawer items={context.cart} onRemove={context.removeFromCart} onCheckout={handleCheckout} /></div>} />
          </Routes>
        )}
      </main>

      <Footer />
    </div>
  )
}

export const App: React.FC = () => {
  return (
    <Router>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </Router>
  )
}
