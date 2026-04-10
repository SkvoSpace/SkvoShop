import React, { ReactNode } from 'react';
export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    featured: boolean;
}
export interface SiteContent {
    id: number;
    key: string;
    value: string;
}
export interface CartItem {
    product: Product;
    quantity: number;
}
interface AppContextType {
    products: Product[];
    cart: CartItem[];
    addToCart: (product: Product, quantity: number) => void;
    removeFromCart: (productId: number) => void;
    clearCart: () => void;
    siteContent: Record<string, string>;
}
export declare const AppContext: React.Context<AppContextType | undefined>;
export declare const AppProvider: React.FC<{
    children: ReactNode;
}>;
export {};
//# sourceMappingURL=types.d.ts.map