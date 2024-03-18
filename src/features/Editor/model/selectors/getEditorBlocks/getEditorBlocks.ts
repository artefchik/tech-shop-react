import { StateSchema } from 'app/providers/StoreProvider';
import { createSelector } from '@reduxjs/toolkit';
import {
    ArticleBlockType,
    ArticleTextBlock,
} from 'entities/Article/model/types/article';

export const getEditorBlocks = (state: StateSchema) =>
    state.editor?.editorData.blocks ?? [];

export const getEditorTextBlocks = createSelector(getEditorBlocks, (blocks) =>
    blocks?.filter((block) => block.type === ArticleBlockType.TEXT),
);

export const getEditorTextBlocksParagraphs = createSelector(
    getEditorTextBlocks,
    (textBlocks) =>
        textBlocks.reduce((accum, textBlock) => {
            const item = textBlock as ArticleTextBlock;
            return accum + (item.paragraph?.length ?? 0);
        }, 0),
);
