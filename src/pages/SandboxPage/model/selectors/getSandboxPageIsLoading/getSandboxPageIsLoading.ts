import { StateSchema } from 'app/providers/StoreProvider';

export const getSandboxPageIsLoading = (state: StateSchema) =>
    state.sandboxPage?.isLoading ?? false;
