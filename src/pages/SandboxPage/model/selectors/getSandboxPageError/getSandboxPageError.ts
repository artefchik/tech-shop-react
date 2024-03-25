import { StateSchema } from 'app/providers/StoreProvider';

export const getSandboxPageError = (state: StateSchema) =>
    state.sandboxPage?.error ?? '';
