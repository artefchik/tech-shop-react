import { ViewType } from 'shared/ui/ViewSelector/ViewSelector';
import { Product } from 'entities/Product';
import { EntityState } from '@reduxjs/toolkit';

export interface ProductsPageSchema extends EntityState<Product> {
    isLoading?: boolean;
    error?: string;
    view: ViewType;

    page: number;
    limit: number;
    hasMore: boolean;

    _initiated: boolean;
}
