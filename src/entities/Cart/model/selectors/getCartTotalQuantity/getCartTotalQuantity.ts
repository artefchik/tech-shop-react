import { StateSchema } from 'app/providers/StoreProvider';

export const getCartTotalQuantity = (state: StateSchema) =>
    Object.values(state.cart.itemsMap).reduce(
        (acc, { quantity }) => acc + quantity,
        0,
    );
