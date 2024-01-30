import { StateSchema } from 'app/providers/StoreProvider';

export const getCartTotalQuantity = (state: StateSchema) =>
    Object.values(state.cart.itemsMap).reduce(
        (acc, { product, quantity }) => acc + quantity * product.price.current,
        0,
    );
