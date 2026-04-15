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
    updateSiteContent: (content: Record<string, string>) => void;
}
export declare const AppContext: React.Context<AppContextType | undefined>;
export declare const AppProvider: React.FC<{
    children: ReactNode;
}>;
export {};
//# sourceMappingURL=types.d.ts.map