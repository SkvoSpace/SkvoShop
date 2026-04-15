import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext, useEffect, useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { AppContext } from '../types';
import { useApi } from '../hooks/useApi';
import { Award, Truck, MessageCircle } from 'lucide-react';
export const Home = ({ onAddToCart }) => {
    const context = useContext(AppContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);
    const heroTitle = context?.siteContent.heroTitle || 'Welcome to FashionBrand';
    const heroSubtitle = context?.siteContent.heroSubtitle || 'Discover the latest trends and express your unique style with our exclusive collection.';
    const heroButton = context?.siteContent.heroButton || 'Shop Now';
    const heroBackground = context?.siteContent.heroBackground || 'https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=1600&q=80';
    const carouselImages = (context?.siteContent.carouselImages || '').split(',').map(url => url.trim()).filter(Boolean);
    const featureRows = [
        context?.siteContent.feature1,
        context?.siteContent.feature2,
        context?.siteContent.feature3
    ].map(item => {
        const [title = '', text = '', icon = 'sparkles'] = item?.split('|').map(part => part.trim()) || [];
        return { title, text, icon };
    });
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
    useEffect(() => {
        if (carouselImages.length === 0)
            return;
        const interval = window.setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % carouselImages.length);
        }, 5000);
        return () => window.clearInterval(interval);
    }, [carouselImages.length]);
    const getFeatureIcon = (name) => {
        switch (name) {
            case 'truck':
                return _jsx(Truck, { size: 36, className: "mx-auto text-purple-400" });
            case 'award':
                return _jsx(Award, { size: 36, className: "mx-auto text-purple-400" });
            case 'message-circle':
                return _jsx(MessageCircle, { size: 36, className: "mx-auto text-purple-400" });
            default:
                return _jsx("div", { className: "mx-auto text-purple-400 text-4xl", children: "\u2728" });
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-b from-gray-900 to-gray-800", children: [_jsxs("div", { className: "relative overflow-hidden bg-cover bg-center", style: { backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.9)), url('${heroBackground}')` }, children: [_jsx("div", { className: "absolute inset-0 bg-black/40" }), _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 relative z-10", children: _jsxs("div", { className: "max-w-3xl text-white", children: [_jsx("p", { className: "text-sm uppercase tracking-[0.3em] text-purple-300 mb-4", children: "Brand Stories" }), _jsx("h1", { className: "text-5xl md:text-6xl font-bold leading-tight mb-6", children: heroTitle }), _jsx("p", { className: "text-lg md:text-xl text-gray-200 mb-8", children: heroSubtitle }), _jsx("button", { className: "bg-white text-purple-700 px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-100 transition", children: heroButton })] }) })] }), _jsx("section", { className: "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16", children: _jsxs("div", { className: "relative h-[420px] overflow-hidden rounded-3xl shadow-2xl", children: [carouselImages.length > 0 ? (carouselImages.map((image, index) => (_jsxs("div", { className: `absolute inset-0 transition-opacity duration-1000 ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`, children: [_jsx("img", { src: image, alt: `Slide ${index + 1}`, className: "w-full h-full object-cover" }), _jsx("div", { className: "absolute inset-0 bg-black/30" })] }, `${image}-${index}`)))) : (_jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-gray-700 text-white", children: "No carousel images configured" })), _jsx("div", { className: "absolute bottom-6 left-6 z-20 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur", children: carouselImages.length > 0 && `Slide ${currentSlide + 1} / ${carouselImages.length}` })] }) }), _jsxs("section", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20", children: [_jsx("h2", { className: "text-4xl font-bold text-white mb-10", children: "Featured Products" }), loading ? (_jsx("div", { className: "text-center text-gray-400 py-8", children: "Loading..." })) : products.length === 0 ? (_jsx("div", { className: "text-center text-gray-400 py-8", children: "No featured products yet" })) : (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: products.map(product => (_jsx(ProductCard, { product: product, onAddToCart: onAddToCart }, product.id))) }))] }), _jsx("section", { className: "bg-gray-900 py-20", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8", children: featureRows.map((feature, index) => (_jsxs("div", { className: "text-center bg-white/5 border border-white/10 rounded-3xl p-8", children: [getFeatureIcon(feature.icon), _jsx("h3", { className: "text-xl font-semibold text-white mt-6 mb-3", children: feature.title || 'Feature' }), _jsx("p", { className: "text-gray-400", children: feature.text || 'Create unique content in admin.' })] }, index))) }) }) })] }));
};
//# sourceMappingURL=Home.js.map