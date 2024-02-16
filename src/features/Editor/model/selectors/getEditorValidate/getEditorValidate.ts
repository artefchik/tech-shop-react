import { createSelector } from '@reduxjs/toolkit';
import { getEditorIsTitleRecorded } from 'features/Editor';
import { getEditorTextBlocksT } from 'features/Editor/model/selectors/getEditorBlocks/getEditorBlocks';

export const getEditorValidate = createSelector(
    getEditorIsTitleRecorded,
    getEditorTextBlocksT,
    (title, textBlocks) => !(title > 15 && textBlocks > 100),
);
