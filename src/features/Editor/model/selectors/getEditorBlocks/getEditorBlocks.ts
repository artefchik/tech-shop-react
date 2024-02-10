import { StateSchema } from 'app/providers/StoreProvider';

export const getEditorBlocks = (state: StateSchema) => state.editor?.blocks;
