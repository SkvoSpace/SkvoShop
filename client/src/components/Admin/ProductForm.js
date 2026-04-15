import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from 'react';
import { Upload } from 'lucide-react';
export const ProductForm = ({ product, onSubmit }) => {
    const fileInputRef = useRef(null);
    const [formData, setFormData] = useState({
        name: product?.name || '',
        description: product?.description || '',
        price: product?.price || 0,
        image: product?.image || '',
        category: product?.category || 'misc',
        featured: product?.featured || false
    });
    const [imagePreview, setImagePreview] = useState(product?.image || '');
    const [uploadMode, setUploadMode] = useState('url');
    const [imageError, setImageError] = useState('');
    const [imageFileName, setImageFileName] = useState('');
    const handleImageFileUpload = (e) => {
        const file = e.target.files?.[0];
        if (!file)
            return;
        const maxSize = 2 * 1024 * 1024;
        if (file.size > maxSize) {
            setImageError('Image must be 2MB or smaller.');
            return;
        }
        setUploadMode('file');
        setImageError('');
        setImageFileName(file.name);
        const reader = new FileReader();
        reader.onload = (event) => {
            const result = event.target?.result;
            setFormData({ ...formData, image: result });
            setImagePreview(result);
        };
        reader.readAsDataURL(file);
    };
    const handleImageUrlChange = (e) => {
        const url = e.target.value;
        setFormData({ ...formData, image: url });
        setImagePreview(url);
        if (!url) {
            setImageError('');
            return;
        }
        try {
            new URL(url);
            setImageError('');
        }
        catch {
            setImageError('Please enter a valid image URL.');
        }
    };
    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (imageError) {
            alert(imageError);
            return;
        }
        onSubmit(formData);
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 bg-white p-6 rounded-lg shadow", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Product Name" }), _jsx("input", { type: "text", value: formData.name, onChange: (e) => setFormData({ ...formData, name: e.target.value }), required: true, className: "mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Description" }), _jsx("textarea", { value: formData.description, onChange: (e) => setFormData({ ...formData, description: e.target.value }), rows: 3, className: "mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500" })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Price (\u20BD)" }), _jsx("input", { type: "number", value: formData.price, onChange: (e) => setFormData({ ...formData, price: parseFloat(e.target.value) }), required: true, className: "mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700", children: "Category" }), _jsxs("select", { value: formData.category, onChange: (e) => setFormData({ ...formData, category: e.target.value }), className: "mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500", children: [_jsx("option", { children: "clothes" }), _jsx("option", { children: "accessories" }), _jsx("option", { children: "shoes" }), _jsx("option", { children: "misc" })] })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-3", children: "Product Image" }), imagePreview && (_jsx("div", { className: "mb-4", children: _jsx("img", { src: imagePreview, alt: "Preview", className: "w-full h-48 object-cover rounded-md border border-gray-300" }) })), _jsxs("div", { className: "flex gap-2 mb-4", children: [_jsx("button", { type: "button", onClick: () => {
                                    setUploadMode('url');
                                    setImageError('');
                                }, className: `px-4 py-2 rounded font-medium transition ${uploadMode === 'url'
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`, children: "Image URL" }), _jsx("button", { type: "button", onClick: () => {
                                    setUploadMode('file');
                                    setImageError('');
                                }, className: `px-4 py-2 rounded font-medium transition ${uploadMode === 'file'
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`, children: "Upload File" })] }), uploadMode === 'url' && (_jsx("input", { type: "url", value: formData.image, onChange: handleImageUrlChange, placeholder: "https://example.com/image.jpg", className: "mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500" })), uploadMode === 'file' && (_jsxs("div", { children: [_jsx("input", { ref: fileInputRef, type: "file", accept: "image/*", onChange: handleImageFileUpload, className: "hidden" }), _jsxs("button", { type: "button", onClick: triggerFileInput, className: "w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-purple-300 rounded-md hover:border-purple-500 hover:bg-purple-50 transition", children: [_jsx(Upload, { size: 20, className: "text-purple-600" }), _jsx("span", { className: "text-purple-600 font-medium", children: "Click to browse" })] }), imageFileName && (_jsxs("p", { className: "text-sm text-gray-700 mt-2", children: ["Selected file: ", imageFileName] })), _jsx("p", { className: "text-xs text-gray-500 mt-2", children: "Supported formats: JPG, PNG, WebP, GIF. Max 2MB." })] }))] }), imageError && (_jsx("div", { className: "rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-700", children: imageError })), _jsxs("div", { className: "flex items-center", children: [_jsx("input", { type: "checkbox", checked: formData.featured, onChange: (e) => setFormData({ ...formData, featured: e.target.checked }), className: "w-4 h-4 text-purple-600" }), _jsx("label", { className: "ml-2 text-sm font-medium text-gray-700", children: "Mark as Featured" })] }), _jsx("button", { type: "submit", className: "w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded font-semibold transition", children: product ? 'Update Product' : 'Create Product' })] }));
};
//# sourceMappingURL=ProductForm.js.map