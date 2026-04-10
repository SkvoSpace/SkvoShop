import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, ShoppingCart } from 'lucide-react'

interface HeaderProps {
  cartCount: number
}

export const Header: React.FC<HeaderProps> = ({ cartCount }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-black text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded"></div>
            <span>FashionBrand</span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="hover:text-purple-400 transition">
              Home
            </Link>
            <Link to="/shop" className="hover:text-purple-400 transition">
              Shop
            </Link>
            <Link to="/gallery" className="hover:text-purple-400 transition">
              Gallery
            </Link>
            <Link to="/admin" className="hover:text-purple-400 transition">
              Admin
            </Link>
          </nav>

          {/* Cart Icon */}
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative hover:text-purple-400 transition">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            <Link
              to="/"
              className="block py-2 hover:text-purple-400 transition"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="block py-2 hover:text-purple-400 transition"
              onClick={() => setIsOpen(false)}
            >
              Shop
            </Link>
            <Link
              to="/gallery"
              className="block py-2 hover:text-purple-400 transition"
              onClick={() => setIsOpen(false)}
            >
              Gallery
            </Link>
            <Link
              to="/admin"
              className="block py-2 hover:text-purple-400 transition"
              onClick={() => setIsOpen(false)}
            >
              Admin
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
