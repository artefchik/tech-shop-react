import { ViewType } from 'shared/ui/ViewSelector/ViewSelector';
import { Product } from 'entities/Product';

export interface ProductsPageSchema {
    data: Product[];
    isLoading?: boolean;
    error?: string;
    view: ViewType;

    page: number;
    limit?: number;
    hasMore: boolean;

    _inited: boolean;
}
