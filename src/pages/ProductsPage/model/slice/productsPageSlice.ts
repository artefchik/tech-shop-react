import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import {
    ARTICLES_VIEW_LOCALSTORAGE_KEY,
    PRODUCTS_VIEW_LOCALSTORAGE_KEY,
} from 'shared/const/localStorage';
import { Product } from 'entities/Product';
import { ProductsPageSchema } from 'pages/ProductsPage/model/types/productsPageSchema';
import { fetchProductsList } from 'pages/ProductsPage/model/services/fetchProductsList/fetchProductsList';
import { ProductsCategories, ViewType } from 'shared/const/types';

const productsAdapter = createEntityAdapter<Product>({
    selectId: (product: Product) => product.id,
});

export const getProducts = productsAdapter.getSelectors<StateSchema>(
    (state) => state.productsPage || productsAdapter.getInitialState(),
);

const productsPageSlice = createSlice({
    name: 'productsPage',
    initialState: productsAdapter.getInitialState<ProductsPageSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
        view: ViewType.SMALL,
        category: ProductsCategories.ALL,
        page: 1,
        limit: 7,
        hasMore: true,
        _initiated: false,
    }),
    reducers: {
        setView: (state, action: PayloadAction<ViewType>) => {
            state.view = action.payload;
            localStorage.setItem(
                PRODUCTS_VIEW_LOCALSTORAGE_KEY,
                action.payload,
            );
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setCategory: (state, action: PayloadAction<ProductsCategories>) => {
            state.category = action.payload;
        },

        initState: (state) => {
            const view = localStorage.getItem(
                PRODUCTS_VIEW_LOCALSTORAGE_KEY,
            ) as ViewType;
            state.view = view;
            state.limit = view === ViewType.SMALL ? 7 : 5;
            state._initiated = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsList.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
                if (action.meta.arg.replace) {
                    productsAdapter.removeAll(state);
                }
            })
            .addCase(fetchProductsList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasMore = action.payload.length >= state.limit;
                if (action.meta.arg.replace) {
                    productsAdapter.setAll(state, action.payload);
                } else {
                    productsAdapter.addMany(state, action.payload);
                }
            })
            .addCase(fetchProductsList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: productsPageActions } = productsPageSlice;
export const { reducer: productsPageReducer } = productsPageSlice;
