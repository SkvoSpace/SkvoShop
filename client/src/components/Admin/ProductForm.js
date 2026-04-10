import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
export const ProductForm = ({ product, onSubmit }) => {
    const [formData, setFormData] = useState({
        name: product?.name || '',
        description: product?.description || '',
        price: product?.price || 0,
        image: product?.image || '',
        category: product?.category || 'misc',
        featured: product?.featured || false
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 bg-white p-6 rounded-lg shadow", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Product Name" }), _jsx("input", { type: "text", value: formData.name, onChange: (e) => setFormData({ ...formData, name: e.target.value }), required: true, className: "mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Description" }), _jsx("textarea", { value: formData.description, onChange: (e) => setFormData({ ...formData, description: e.target.value }), rows: 3, className: "mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500" })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Price (\u20BD)" }), _jsx("input", { type: "number", value: formData.price, onChange: (e) => setFormData({ ...formData, price: parseFloat(e.target.value) }), required: true, className: "mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Category" }), _jsxs("select", { value: formData.category, onChange: (e) => setFormData({ ...formData, category: e.target.value }), className: "mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500", children: [_jsx("option", { children: "clothes" }), _jsx("option", { children: "accessories" }), _jsx("option", { children: "shoes" }), _jsx("option", { children: "misc" })] })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Image URL" }), _jsx("input", { type: "url", value: formData.image, onChange: (e) => setFormData({ ...formData, image: e.target.value }), className: "mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500" })] }), _jsxs("div", { className: "flex items-center", children: [_jsx("input", { type: "checkbox", checked: formData.featured, onChange: (e) => setFormData({ ...formData, featured: e.target.checked }), className: "w-4 h-4 text-purple-600" }), _jsx("label", { className: "ml-2 text-sm font-medium text-gray-700", children: "Mark as Featured" })] }), _jsx("button", { type: "submit", className: "w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded font-semibold transition", children: product ? 'Update Product' : 'Create Product' })] }));
};
//# sourceMappingURL=ProductForm.js.map