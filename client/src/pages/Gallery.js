import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../types';
import { useApi } from '../hooks/useApi';
export const Gallery = ({ onAddToCart }) => {
    const context = useContext(AppContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const galleryImages = (context?.siteContent.galleryImages || '').split(',').map(url => url.trim()).filter(Boolean);
    useEffect(() => {
        const fetchAll = async () => {
            try {
                const data = await useApi('/api/products');
                setProducts(data);
            }
            catch (error) {
                console.error('Failed to fetch products:', error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchAll();
    }, []);
    return (_jsx("div", { className: "min-h-screen bg-gray-100", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12", children: [_jsx("h1", { className: "text-4xl font-bold mb-12", children: "Gallery" }), galleryImages.length > 0 && (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12", children: galleryImages.map((image, index) => (_jsx("div", { className: "overflow-hidden rounded-3xl shadow-lg bg-white", children: _jsx("img", { src: image, alt: `Gallery ${index + 1}`, className: "w-full h-64 object-cover transition-transform duration-300 hover:scale-105" }) }, `${image}-${index}`))) })), loading ? (_jsx("div", { className: "text-center py-12", children: "Loading..." })) : products.length === 0 ? (_jsx("div", { className: "text-center py-12", children: "No products yet" })) : (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: products.map(product => (_jsxs("div", { className: "bg-white rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition group", onClick: () => onAddToCart(product), children: [_jsx("div", { className: "w-full h-48 bg-gray-200 overflow-hidden", children: _jsx("img", { src: product.image || 'https://via.placeholder.com/300x300?text=Fashion', alt: product.name, className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" }) }), _jsxs("div", { className: "p-4 text-center", children: [_jsx("h3", { className: "font-semibold text-sm line-clamp-1", children: product.name }), _jsxs("p", { className: "text-purple-600 font-bold text-sm", children: ["\u20BD", product.price] })] })] }, product.id))) }))] }) }));
};
//# sourceMappingURL=Gallery.js.map