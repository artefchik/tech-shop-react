import { StateSchema } from 'app/providers/StoreProvider';

export const getCartProducts = (state: StateSchema) =>
    Object.values(state.cart.itemsMap).map((item) => item.product);
