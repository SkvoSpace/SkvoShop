import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext } from 'react';
import { AppContext } from '../../types';
export const Footer = () => {
    const context = useContext(AppContext);
    const about = context?.siteContent.footerAbout || 'FashionBrand - ваш источник стильной одежды и аксессуаров.';
    const footerLinks = (context?.siteContent.footerLinks || 'Terms,Privacy,Contact').split(',').map(link => link.trim());
    const socialLinks = (context?.siteContent.footerSocial || 'Instagram,Twitter,TikTok').split(',').map(link => link.trim());
    const brand = context?.siteContent.brand || 'FashionBrand';
    return (_jsx("footer", { className: "bg-gray-900 text-gray-300 py-8", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 mb-8", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-white font-bold mb-4", children: "About" }), _jsx("p", { className: "text-sm", children: about })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-white font-bold mb-4", children: "Links" }), _jsx("ul", { className: "space-y-2 text-sm", children: footerLinks.map(link => (_jsx("li", { children: _jsx("a", { href: "#", className: "hover:text-white", children: link }) }, link))) })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-white font-bold mb-4", children: "Follow" }), _jsx("ul", { className: "space-y-2 text-sm", children: socialLinks.map(link => (_jsx("li", { children: _jsx("a", { href: "#", className: "hover:text-white", children: link }) }, link))) })] })] }), _jsx("div", { className: "border-t border-gray-800 pt-8 text-center text-sm", children: _jsxs("p", { children: ["\u00A9 2026 ", brand, ". All rights reserved."] }) })] }) }));
};
//# sourceMappingURL=Footer.js.map