import React from 'react'
import { Product } from '../../../types'
import { formatPrice } from '../../lib/utils'
import { Edit2, Trash2 } from 'lucide-react'

interface ProductListProps {
  products: Product[]
  onEdit: (product: Product) => void
  onDelete: (productId: number) => void
}

export const ProductList: React.FC<ProductListProps> = ({ products, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2 text-left">Name</th>
            <th className="border p-2 text-left">Category</th>
            <th className="border p-2 text-left">Price</th>
            <th className="border p-2 text-left">Featured</th>
            <th className="border p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="border p-2">{product.name}</td>
              <td className="border p-2">{product.category}</td>
              <td className="border p-2">{formatPrice(product.price)}</td>
              <td className="border p-2">{product.featured ? '✓' : '-'}</td>
              <td className="border p-2 space-x-2 flex">
                <button
                  onClick={() => onEdit(product)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => onDelete(product.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
