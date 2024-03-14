import { createSelector } from '@reduxjs/toolkit';
import { getCartAllProducts } from '../getCartProducts/getCartProducts';

export const getCartProductsTotal = createSelector(getCartAllProducts, (products) =>
    products.reduce((accum, product) => accum + product.count, 0),
);
