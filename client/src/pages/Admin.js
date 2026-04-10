import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { ProductForm } from '../components/Admin/ProductForm';
import { ProductList } from '../components/Admin/ProductList';
export const Admin = () => {
    const [password, setPassword] = useState('');
    const [isAuthed, setIsAuthed] = useState(false);
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState();
    const [showForm, setShowForm] = useState(false);
    const handleLogin = (e) => {
        e.preventDefault();
        if (password === '12345') {
            setIsAuthed(true);
            setPassword('');
        }
        else {
            alert('Invalid password!');
        }
    };
    const handleSubmit = async (data) => {
        try {
            if (editingProduct) {
                // Update
                const response = await fetch(`/api/products/${editingProduct.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
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
                // Create
                const response = await fetch('/api/products', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
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
                const response = await fetch(`/api/products/${productId}`, { method: 'DELETE' });
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
    if (!isAuthed) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-100", children: _jsxs("form", { onSubmit: handleLogin, className: "bg-white p-8 rounded-lg shadow max-w-md w-full", children: [_jsx("h1", { className: "text-2xl font-bold mb-6", children: "Admin Login" }), _jsx("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "Enter password", className: "w-full px-4 py-2 border rounded-lg mb-4", autoFocus: true }), _jsx("button", { type: "submit", className: "w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded font-semibold", children: "Login" })] }) }));
    }
    return (_jsx("div", { className: "min-h-screen bg-gray-100", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12", children: [_jsxs("div", { className: "flex justify-between items-center mb-8", children: [_jsx("h1", { className: "text-4xl font-bold", children: "Admin Panel" }), _jsx("button", { onClick: () => setIsAuthed(false), className: "bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded", children: "Logout" })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [_jsx("div", { children: showForm ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "mb-4", children: _jsx("button", { onClick: () => {
                                                setShowForm(false);
                                                setEditingProduct(undefined);
                                            }, className: "text-blue-500 hover:text-blue-700", children: "\u2190 Back to List" }) }), _jsx(ProductForm, { product: editingProduct, onSubmit: handleSubmit })] })) : (_jsx("button", { onClick: () => setShowForm(true), className: "w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded font-semibold mb-8", children: "+ New Product" })) }), _jsxs("div", { className: "lg:col-span-2", children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Products" }), _jsx(ProductList, { products: products, onEdit: (product) => {
                                        setEditingProduct(product);
                                        setShowForm(true);
                                    }, onDelete: handleDelete })] })] })] }) }));
};
//# sourceMappingURL=Admin.js.map