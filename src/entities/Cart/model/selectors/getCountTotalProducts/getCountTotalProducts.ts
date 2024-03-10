import { getCartProducts } from 'entities/Cart/model/selectors/getCartProducts/getCartProducts';
import { createSelector } from '@reduxjs/toolkit';

export const getCountTotalProducts = createSelector(getCartProducts, (products) =>
    products.reduce((acc, { count }) => acc + count, 0),
);
