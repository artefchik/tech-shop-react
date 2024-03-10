import { Product } from 'entities/Product';

export interface CartItemType extends Product {
    count: number;
}
