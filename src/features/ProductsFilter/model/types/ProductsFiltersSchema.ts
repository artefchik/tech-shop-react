import { SortOrder } from 'shared/const/types';

export enum ProductsSortField {
    PRICE = 'price',
}

export interface ProductsFiltersSchema {
    brand: string;
    model: string;
    sort: ProductsSortField;
    color: string;
    order: SortOrder;
}
