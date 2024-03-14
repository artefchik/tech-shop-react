import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortOrder } from 'shared/const/types';
import { ProductsFiltersSchema, ProductsSortField } from '../types/ProductsFiltersSchema';

const initialState: ProductsFiltersSchema = {
    brand: '',
    model: '',
    sort: ProductsSortField.PRICE,
    color: '',
    order: SortOrder.ASC,
};

export const productsFiltersSlice = createSlice({
    name: 'productsFilters',
    initialState,
    reducers: {
        setSort: (state, action: PayloadAction<ProductsSortField>) => {
            state.sort = action.payload;
        },
        setBrand: (state, action: PayloadAction<string>) => {
            state.brand = action.payload;
        },
        setModel: (state, action: PayloadAction<string>) => {
            state.model = action.payload;
        },
        setOrder: (state, action: PayloadAction<SortOrder>) => {
            state.order = action.payload;
        },
        setColor: (state, action: PayloadAction<string>) => {
            state.color = action.payload;
        },
    },
    extraReducers: (builder) => {},
});

export const { actions: productsFiltersActions } = productsFiltersSlice;
export const { reducer: productsFiltersReducer } = productsFiltersSlice;
