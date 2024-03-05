import { ProductsCategories } from 'shared/const/types';

export const ProductsCategoriesMap: Record<ProductsCategories, string> = {
    [ProductsCategories.ALL]: 'All Products',
    [ProductsCategories.PHONE]: 'Phone',
    [ProductsCategories.PC]: 'PC',
    [ProductsCategories.ACCESSORIES]: 'Accessories',
};
