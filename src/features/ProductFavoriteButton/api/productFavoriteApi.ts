import { rtkApi } from 'shared/api/rtkApi';
import { FavoriteProduct, FavoriteType } from '../model/types/favorite';

interface GetProductFavoritesArg {
    productId: string;
    userId: string;
}
interface ChangeProductFavoritesArg {
    isFavorite: boolean;
    productId: string;
    userId: string;
}

const productFavoriteApiWithTag = rtkApi.enhanceEndpoints({
    addTagTypes: ['ProductFavorites'],
});

const productFavoriteApi = productFavoriteApiWithTag.injectEndpoints({
    endpoints: (build) => ({
        getProductsFavorites: build.query<FavoriteType, string>({
            query: (userId) => ({
                url: '/product-favorites',
                params: {
                    userId,
                },
            }),
            providesTags: (result) => ['ProductFavorites'],
        }),
        updateProductsFavorites: build.mutation<FavoriteType, FavoriteType>({
            query: ({ userId, favorites }) => ({
                url: `/product-favorites/${userId}`,
                method: 'PATCH',
                body: {
                    favorites,
                    userId,
                },
            }),
            invalidatesTags: ['ProductFavorites'],
        }),
    }),
});

export const useGetProductsFavorites =
    productFavoriteApi.useGetProductsFavoritesQuery;

export const useUpdateProductsFavorites =
    productFavoriteApi.useUpdateProductsFavoritesMutation;
