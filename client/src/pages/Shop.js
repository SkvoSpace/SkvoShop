import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { useApi } from '../hooks/useApi';
export const Shop = ({ onAddToCart }) => {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const url = selectedCategory === 'all'
                    ? '/api/products'
                    : `/api/products?category=${selectedCategory}`;
                const data = await useApi(url);
                setProducts(data);
            }
            catch (error) {
                console.error('Failed to fetch products:', error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [selectedCategory]);
    const categories = [
        { id: 'all', label: 'All' },
        { id: 'clothes', label: 'Clothes' },
        { id: 'accessories', label: 'Accessories' },
        { id: 'shoes', label: 'Shoes' }
    ];
    return (_jsx("div", { className: "min-h-screen bg-gray-100", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12", children: [_jsx("h1", { className: "text-4xl font-bold mb-8", children: "Shop" }), _jsx("div", { className: "flex space-x-4 mb-8 overflow-x-auto pb-2", children: categories.map(cat => (_jsx("button", { onClick: () => setSelectedCategory(cat.id), className: `px-6 py-2 rounded whitespace-nowrap transition ${selectedCategory === cat.id
                            ? 'bg-purple-600 text-white'
                            : 'bg-white text-gray-900 hover:bg-gray-200'}`, children: cat.label }, cat.id))) }), loading ? (_jsx("div", { className: "text-center py-12", children: "Loading..." })) : products.length === 0 ? (_jsx("div", { className: "text-center py-12", children: "No products found" })) : (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: products.map(product => (_jsx(ProductCard, { product: product, onAddToCart: onAddToCart }, product.id))) }))] }) }));
};
//# sourceMappingURL=Shop.js.map