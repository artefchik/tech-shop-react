import { StateSchema } from 'app/providers/StoreProvider';

export const getSignUpByEmailError = (state: StateSchema) =>
    state.signUpByEmail?.error ?? '';
