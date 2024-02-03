import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from 'shared/const/localStorage';
import { ViewType } from 'shared/ui/ViewSelector/ViewSelector';
import { Product } from 'entities/Product';
import { ProductsPageSchema } from 'pages/ProductsPage/model/types/productsPageSchema';
import { LoginSchema } from 'features/AuthByUsername';
import { fetchProductsList } from 'pages/ProductsPage/model/services/fetchProductsList/fetchProductsList';

const initialState: ProductsPageSchema = {
    data: [],
    isLoading: false,
    error: undefined,
    view: ViewType.SMALL,
    page: 1,
    limit: 3,
    hasMore: true,
    _inited: false,
};

const productsPageSlice = createSlice({
    name: 'productsPage',
    initialState,
    reducers: {
        setView: (state, action: PayloadAction<ViewType>) => {
            state.view = action.payload;
            localStorage.setItem(
                ARTICLES_VIEW_LOCALSTORAGE_KEY,
                action.payload,
            );
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        initState: (state) => {
            const view = localStorage.getItem(
                ARTICLES_VIEW_LOCALSTORAGE_KEY,
            ) as ViewType;
            state.view = view;
            state.limit = view === ViewType.SMALL ? 9 : 3;
            state._inited = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsList.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
                // if (action.meta.arg.replace) {
                //     productAdapter.removeAll(state);
                // }
            })
            .addCase(fetchProductsList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasMore = action.payload.length > 0;
                state.data = action.payload;
                // if (action.meta.arg.replace) {
                //     productAdapter.setAll(state, action.payload);
                // } else {
                //     productAdapter.addMany(state, action.payload);
                // }
            })
            .addCase(fetchProductsList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: productsPageActions } = productsPageSlice;
export const { reducer: productsPageReducer } = productsPageSlice;
