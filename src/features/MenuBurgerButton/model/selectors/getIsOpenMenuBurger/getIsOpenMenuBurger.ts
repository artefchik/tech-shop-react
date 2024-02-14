import { StateSchema } from 'app/providers/StoreProvider';

export const getIsOpenMenuBurger = (state: StateSchema) =>
    state.menuBurger?.isOpen ?? false;
