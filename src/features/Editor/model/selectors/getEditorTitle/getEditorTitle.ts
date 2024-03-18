import { StateSchema } from 'app/providers/StoreProvider';

export const getEditorTitle = (state: StateSchema) =>
    state.editor?.editorData.title || '';
