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

export interface CartType {
    products: CartItemType[];
    userId: string;
}

const cartApiWithTag = rtkApi.enhanceEndpoints({
    addTagTypes: ['CART'],
});

export const cartApi = cartApiWithTag.injectEndpoints({
    endpoints: (build) => ({
        getCartProducts: build.query<CartType, string>({
            query: (userId) => ({
                url: '/cart',
                params: {
                    userId,
                },
            }),
            providesTags: (result) => ['CART'],
        }),
        updateProducts: build.mutation<CartType, CartType>({
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
export const setUpdateProducts = cartApi.endpoints.updateProducts.initiate;
