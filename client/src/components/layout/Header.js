import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { AppContext } from '../../types';
export const Header = ({ cartCount }) => {
    const [isOpen, setIsOpen] = useState(false);
    const context = useContext(AppContext);
    const brand = context?.siteContent.brand || 'FashionBrand';
    const homeLabel = context?.siteContent.menuHome || 'Home';
    const shopLabel = context?.siteContent.menuShop || 'Shop';
    const galleryLabel = context?.siteContent.menuGallery || 'Gallery';
    const adminLabel = context?.siteContent.menuAdmin || 'Admin';
    return (_jsx("header", { className: "bg-black text-white sticky top-0 z-50 shadow-lg", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "flex justify-between items-center h-16", children: [_jsxs(Link, { to: "/", className: "flex items-center space-x-2 text-2xl font-bold", children: [_jsx("div", { className: "w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded" }), _jsx("span", { children: brand })] }), _jsxs("nav", { className: "hidden md:flex space-x-8", children: [_jsx(Link, { to: "/", className: "hover:text-purple-400 transition", children: homeLabel }), _jsx(Link, { to: "/shop", className: "hover:text-purple-400 transition", children: shopLabel }), _jsx(Link, { to: "/gallery", className: "hover:text-purple-400 transition", children: galleryLabel }), _jsx(Link, { to: "/admin", className: "hover:text-purple-400 transition", children: adminLabel })] }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs(Link, { to: "/cart", className: "relative hover:text-purple-400 transition", children: [_jsx(ShoppingCart, { size: 24 }), cartCount > 0 && (_jsx("span", { className: "absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center", children: cartCount }))] }), _jsx("button", { className: "md:hidden", onClick: () => setIsOpen(!isOpen), children: isOpen ? _jsx(X, { size: 24 }) : _jsx(Menu, { size: 24 }) })] })] }), isOpen && (_jsxs("nav", { className: "md:hidden pb-4 space-y-2", children: [_jsx(Link, { to: "/", className: "block py-2 hover:text-purple-400 transition", onClick: () => setIsOpen(false), children: homeLabel }), _jsx(Link, { to: "/shop", className: "block py-2 hover:text-purple-400 transition", onClick: () => setIsOpen(false), children: shopLabel }), _jsx(Link, { to: "/gallery", className: "block py-2 hover:text-purple-400 transition", onClick: () => setIsOpen(false), children: galleryLabel }), _jsx(Link, { to: "/admin", className: "block py-2 hover:text-purple-400 transition", onClick: () => setIsOpen(false), children: adminLabel })] }))] }) }));
};
//# sourceMappingURL=Header.js.map