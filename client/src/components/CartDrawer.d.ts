import React from 'react';
import { CartItem } from '../types';
interface CartDrawerProps {
    items: CartItem[];
    onRemove: (productId: number) => void;
    onCheckout: () => void;
}
export declare const CartDrawer: React.FC<CartDrawerProps>;
export {};
//# sourceMappingURL=CartDrawer.d.ts.map