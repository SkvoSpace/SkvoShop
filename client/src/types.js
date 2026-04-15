import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useState } from 'react';
export const AppContext = createContext(undefined);
export const AppProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem('cart');
        return saved ? JSON.parse(saved) : [];
    });
    const [products] = useState([]);
    const [siteContent] = useState({});
    const addToCart = (product, quantity) => {
        setCart(prev => {
            const existing = prev.find(item => item.product.id === product.id);
            let newCart;
            if (existing) {
                newCart = prev.map(item => item.product.id === product.id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item);
            }
            else {
                newCart = [...prev, { product, quantity }];
            }
            localStorage.setItem('cart', JSON.stringify(newCart));
            return newCart;
        });
    };
    const removeFromCart = (productId) => {
        setCart(prev => {
            const newCart = prev.filter(item => item.product.id !== productId);
            localStorage.setItem('cart', JSON.stringify(newCart));
            return newCart;
        });
    };
    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('cart');
    };
    return (_jsx(AppContext.Provider, { value: { products, cart, addToCart, removeFromCart, clearCart, siteContent }, children: children }));
};
//# sourceMappingURL=types.js.map