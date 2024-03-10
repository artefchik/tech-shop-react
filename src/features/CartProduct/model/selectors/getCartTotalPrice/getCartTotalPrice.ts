import { createSelector } from '@reduxjs/toolkit';
import { getCartProductsItems } from '../getCartProducts/getCartProducts';

export const getCartTotalPrice = createSelector(getCartProductsItems, (products) =>
    products.reduce((acc, { count, price }) => acc + count * price.current, 0),
);
