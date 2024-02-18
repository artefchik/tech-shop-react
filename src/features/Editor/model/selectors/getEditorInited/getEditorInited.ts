import { StateSchema } from 'app/providers/StoreProvider';

export const getEditorInitiated = (state: StateSchema) =>
    state.editor?._initiated ?? false;
