import React, { useState, useRef } from 'react'
import { Upload } from 'lucide-react'
import { Product } from '../../types'

interface ProductFormProps {
  product?: Product
  onSubmit: (data: Partial<Product>) => void
}

export const ProductForm: React.FC<ProductFormProps> = ({
  product,
  onSubmit
}): JSX.Element => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || 0,
    image: product?.image || '',
    category: product?.category || 'misc',
    featured: product?.featured || false
  })
  const [imagePreview, setImagePreview] = useState<string>(product?.image || '')
  const [uploadMode, setUploadMode] = useState<'url' | 'file'>('url')

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const result = event.target?.result as string
      setFormData({ ...formData, image: result })
      setImagePreview(result)
    }
    reader.readAsDataURL(file)
  }

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const url = e.target.value
    setFormData({ ...formData, image: url })
    setImagePreview(url)
  }

  const triggerFileInput = (): void => {
    fileInputRef.current?.click()
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
      <div>
        <label className="block text-sm font-medium text-gray-700">Product Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormData({ ...formData, name: e.target.value })
          }
          required
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={formData.description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setFormData({ ...formData, description: e.target.value })
          }
          rows={3}
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Price (₽)</label>
          <input
            type="number"
            value={formData.price}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData({ ...formData, price: parseFloat(e.target.value) })
            }
            required
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            value={formData.category}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500"
          >
            <option>clothes</option>
            <option>accessories</option>
            <option>shoes</option>
            <option>misc</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Product Image</label>
        
        {/* Image Preview */}
        {imagePreview && (
          <div className="mb-4">
            <img 
              src={imagePreview} 
              alt="Preview" 
              className="w-full h-48 object-cover rounded-md border border-gray-300"
            />
          </div>
        )}

        {/* Upload Mode Toggle */}
        <div className="flex gap-2 mb-4">
          <button
            type="button"
            onClick={() => setUploadMode('url')}
            className={`px-4 py-2 rounded font-medium transition ${
              uploadMode === 'url'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Image URL
          </button>
          <button
            type="button"
            onClick={() => setUploadMode('file')}
            className={`px-4 py-2 rounded font-medium transition ${
              uploadMode === 'file'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Upload File
          </button>
        </div>

        {/* URL Input Mode */}
        {uploadMode === 'url' && (
          <input
            type="url"
            value={formData.image}
            onChange={handleImageUrlChange}
            placeholder="https://example.com/image.jpg"
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500"
          />
        )}

        {/* File Upload Mode */}
        {uploadMode === 'file' && (
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageFileUpload}
              className="hidden"
            />
            <button
              type="button"
              onClick={triggerFileInput}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-purple-300 rounded-md hover:border-purple-500 hover:bg-purple-50 transition"
            >
              <Upload size={20} className="text-purple-600" />
              <span className="text-purple-600 font-medium">Click to browse or drag & drop</span>
            </button>
            <p className="text-xs text-gray-500 mt-2">Supported formats: JPG, PNG, WebP, GIF</p>
          </div>
        )}
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          checked={formData.featured}
          onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
          className="w-4 h-4 text-purple-600"
        />
        <label className="ml-2 text-sm font-medium text-gray-700">Mark as Featured</label>
      </div>

      <button
        type="submit"
        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded font-semibold transition"
      >
        {product ? 'Update Product' : 'Create Product'}
      </button>
    </form>
  )
}
