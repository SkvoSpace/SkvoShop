import React, { useState } from 'react'
import { ProductForm } from '../components/Admin/ProductForm'
import { ProductList } from '../components/Admin/ProductList'
import { Product } from '../types'

export const Admin: React.FC = () => {
  const [password, setPassword] = useState('')
  const [isAuthed, setIsAuthed] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [editingProduct, setEditingProduct] = useState<Product | undefined>()
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/products')
      if (response.ok) {
        const data = await response.json()
        setProducts(data.data || [])
      } else {
        alert('Failed to load products')
      }
    } catch (error) {
      console.error('Error loading products:', error)
      alert('Error loading products')
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === '12345') {
      setIsAuthed(true)
      setPassword('')
      fetchProducts()
    } else {
      alert('Invalid password!')
    }
  }

  const handleSubmit = async (data: Partial<Product>): Promise<void> => {
    try {
      if (editingProduct) {
        // Update
        const response = await fetch(`/api/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 12345'
          },
          body: JSON.stringify(data)
        })
        if (response.ok) {
          setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...data } as Product : p))
          setEditingProduct(undefined)
          setShowForm(false)
        } else {
          alert('Failed to update product')
        }
      } else {
        // Create
        const response = await fetch('/api/products', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 12345'
          },
          body: JSON.stringify(data)
        })
        if (response.ok) {
          const newProduct = await response.json() as Product
          setProducts([...products, newProduct])
          setShowForm(false)
        } else {
          alert('Failed to create product')
        }
      }
    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred. Please try again.')
    }
  }

  const handleDelete = async (productId: number): Promise<void> => {
    if (confirm('Delete this product?')) {
      try {
        const response = await fetch(`/api/products/${productId}`, { 
          method: 'DELETE',
          headers: { 'Authorization': 'Bearer 12345' }
        })
        if (response.ok) {
          setProducts(products.filter(p => p.id !== productId))
        } else {
          alert('Failed to delete product')
        }
      } catch (error) {
        console.error('Error:', error)
        alert('An error occurred. Please try again.')
      }
    }
  }

  if (!isAuthed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow max-w-md w-full">
          <h1 className="text-2xl font-bold mb-6">Admin Login</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full px-4 py-2 border rounded-lg mb-4"
            autoFocus
          />
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded font-semibold"
          >
            Login
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Admin Panel</h1>
          <button
            onClick={() => setIsAuthed(false)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div>
            {showForm ? (
              <>
                <div className="mb-4">
                  <button
                    onClick={() => {
                      setShowForm(false)
                      setEditingProduct(undefined)
                    }}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    ← Back to List
                  </button>
                </div>
                <ProductForm
                  product={editingProduct}
                  onSubmit={handleSubmit}
                />
              </>
            ) : (
              <button
                onClick={() => setShowForm(true)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded font-semibold mb-8"
              >
                + New Product
              </button>
            )}
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Products</h2>
            {loading ? (
              <div className="text-center py-8">Loading products...</div>
            ) : (
              <ProductList
                products={products}
                onEdit={(product) => {
                  setEditingProduct(product)
                  setShowForm(true)
                }}
                onDelete={handleDelete}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
