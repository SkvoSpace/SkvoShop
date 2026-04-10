import React from 'react';
import { Product } from '../../types';
interface ProductListProps {
    products: Product[];
    onEdit: (product: Product) => void;
    onDelete: (productId: number) => void;
}
export declare const ProductList: React.FC<ProductListProps>;
export {};
//# sourceMappingURL=ProductList.d.ts.map