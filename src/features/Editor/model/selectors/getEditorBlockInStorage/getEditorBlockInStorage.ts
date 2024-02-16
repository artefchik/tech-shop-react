import { StateSchema } from 'app/providers/StoreProvider';
import { createSelector } from '@reduxjs/toolkit';
import { ArticleBlockType } from 'entities/Article/model/types/article';
import { TextBlock } from 'features/Editor/model/types/editor';

export const getEditorBlocksInStorage = (state: StateSchema) =>
    state.editor?.dataStorage;

export const getIsEditorBlockInStorage = createSelector(
    getEditorBlocksInStorage,
    (data) => {
        if (data) {
            const { title, blocks } = data;
            const isBlock = blocks.some((block) => block.title);

            const isTitle = Boolean(title);

            return isBlock && isTitle;
        }

        return false;
    },
);
