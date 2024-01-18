import { StateSchema } from 'app/providers/StoreProvider';

export const getUserInitied = (state: StateSchema) => state.user._mounted;
