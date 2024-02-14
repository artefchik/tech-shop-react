import { StateSchema } from 'app/providers/StoreProvider';

export const getEditorShowBlocks = (state: StateSchema) =>
    state.editor?._showBlocks ?? false;
