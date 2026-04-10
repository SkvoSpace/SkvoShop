import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider, AppContext } from './types';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { Gallery } from './pages/Gallery';
import { Admin } from './pages/Admin';
import { CartDrawer } from './components/CartDrawer';
import './index.css';
const AppContent = () => {
    const context = useContext(AppContext);
    const [showCart, setShowCart] = useState(false);
    if (!context) {
        return _jsx("div", { children: "Loading..." });
    }
    const handleAddToCart = (product) => {
        context.addToCart(product, 1);
        alert('Added to cart!');
    };
    const handleCheckout = () => {
        alert('Thank you for your purchase! This is a demo checkout.');
        context.clearCart();
        setShowCart(false);
    };
    return (_jsxs("div", { className: "flex flex-col min-h-screen", children: [_jsx(Header, { cartCount: context.cart.length }), _jsx("main", { className: "flex-1", children: showCart ? (_jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12", children: [_jsx("button", { onClick: () => setShowCart(false), className: "mb-4 text-blue-500 hover:text-blue-700", children: "\u2190 Continue Shopping" }), _jsx(CartDrawer, { items: context.cart, onRemove: context.removeFromCart, onCheckout: handleCheckout })] })) : (_jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, { onAddToCart: handleAddToCart }) }), _jsx(Route, { path: "/shop", element: _jsx(Shop, { onAddToCart: handleAddToCart }) }), _jsx(Route, { path: "/gallery", element: _jsx(Gallery, { onAddToCart: handleAddToCart }) }), _jsx(Route, { path: "/admin", element: _jsx(Admin, {}) }), _jsx(Route, { path: "/cart", element: _jsx("div", { onClick: () => setShowCart(true), className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12", children: _jsx(CartDrawer, { items: context.cart, onRemove: context.removeFromCart, onCheckout: handleCheckout }) }) })] })) }), _jsx(Footer, {})] }));
};
export const App = () => {
    return (_jsx(Router, { children: _jsx(AppProvider, { children: _jsx(AppContent, {}) }) }));
};
//# sourceMappingURL=App.js.map