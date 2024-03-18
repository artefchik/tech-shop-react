import { Product } from 'entities/Product';
import { EntityState } from '@reduxjs/toolkit';
import { ProductsCategories, ViewType } from 'shared/const/types';

export interface ProductsPageSchema extends EntityState<Product> {
    isLoading?: boolean;
    error?: string;
    view: ViewType;

    page: number;
    limit: number;
    hasMore: boolean;
    category?: ProductsCategories;

    _initiated: boolean;
}
