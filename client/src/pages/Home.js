import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { useApi } from '../hooks/useApi';
export const Home = ({ onAddToCart }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const featured = await useApi('/api/products?featured=true');
                setProducts(featured);
            }
            catch (error) {
                console.error('Failed to fetch featured products:', error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchFeatured();
    }, []);
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-b from-gray-900 to-gray-800", children: [_jsx("div", { className: "bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsx("h1", { className: "text-5xl md:text-6xl font-bold mb-6", children: "Welcome to FashionBrand" }), _jsx("p", { className: "text-xl md:text-2xl mb-8 max-w-2xl", children: "Discover the latest trends and express your unique style with our exclusive collection." }), _jsx("button", { className: "bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition", children: "Shop Now" })] }) }), _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20", children: [_jsx("h2", { className: "text-4xl font-bold text-white mb-12", children: "Featured Products" }), loading ? (_jsx("div", { className: "text-center text-gray-400 py-8", children: "Loading..." })) : products.length === 0 ? (_jsx("div", { className: "text-center text-gray-400 py-8", children: "No featured products yet" })) : (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: products.map(product => (_jsx(ProductCard, { product: product, onAddToCart: onAddToCart }, product.id))) }))] }), _jsx("div", { className: "bg-gray-800 text-white py-20", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-12", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-4xl mb-4", children: "\uD83D\uDE9A" }), _jsx("h3", { className: "text-xl font-bold mb-2", children: "Fast Delivery" }), _jsx("p", { className: "text-gray-400", children: "Get your items within 3-5 business days" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-4xl mb-4", children: "\uD83D\uDCAF" }), _jsx("h3", { className: "text-xl font-bold mb-2", children: "Quality Guaranteed" }), _jsx("p", { className: "text-gray-400", children: "Premium materials and careful craftsmanship" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-4xl mb-4", children: "\uD83D\uDCAC" }), _jsx("h3", { className: "text-xl font-bold mb-2", children: "24/7 Support" }), _jsx("p", { className: "text-gray-400", children: "We're here to help whenever you need us" })] })] }) }) })] }));
};
//# sourceMappingURL=Home.js.map