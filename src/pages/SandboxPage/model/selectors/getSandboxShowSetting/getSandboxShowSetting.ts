import { StateSchema } from 'app/providers/StoreProvider';

export const getSandboxShowSetting = (state: StateSchema) =>
    state.sandboxPage?._showSettings ?? false;
