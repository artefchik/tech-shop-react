import { createSelector } from '@reduxjs/toolkit';
import { getEditorTitle } from '../getEditorTitle/getEditorTitle';
import { getEditorTextBlocksParagraphs } from '../getEditorBlocks/getEditorBlocks';

export const getEditorValidate = createSelector(
    getEditorTitle,
    getEditorTextBlocksParagraphs,
    (title, paragraphLength) => title.length > 5 && paragraphLength > 40,
);
