import { createSelector } from '@reduxjs/toolkit';
import { getEditorIsTitleRecorded } from 'features/Editor';
import { getEditorTextBlocksParagraphs } from 'features/Editor/model/selectors/getEditorBlocks/getEditorBlocks';

export const getEditorValidate = createSelector(
    getEditorIsTitleRecorded,
    getEditorTextBlocksParagraphs,
    (title, textBlocks) => !(title > 15 && textBlocks > 100),
);
