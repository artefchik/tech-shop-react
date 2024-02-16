import { StateSchema } from 'app/providers/StoreProvider';
import { createSelector } from '@reduxjs/toolkit';
import { ArticleBlockType } from 'entities/Article/model/types/article';
import { TextBlock } from 'features/Editor/model/types/editor';

export const getEditorBlocks = (state: StateSchema) => state.editor?.editorData.blocks;

export const getEditorTextBlocks = createSelector(getEditorBlocks, (blocks) =>
    blocks?.filter((block) => block.type === ArticleBlockType.TEXT),
);

export const getEditorTextBlocksT = createSelector(
    getEditorTextBlocks,
    (texBlocks) =>
        texBlocks?.reduce((accum, text) => {
            const item = text as TextBlock;
            return accum + (item.text?.length || 0);
        }, 0) ?? 0,
);
