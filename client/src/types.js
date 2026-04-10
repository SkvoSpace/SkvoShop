import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useState } from 'react';
export const AppContext = createContext(undefined);
export const AppProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [products] = useState([]);
    const [siteContent] = useState({});
    const addToCart = (product, quantity) => {
        setCart(prev => {
            const existing = prev.find(item => item.product.id === product.id);
            if (existing) {
                return prev.map(item => item.product.id === product.id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item);
            }
            return [...prev, { product, quantity }];
        });
    };
    const removeFromCart = (productId) => {
        setCart(prev => prev.filter(item => item.product.id !== productId));
    };
    const clearCart = () => setCart([]);
    return (_jsx(AppContext.Provider, { value: { products, cart, addToCart, removeFromCart, clearCart, siteContent }, children: children }));
};
//# sourceMappingURL=types.js.map