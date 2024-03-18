import { StateSchema } from 'app/providers/StoreProvider';
import { createSelector } from '@reduxjs/toolkit';

export const getEditorSavedData = (state: StateSchema) =>
    state.editor?.savedData ?? { blocks: [], title: '', savedDate: '' };

export const isEditorSavedData = createSelector(
    getEditorSavedData,
    (savedData) => {
        const blocks = Boolean(savedData.blocks.length);
        const title = Boolean(savedData.title);
        return blocks && title;
    },
);
