import phone from 'shared/assets/phone.png';
import pc from 'shared/assets/macbook-pro-14-m3.png';
import accessories from 'shared/assets/keyboard.png';
import { getRoutePathProductsCategories } from 'shared/const/router';
import { ProductsCategories } from 'shared/const/types';
import allProducts from 'shared/assets/all.png';

export interface ProductsCategoriesItem {
    image: string;
    title?: string;
    link: string;
}

export const productsCategoriesList: ProductsCategoriesItem[] = [
    {
        image: allProducts,
        title: 'All Products',
        link: ProductsCategories.ALL,
    },
    {
        image: phone,
        title: 'Phone',
        link: ProductsCategories.PHONE,
    },
    {
        image: pc,
        title: 'Pc',
        link: ProductsCategories.PC,
    },
    {
        image: accessories,
        title: 'Accessories',
        link: ProductsCategories.ACCESSORIES,
    },
];
