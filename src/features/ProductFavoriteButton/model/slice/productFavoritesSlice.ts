import {
    createEntityAdapter,
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
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
    selectId: (favorite: FavoriteProduct) => favorite.id,
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
            if (action.payload.isFavorite) {
                productFavoritesAdapter.setOne(state, action.payload);
            } else {
                productFavoritesAdapter.removeOne(state, action.payload.id);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsFavorites.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchProductsFavorites.fulfilled, (state, action) => {
                state.isLoading = false;
                productFavoritesAdapter.setAll(state, action.payload.favorites);
                // if (action.meta.arg.replace) {
                //     productAdapter.setAll(state, action.payload);
                // } else {
                //     productAdapter.addMany(state, action.payload);
                // }
            })
            .addCase(fetchProductsFavorites.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: productFavoritesActions } = productFavoritesSlice;
export const { reducer: productFavoritesReducer } = productFavoritesSlice;
