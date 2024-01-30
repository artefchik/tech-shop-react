import { rtkApi } from 'shared/api/rtkApi';
import { FavoriteProduct } from '../model/types/favorite';

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
        getProductFavorite: build.query<
            FavoriteProduct[],
            GetProductFavoritesArg
        >({
            query: ({ productId, userId }) => ({
                url: '/product-favorites',
                params: {
                    productId,
                    userId,
                },
            }),
            providesTags: (result) => ['ProductFavorites'],
        }),
        changeProductFavorite: build.mutation<
            ChangeProductFavoritesArg,
            ChangeProductFavoritesArg
        >({
            query: (arg) => ({
                url: `/product-favorites/${arg.productId}`,
                method: 'PATCH',
                body: arg,
            }),
            invalidatesTags: ['ProductFavorites'],
        }),
        addProductFavorite: build.mutation<
            ChangeProductFavoritesArg,
            ChangeProductFavoritesArg
        >({
            query: (arg) => ({
                url: `/product-favorites`,
                method: 'POST',
                body: arg,
            }),
            invalidatesTags: ['ProductFavorites'],
        }),
    }),
});

export const useGetProductFavorite =
    productFavoriteApi.useGetProductFavoriteQuery;
export const useChangeProductFavorite =
    productFavoriteApi.useChangeProductFavoriteMutation;
