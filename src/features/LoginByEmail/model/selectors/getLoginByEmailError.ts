import { StateSchema } from 'app/providers/StoreProvider';

export const getLoginByEmailError = (state: StateSchema) =>
    state.loginByEmail?.error;
