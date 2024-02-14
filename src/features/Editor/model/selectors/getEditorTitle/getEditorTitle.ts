import { StateSchema } from 'app/providers/StoreProvider';
import { createSelector } from '@reduxjs/toolkit';

export const getEditorTitle = (state: StateSchema) => state.editor?.title ?? '';

export const getEditorIsTitleRecorded = createSelector(
    getEditorTitle,
    (title) => title.length,
);
