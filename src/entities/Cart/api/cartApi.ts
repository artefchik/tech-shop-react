import { rtkApi } from 'shared/api/rtkApi';
import { Product } from 'entities/Product';
import { CartItemType, CartSchema } from 'entities/Cart/model/types/cart';

interface GetCartProductsArg {
    productId: string;
    userId: string;
}
interface CartProductsArg {
    userId: string;
}

interface ChangeCartProductsArg {
    product?: Product;
    productId: string;
    userId: string;
}

interface CartItem {
    products: CartItemType[];
    userId: string;
}

const cartApiWithTag = rtkApi.enhanceEndpoints({
    addTagTypes: ['CART'],
});

export const cartApi = cartApiWithTag.injectEndpoints({
    endpoints: (build) => ({
        getCartProducts: build.query<CartItemType[], string>({
            query: (userId) => ({
                url: '/cart',
                params: {
                    userId,
                },
            }),
            providesTags: (result) => ['CART'],
        }),
        updateProductFavorite: build.mutation<CartItem, CartItem>({
            query: ({ userId, products }) => ({
                url: `/cart/${userId}`,
                method: 'PATCH',
                body: {
                    userId,
                    products,
                },
            }),
            invalidatesTags: ['CART'],
        }),
    }),
});

export const getCartProductsQuery = cartApi.endpoints.getCartProducts.initiate;
export const useUpdateProductFavorite =
    cartApi.useUpdateProductFavoriteMutation;
