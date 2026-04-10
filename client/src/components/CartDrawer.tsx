import React from 'react'
import { CartItem } from '../types'
import { formatPrice } from '../lib/utils'
import { Trash2 } from 'lucide-react'

interface CartDrawerProps {
  items: CartItem[]
  onRemove: (productId: number) => void
  onCheckout: () => void
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ items, onRemove, onCheckout }) => {
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      {items.length === 0 ? (
        <p className="text-gray-600 text-center py-8">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {items.map(item => (
              <div key={item.product.id} className="flex justify-between items-center border-b pb-4">
                <div>
                  <h3 className="font-semibold">{item.product.name}</h3>
                  <p className="text-gray-600">
                    {formatPrice(item.product.price)} x {item.quantity}
                  </p>
                </div>
                <button
                  onClick={() => onRemove(item.product.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          <div className="bg-gray-100 p-4 rounded mb-6">
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total:</span>
              <span className="text-purple-600">{formatPrice(total)}</span>
            </div>
          </div>

          <button
            onClick={onCheckout}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded font-semibold transition"
          >
            Checkout
          </button>
        </>
      )}
    </div>
  )
}
