import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext, useEffect, useState } from 'react';
import { ProductForm } from '../components/Admin/ProductForm';
import { ProductList } from '../components/Admin/ProductList';
import { AppContext } from '../types';
const featureFromString = (value = '') => {
    const [title = '', text = '', icon = 'sparkles'] = value.split('|').map(item => item.trim());
    return { title, text, icon };
};
const featureToString = (title, text, icon) => [title, text, icon].join('|');
export const Admin = () => {
    const context = useContext(AppContext);
    const [password, setPassword] = useState('');
    const [isAuthed, setIsAuthed] = useState(() => localStorage.getItem('adminSession') === 'true');
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState();
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [activeSection, setActiveSection] = useState('products');
    const [siteData, setSiteData] = useState(context?.siteContent || {});
    useEffect(() => {
        if (context) {
            setSiteData(context.siteContent);
        }
    }, [context?.siteContent]);
    useEffect(() => {
        if (isAuthed) {
            fetchProducts();
        }
    }, [isAuthed]);
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/products');
            if (response.ok) {
                const data = await response.json();
                setProducts(data.data || []);
            }
            else {
                alert('Failed to load products');
            }
        }
        catch (error) {
            console.error('Error loading products:', error);
            alert('Error loading products');
        }
        finally {
            setLoading(false);
        }
    };
    const handleLogin = (e) => {
        e.preventDefault();
        if (password === '12345') {
            setIsAuthed(true);
            setPassword('');
            localStorage.setItem('adminSession', 'true');
        }
        else {
            alert('Invalid password!');
        }
    };
    const handleSubmit = async (data) => {
        try {
            if (editingProduct) {
                const response = await fetch(`/api/products/${editingProduct.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer 12345'
                    },
                    body: JSON.stringify(data)
                });
                if (response.ok) {
                    setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...data } : p));
                    setEditingProduct(undefined);
                    setShowForm(false);
                }
                else {
                    alert('Failed to update product');
                }
            }
            else {
                const response = await fetch('/api/products', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer 12345'
                    },
                    body: JSON.stringify(data)
                });
                if (response.ok) {
                    const newProduct = await response.json();
                    setProducts([...products, newProduct]);
                    setShowForm(false);
                }
                else {
                    alert('Failed to create product');
                }
            }
        }
        catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };
    const handleDelete = async (productId) => {
        if (confirm('Delete this product?')) {
            try {
                const response = await fetch(`/api/products/${productId}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': 'Bearer 12345' }
                });
                if (response.ok) {
                    setProducts(products.filter(p => p.id !== productId));
                }
                else {
                    alert('Failed to delete product');
                }
            }
            catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            }
        }
    };
    const setSiteField = (field, value) => {
        setSiteData(prev => ({ ...prev, [field]: value }));
    };
    const appendCsvValue = (field, value) => {
        setSiteData(prev => {
            const items = (prev[field] || '').split(',').map(item => item.trim()).filter(Boolean);
            return {
                ...prev,
                [field]: [...items, value.trim()].filter(Boolean).join(',')
            };
        });
    };
    const removeCsvIndex = (field, index) => {
        setSiteData(prev => {
            const items = (prev[field] || '').split(',').map(item => item.trim()).filter(Boolean);
            items.splice(index, 1);
            return { ...prev, [field]: items.join(',') };
        });
    };
    const saveSiteSettings = () => {
        if (context) {
            context.updateSiteContent(siteData);
            alert('Site settings saved.');
        }
    };
    const renderSectionButtons = () => {
        const sections = {
            products: 'Products',
            pages: 'Pages',
            menu: 'Menu',
            footer: 'Footer',
            gallery: 'Gallery',
            carousel: 'Carousel'
        };
        return Object.entries(sections).map(([key, label]) => (_jsx("button", { type: "button", onClick: () => setActiveSection(key), className: `w-full text-left rounded-lg px-4 py-3 transition ${activeSection === key ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`, children: label }, key)));
    };
    const renderFeatureFields = (index) => {
        const current = featureFromString(siteData[`feature${index}`]);
        return (_jsxs("div", { className: "space-y-3 mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm", children: [_jsxs("h3", { className: "font-semibold", children: ["Feature ", index] }), _jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Title" }), _jsx("input", { type: "text", value: current.title, onChange: (e) => setSiteField(`feature${index}`, featureToString(e.target.value, current.text, current.icon)), className: "mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" }), _jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Description" }), _jsx("input", { type: "text", value: current.text, onChange: (e) => setSiteField(`feature${index}`, featureToString(current.title, e.target.value, current.icon)), className: "mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" }), _jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Icon" }), _jsxs("select", { value: current.icon, onChange: (e) => setSiteField(`feature${index}`, featureToString(current.title, current.text, e.target.value)), className: "mt-1 w-full px-3 py-2 border border-gray-300 rounded-md", children: [_jsx("option", { value: "truck", children: "truck" }), _jsx("option", { value: "award", children: "award" }), _jsx("option", { value: "message-circle", children: "message-circle" }), _jsx("option", { value: "sparkles", children: "sparkles" })] })] }));
    };
    if (!isAuthed) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-100", children: _jsxs("form", { onSubmit: handleLogin, className: "bg-white p-8 rounded-lg shadow max-w-md w-full", children: [_jsx("h1", { className: "text-2xl font-bold mb-6", children: "Admin Login" }), _jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "Enter password", className: "w-full px-4 py-2 border rounded-lg mb-4", autoFocus: true }), _jsx("button", { type: "submit", className: "w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded font-semibold", children: "Login" })] }) }));
    }
    return (_jsx("div", { className: "min-h-screen bg-gray-100", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12", children: [_jsxs("div", { className: "flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8", children: [_jsx("h1", { className: "text-4xl font-bold", children: "Admin Panel" }), _jsx("button", { onClick: () => {
                                setIsAuthed(false);
                                localStorage.removeItem('adminSession');
                            }, className: "bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded", children: "Logout" })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-4 gap-8", children: [_jsx("aside", { className: "space-y-3", children: renderSectionButtons() }), _jsxs("main", { className: "lg:col-span-3 space-y-8", children: [activeSection === 'products' && (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex justify-between items-center gap-4", children: [_jsx("h2", { className: "text-2xl font-bold", children: "Product Management" }), _jsx("button", { onClick: () => {
                                                        setShowForm(true);
                                                        setEditingProduct(undefined);
                                                    }, className: "bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded", children: "+ New Product" })] }), showForm ? (_jsxs("div", { className: "rounded-3xl border border-gray-200 bg-white p-6 shadow-sm", children: [_jsx("button", { type: "button", onClick: () => {
                                                        setShowForm(false);
                                                        setEditingProduct(undefined);
                                                    }, className: "text-blue-600 hover:text-blue-800 mb-6", children: "\u2190 Back to list" }), _jsx(ProductForm, { product: editingProduct, onSubmit: handleSubmit })] })) : (_jsx("div", { className: "rounded-3xl border border-gray-200 bg-white p-6 shadow-sm", children: loading ? (_jsx("div", { className: "text-center py-8", children: "Loading products..." })) : (_jsx(ProductList, { products: products, onEdit: (product) => {
                                                    setEditingProduct(product);
                                                    setShowForm(true);
                                                }, onDelete: handleDelete })) }))] })), activeSection !== 'products' && (_jsxs("div", { className: "rounded-3xl border border-gray-200 bg-white p-6 shadow-sm space-y-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [_jsxs("div", { children: [_jsxs("h2", { className: "text-2xl font-bold capitalize", children: [activeSection, " Settings"] }), _jsxs("p", { className: "text-sm text-gray-500", children: ["Edit the site content for ", activeSection, "."] })] }), _jsx("button", { type: "button", onClick: saveSiteSettings, className: "bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded", children: "Save Site Settings" })] }), activeSection === 'pages' && (_jsxs("div", { className: "space-y-5", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Brand Name" }), _jsx("input", { type: "text", value: siteData.brand || '', onChange: (e) => setSiteField('brand', e.target.value), className: "mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Hero Title" }), _jsx("input", { type: "text", value: siteData.heroTitle || '', onChange: (e) => setSiteField('heroTitle', e.target.value), className: "mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Hero Subtitle" }), _jsx("textarea", { value: siteData.heroSubtitle || '', onChange: (e) => setSiteField('heroSubtitle', e.target.value), rows: 3, className: "mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Hero Button Text" }), _jsx("input", { type: "text", value: siteData.heroButton || '', onChange: (e) => setSiteField('heroButton', e.target.value), className: "mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Hero Background URL" }), _jsx("input", { type: "url", value: siteData.heroBackground || '', onChange: (e) => setSiteField('heroBackground', e.target.value), className: "mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Upload Hero Background" }), _jsx("input", { type: "file", accept: "image/*", onChange: (e) => {
                                                                const file = e.target.files?.[0];
                                                                if (!file)
                                                                    return;
                                                                const reader = new FileReader();
                                                                reader.onload = (event) => {
                                                                    const result = event.target?.result;
                                                                    setSiteField('heroBackground', result);
                                                                };
                                                                reader.readAsDataURL(file);
                                                            }, className: "mt-1 w-full text-sm text-gray-700" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [renderFeatureFields(1), renderFeatureFields(2), renderFeatureFields(3)] })] })), activeSection === 'menu' && (_jsxs("div", { className: "space-y-5", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Home Label" }), _jsx("input", { type: "text", value: siteData.menuHome || '', onChange: (e) => setSiteField('menuHome', e.target.value), className: "mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Shop Label" }), _jsx("input", { type: "text", value: siteData.menuShop || '', onChange: (e) => setSiteField('menuShop', e.target.value), className: "mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Gallery Label" }), _jsx("input", { type: "text", value: siteData.menuGallery || '', onChange: (e) => setSiteField('menuGallery', e.target.value), className: "mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Admin Label" }), _jsx("input", { type: "text", value: siteData.menuAdmin || '', onChange: (e) => setSiteField('menuAdmin', e.target.value), className: "mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" })] })] })), activeSection === 'footer' && (_jsxs("div", { className: "space-y-5", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Footer About Text" }), _jsx("textarea", { value: siteData.footerAbout || '', onChange: (e) => setSiteField('footerAbout', e.target.value), rows: 3, className: "mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Footer Links (comma separated)" }), _jsx("input", { type: "text", value: siteData.footerLinks || '', onChange: (e) => setSiteField('footerLinks', e.target.value), className: "mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Social Links (comma separated)" }), _jsx("input", { type: "text", value: siteData.footerSocial || '', onChange: (e) => setSiteField('footerSocial', e.target.value), className: "mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" })] })] })), activeSection === 'gallery' && (_jsxs("div", { className: "space-y-5", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Gallery Image URLs (comma separated)" }), _jsx("textarea", { value: siteData.galleryImages || '', onChange: (e) => setSiteField('galleryImages', e.target.value), rows: 4, className: "mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Upload Gallery Photo" }), _jsx("input", { type: "file", accept: "image/*", onChange: (e) => {
                                                                const file = e.target.files?.[0];
                                                                if (!file)
                                                                    return;
                                                                const reader = new FileReader();
                                                                reader.onload = (event) => {
                                                                    const result = event.target?.result;
                                                                    appendCsvValue('galleryImages', result);
                                                                };
                                                                reader.readAsDataURL(file);
                                                            }, className: "mt-1 w-full text-sm text-gray-700" })] }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: (siteData.galleryImages || '').split(',').map((image) => image.trim()).filter(Boolean).map((image, index) => (_jsxs("div", { className: "overflow-hidden rounded-3xl border border-gray-200 bg-gray-50", children: [_jsx("img", { src: image, alt: `Gallery ${index + 1}`, className: "w-full h-40 object-cover" }), _jsx("button", { type: "button", onClick: () => removeCsvIndex('galleryImages', index), className: "w-full px-3 py-2 text-left text-sm text-red-600 hover:text-red-800", children: "Remove" })] }, `${image}-${index}`))) })] })), activeSection === 'carousel' && (_jsxs("div", { className: "space-y-5", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Carousel Image URLs (comma separated)" }), _jsx("textarea", { value: siteData.carouselImages || '', onChange: (e) => setSiteField('carouselImages', e.target.value), rows: 4, className: "mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Upload Carousel Slide" }), _jsx("input", { type: "file", accept: "image/*", onChange: (e) => {
                                                                const file = e.target.files?.[0];
                                                                if (!file)
                                                                    return;
                                                                const reader = new FileReader();
                                                                reader.onload = (event) => {
                                                                    const result = event.target?.result;
                                                                    appendCsvValue('carouselImages', result);
                                                                };
                                                                reader.readAsDataURL(file);
                                                            }, className: "mt-1 w-full text-sm text-gray-700" })] }), _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: (siteData.carouselImages || '').split(',').map((image) => image.trim()).filter(Boolean).map((image, index) => (_jsxs("div", { className: "overflow-hidden rounded-3xl border border-gray-200 bg-gray-50", children: [_jsx("img", { src: image, alt: `Carousel ${index + 1}`, className: "w-full h-40 object-cover" }), _jsx("button", { type: "button", onClick: () => removeCsvIndex('carouselImages', index), className: "w-full px-3 py-2 text-left text-sm text-red-600 hover:text-red-800", children: "Remove" })] }, `${image}-${index}`))) })] }))] }))] })] })] }) }));
};
//# sourceMappingURL=Admin.js.map