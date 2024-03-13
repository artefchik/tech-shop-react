import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    FavoriteProduct,
    FavoriteType,
    ProductFavoritesSchema,
} from 'features/ProductFavoriteButton/model/types/favorite';
import { fetchProductsList } from 'pages/ProductsPage/model/services/fetchProductsList/fetchProductsList';
import { fetchProductsFavorites } from 'features/ProductFavoriteButton/model/services/fetchProductsFavorites/fetchProductsFavorites';
import { Article } from 'entities/Article';
import { StateSchema } from 'app/providers/StoreProvider';

const initialState: ProductFavoritesSchema = {
    isLoading: false,
    ids: [],
    entities: {},
};

const productFavoritesAdapter = createEntityAdapter<FavoriteProduct>({
    selectId: (favorite: FavoriteProduct) => favorite.productId,
});

export const getProductFavorites = productFavoritesAdapter.getSelectors<StateSchema>(
    (state) => state.productFavorites || productFavoritesAdapter.getInitialState(),
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
            // if (action.payload.isFavorite) {
            //     productFavoritesAdapter.setOne(state, action.payload);
            // } else {
            //     productFavoritesAdapter.removeOne(state, action.payload.id);
            // }
        },
        updateData: (state, action: PayloadAction<FavoriteProduct[]>) => {
            productFavoritesAdapter.setAll(state, action.payload);
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
            });
    },
});

export const { actions: productFavoritesActions } = productFavoritesSlice;
export const { reducer: productFavoritesReducer } = productFavoritesSlice;
