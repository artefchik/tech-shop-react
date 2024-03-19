import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import {
    FavoriteProduct,
    ProductFavoritesSchema,
} from 'features/ProductFavoriteButton/model/types/favorite';
import { StateSchema } from 'app/providers/StoreProvider';
import { Product } from 'entities/Product';
import { fetchProductsFavorites } from '../services/fetchProductsFavorites/fetchProductsFavorites';
import { fetchFavorites } from '../services/fetchFavorites/fetchFavorites';

const initialState: ProductFavoritesSchema = {
    isLoading: false,
    ids: [],
    entities: {},
};

const productFavoritesAdapter = createEntityAdapter<FavoriteProduct>({
    selectId: (favorite: FavoriteProduct) => favorite.productId,
});

export const getProductFavorites =
    productFavoritesAdapter.getSelectors<StateSchema>(
        (state) =>
            state.productFavorites || productFavoritesAdapter.getInitialState(),
    );

export const productFavoritesSlice = createSlice({
    name: 'productFavorites',
    initialState,
    reducers: {
        onToggleFavorite: (state, action: PayloadAction<FavoriteProduct>) => {
            const favorite = productFavoritesAdapter.selectId(action.payload);
            if (favorite) {
                productFavoritesAdapter.removeOne(state, favorite);
            } else {
                productFavoritesAdapter.setOne(state, action.payload);
            }
        },
        updateData: (state, action: PayloadAction<FavoriteProduct[]>) => {
            productFavoritesAdapter.setAll(state, action.payload);
        },
        clearFavorites: (state) => {
            productFavoritesAdapter.removeAll(state);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsFavorites.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchProductsFavorites.fulfilled,
                (state, action: PayloadAction<FavoriteProduct[]>) => {
                    state.isLoading = false;
                    productFavoritesAdapter.setAll(state, action.payload);
                },
            )
            .addCase(fetchProductsFavorites.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(fetchFavorites.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchFavorites.fulfilled,
                (state, action: PayloadAction<Product[]>) => {
                    state.isLoading = false;
                    state.favoritesItems = action.payload;
                },
            )
            .addCase(fetchFavorites.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: productFavoritesActions } = productFavoritesSlice;
export const { reducer: productFavoritesReducer } = productFavoritesSlice;
