import { StateSchema } from 'app/providers/StoreProvider';

export const getEditorData = (state: StateSchema) => state.editor?.editorData;
