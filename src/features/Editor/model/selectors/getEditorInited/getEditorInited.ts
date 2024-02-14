import { StateSchema } from 'app/providers/StoreProvider';

export const getEditorInited = (state: StateSchema) => state.editor?._inited;
