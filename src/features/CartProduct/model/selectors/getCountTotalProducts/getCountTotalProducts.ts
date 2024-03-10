import { createSelector } from '@reduxjs/toolkit';
import { getCartProductsItems } from '../getCartProducts/getCartProducts';

export const getCountTotalProducts = createSelector(getCartProductsItems, (products) =>
    products.reduce((acc, { count }) => acc + count, 0),
);
