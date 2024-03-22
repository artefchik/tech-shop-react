import { Product } from './product';

export interface ProductDetailsSchema {
    isLoading: boolean;
    data?: Product;
    error?: string;
}
