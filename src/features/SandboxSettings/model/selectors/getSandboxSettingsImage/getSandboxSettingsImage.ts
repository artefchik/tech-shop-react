import { StateSchema } from 'app/providers/StoreProvider';

export const getSandboxSettingsImage = (state: StateSchema) =>
    state.sandboxSettings?.previewImage ?? '';
