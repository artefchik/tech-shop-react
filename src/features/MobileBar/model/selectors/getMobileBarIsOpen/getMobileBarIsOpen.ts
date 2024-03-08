import { StateSchema } from 'app/providers/StoreProvider';

export const getMobileBarIsOpen = (state: StateSchema) =>
    state.mobileBar?.isOpen ?? false;
