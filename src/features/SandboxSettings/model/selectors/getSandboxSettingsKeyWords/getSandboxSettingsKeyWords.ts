import { StateSchema } from 'app/providers/StoreProvider';

export const getSandboxSettingsKeyWords = (state: StateSchema) =>
    state.sandboxSettings?.keyWords ?? [];
