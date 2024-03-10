import { StateSchema } from 'app/providers/StoreProvider';

export const getCartData = (state: StateSchema) => state.cart.data;
