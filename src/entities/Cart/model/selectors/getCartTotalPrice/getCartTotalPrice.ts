import { getCartProducts } from 'entities/Cart/model/selectors/getCartProducts/getCartProducts';
import { createSelector } from '@reduxjs/toolkit';

export const getCartTotalPrice = createSelector(getCartProducts, (products) =>
    products.reduce(
        (acc, { quantity, price }) => acc + quantity * price.current,
        0,
    ),
);
