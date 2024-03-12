import { createSelector } from '@reduxjs/toolkit';
import { getCartAllProducts } from 'features/CartProduct';

export const getCartProductsTotal = createSelector(getCartAllProducts, (cartProducts) =>
    cartProducts.reduce((accum, item) => accum + item.count, 0),
);
