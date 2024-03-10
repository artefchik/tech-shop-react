import { getCartProducts } from 'entities/Cart/model/selectors/getCartProducts/getCartProducts';
import { createSelector } from '@reduxjs/toolkit';

export const getCartTotalPrice = createSelector(getCartProducts, (products) =>
    products.reduce((acc, { count, price }) => acc + count * price.current, 0),
);
