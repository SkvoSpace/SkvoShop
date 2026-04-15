import React, { useContext, useEffect, useState } from 'react'
import { ProductForm } from '../components/Admin/ProductForm'
import { ProductList } from '../components/Admin/ProductList'
import { Product, AppContext } from '../types'
import { useApi } from '../hooks/useApi'

const API_URL = import.meta.env.VITE_API_URL || 'https://skvoshop.skvo-space.workers.dev'

type AdminSection = 'products' | 'pages' | 'menu' | 'footer' | 'gallery' | 'carousel'

const featureFromString = (value = '') => {
  const [title = '', text = '', icon = 'sparkles'] = value.split('|').map(item => item.trim())
  return { title, text, icon }
}

const featureToString = (title: string, text: string, icon: string) => [title, text, icon].join('|')

export const Admin: React.FC = () => {
  const context = useContext(AppContext)
  const [password, setPassword] = useState('')
  const [isAuthed, setIsAuthed] = useState(() => localStorage.getItem('adminSession') === 'true')
  const [products, setProducts] = useState<Product[]>([])
  const [editingProduct, setEditingProduct] = useState<Product | undefined>()
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [activeSection, setActiveSection] = useState<AdminSection>('products')
  const [siteData, setSiteData] = useState<Record<string, string>>(context?.siteContent || {})

  useEffect(() => {
    if (context) {
      setSiteData(context.siteContent)
    }
  }, [context?.siteContent])

  useEffect(() => {
    if (isAuthed) {
      fetchProducts()
    }
  }, [isAuthed])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const data = await useApi<Product[]>('/api/products')
      setProducts(data || [])
    } catch (error) {
      console.error('Error loading products:', error)
      alert('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === '12345') {
      setIsAuthed(true)
      setPassword('')
      localStorage.setItem('adminSession', 'true')
    } else {
      alert('Invalid password!')
    }
  }

  const handleSubmit = async (data: Partial<Product>): Promise<void> => {
    try {
      if (editingProduct) {
        const response = await fetch(`${API_URL}/api/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 12345'
          },
          body: JSON.stringify(data)
        })
        if (response.ok) {
          const result = await response.json() as { data: Product }
          setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...result.data } : p))
          setEditingProduct(undefined)
          setShowForm(false)
        } else {
          alert('Failed to update product')
        }
      } else {
        const response = await fetch(`${API_URL}/api/products`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 12345'
          },
          body: JSON.stringify(data)
        })
        if (response.ok) {
          const result = await response.json() as { data: Product }
          setProducts([...products, result.data])
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
        const response = await fetch(`${API_URL}/api/products/${productId}`, {
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

  const setSiteField = (field: string, value: string) => {
    setSiteData(prev => ({ ...prev, [field]: value }))
  }

  const appendCsvValue = (field: string, value: string) => {
    setSiteData(prev => {
      const items = (prev[field] || '').split(',').map(item => item.trim()).filter(Boolean)
      return {
        ...prev,
        [field]: [...items, value.trim()].filter(Boolean).join(',')
      }
    })
  }

  const removeCsvIndex = (field: string, index: number) => {
    setSiteData(prev => {
      const items = (prev[field] || '').split(',').map(item => item.trim()).filter(Boolean)
      items.splice(index, 1)
      return { ...prev, [field]: items.join(',') }
    })
  }

  const saveSiteSettings = () => {
    if (context) {
      context.updateSiteContent(siteData)
      alert('Site settings saved.')
    }
  }

  const renderSectionButtons = () => {
    const sections: Record<AdminSection, string> = {
      products: 'Products',
      pages: 'Pages',
      menu: 'Menu',
      footer: 'Footer',
      gallery: 'Gallery',
      carousel: 'Carousel'
    }
    return Object.entries(sections).map(([key, label]) => (
      <button
        key={key}
        type="button"
        onClick={() => setActiveSection(key as AdminSection)}
        className={`w-full text-left rounded-lg px-4 py-3 transition ${activeSection === key ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
      >
        {label}
      </button>
    ))
  }

  const renderFeatureFields = (index: number) => {
    const current = featureFromString(siteData[`feature${index}`])
    return (
      <div className="space-y-3 mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <h3 className="font-semibold">Feature {index}</h3>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={current.title}
          onChange={(e) => setSiteField(`feature${index}`, featureToString(e.target.value, current.text, current.icon))}
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <input
          type="text"
          value={current.text}
          onChange={(e) => setSiteField(`feature${index}`, featureToString(current.title, e.target.value, current.icon))}
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        <label className="block text-sm font-medium text-gray-700">Icon</label>
        <select
          value={current.icon}
          onChange={(e) => setSiteField(`feature${index}`, featureToString(current.title, current.text, e.target.value))}
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="truck">truck</option>
          <option value="award">award</option>
          <option value="message-circle">message-circle</option>
          <option value="sparkles">sparkles</option>
        </select>
      </div>
    )
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
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
          <h1 className="text-4xl font-bold">Admin Panel</h1>
          <button
            onClick={() => {
              setIsAuthed(false)
              localStorage.removeItem('adminSession')
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="space-y-3">
            {renderSectionButtons()}
          </aside>

          <main className="lg:col-span-3 space-y-8">
            {activeSection === 'products' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center gap-4">
                  <h2 className="text-2xl font-bold">Product Management</h2>
                  <button
                    onClick={() => {
                      setShowForm(true)
                      setEditingProduct(undefined)
                    }}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
                  >
                    + New Product
                  </button>
                </div>
                {showForm ? (
                  <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false)
                        setEditingProduct(undefined)
                      }}
                      className="text-blue-600 hover:text-blue-800 mb-6"
                    >
                      ← Back to list
                    </button>
                    <ProductForm product={editingProduct} onSubmit={handleSubmit} />
                  </div>
                ) : (
                  <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
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
                )}
              </div>
            )}

            {activeSection !== 'products' && (
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold capitalize">{activeSection} Settings</h2>
                    <p className="text-sm text-gray-500">Edit the site content for {activeSection}.</p>
                  </div>
                  <button
                    type="button"
                    onClick={saveSiteSettings}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                  >
                    Save Site Settings
                  </button>
                </div>

                {activeSection === 'pages' && (
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Brand Name</label>
                      <input
                        type="text"
                        value={siteData.brand || ''}
                        onChange={(e) => setSiteField('brand', e.target.value)}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Hero Title</label>
                      <input
                        type="text"
                        value={siteData.heroTitle || ''}
                        onChange={(e) => setSiteField('heroTitle', e.target.value)}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Hero Subtitle</label>
                      <textarea
                        value={siteData.heroSubtitle || ''}
                        onChange={(e) => setSiteField('heroSubtitle', e.target.value)}
                        rows={3}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Hero Button Text</label>
                        <input
                          type="text"
                          value={siteData.heroButton || ''}
                          onChange={(e) => setSiteField('heroButton', e.target.value)}
                          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Hero Background URL</label>
                        <input
                          type="url"
                          value={siteData.heroBackground || ''}
                          onChange={(e) => setSiteField('heroBackground', e.target.value)}
                          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Upload Hero Background</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (!file) return
                          const reader = new FileReader()
                          reader.onload = (event) => {
                            const result = event.target?.result as string
                            setSiteField('heroBackground', result)
                          }
                          reader.readAsDataURL(file)
                        }}
                        className="mt-1 w-full text-sm text-gray-700"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {renderFeatureFields(1)}
                      {renderFeatureFields(2)}
                      {renderFeatureFields(3)}
                    </div>
                  </div>
                )}

                {activeSection === 'menu' && (
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Home Label</label>
                      <input
                        type="text"
                        value={siteData.menuHome || ''}
                        onChange={(e) => setSiteField('menuHome', e.target.value)}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Shop Label</label>
                      <input
                        type="text"
                        value={siteData.menuShop || ''}
                        onChange={(e) => setSiteField('menuShop', e.target.value)}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Gallery Label</label>
                      <input
                        type="text"
                        value={siteData.menuGallery || ''}
                        onChange={(e) => setSiteField('menuGallery', e.target.value)}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Admin Label</label>
                      <input
                        type="text"
                        value={siteData.menuAdmin || ''}
                        onChange={(e) => setSiteField('menuAdmin', e.target.value)}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                )}

                {activeSection === 'footer' && (
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Footer About Text</label>
                      <textarea
                        value={siteData.footerAbout || ''}
                        onChange={(e) => setSiteField('footerAbout', e.target.value)}
                        rows={3}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Footer Links (comma separated)</label>
                      <input
                        type="text"
                        value={siteData.footerLinks || ''}
                        onChange={(e) => setSiteField('footerLinks', e.target.value)}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Social Links (comma separated)</label>
                      <input
                        type="text"
                        value={siteData.footerSocial || ''}
                        onChange={(e) => setSiteField('footerSocial', e.target.value)}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                )}

                {activeSection === 'gallery' && (
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Gallery Image URLs (comma separated)</label>
                      <textarea
                        value={siteData.galleryImages || ''}
                        onChange={(e) => setSiteField('galleryImages', e.target.value)}
                        rows={4}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Upload Gallery Photo</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (!file) return
                          const reader = new FileReader()
                          reader.onload = (event) => {
                            const result = event.target?.result as string
                            appendCsvValue('galleryImages', result)
                          }
                          reader.readAsDataURL(file)
                        }}
                        className="mt-1 w-full text-sm text-gray-700"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {(siteData.galleryImages || '').split(',').map((image) => image.trim()).filter(Boolean).map((image, index) => (
                        <div key={`${image}-${index}`} className="overflow-hidden rounded-3xl border border-gray-200 bg-gray-50">
                          <img src={image} alt={`Gallery ${index + 1}`} className="w-full h-40 object-cover" />
                          <button
                            type="button"
                            onClick={() => removeCsvIndex('galleryImages', index)}
                            className="w-full px-3 py-2 text-left text-sm text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeSection === 'carousel' && (
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Carousel Image URLs (comma separated)</label>
                      <textarea
                        value={siteData.carouselImages || ''}
                        onChange={(e) => setSiteField('carouselImages', e.target.value)}
                        rows={4}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Upload Carousel Slide</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (!file) return
                          const reader = new FileReader()
                          reader.onload = (event) => {
                            const result = event.target?.result as string
                            appendCsvValue('carouselImages', result)
                          }
                          reader.readAsDataURL(file)
                        }}
                        className="mt-1 w-full text-sm text-gray-700"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {(siteData.carouselImages || '').split(',').map((image) => image.trim()).filter(Boolean).map((image, index) => (
                        <div key={`${image}-${index}`} className="overflow-hidden rounded-3xl border border-gray-200 bg-gray-50">
                          <img src={image} alt={`Carousel ${index + 1}`} className="w-full h-40 object-cover" />
                          <button
                            type="button"
                            onClick={() => removeCsvIndex('carouselImages', index)}
                            className="w-full px-3 py-2 text-left text-sm text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
