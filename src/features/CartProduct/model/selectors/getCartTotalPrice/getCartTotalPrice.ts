import { createSelector } from '@reduxjs/toolkit';
import { getCartAllProducts } from '../getCartProducts/getCartProducts';

export const getCartTotalPrice = createSelector(getCartAllProducts, (products) =>
    products.reduce((acc, { count, price }) => acc + count * price.current, 0),
);
