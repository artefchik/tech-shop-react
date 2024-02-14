import { StateSchema } from 'app/providers/StoreProvider';
import { createSelector } from '@reduxjs/toolkit';
import { ArticleBlockType } from 'entities/Article/model/types/article';
import { EditorBlock } from 'features/Editor/model/types/editor';

export const getEditorBlocks = (state: StateSchema) => state.editor?.blocks;
export const getTextBlocks = (state: StateSchema) =>
    state.editor?.blocks.filter(
        (block) => block.type === ArticleBlockType.TEXT,
    ) ?? [];

export const getEditorTextBlocksParagraphs = createSelector(
    getTextBlocks,
    (textBlocks) =>
        textBlocks
            ?.map((textBlock) => textBlock?.paragraphs?.join('')?.length ?? 0)
            .reduce((accum, elem) => accum + elem, 0) ?? 0,
);

export const getEditorTextBlocks = createSelector(getTextBlocks, (textBlocks) =>
    textBlocks?.filter((textBlock) => Boolean(textBlock.paragraphs?.length)),
);

export const editorBlocks = createSelector(getEditorBlocks, (blocks) =>
    blocks?.filter((block) => {
        if (block.type === ArticleBlockType.IMAGE && block.image) {
            return block;
        }
        if (block.type === ArticleBlockType.TEXT && block.paragraphs?.length) {
            return block;
        }
    }),
);

// export const getEditorTextBlocksParagraphsLength = createSelector(getEditorTextBlocksParagraphs,(block)=>block.);
// export const getEditorIsTextBlocksRecorded = createSelector(
//     getEditorTextBlocksParagraphsLength,
//     (items) => items?.reduce((accum, item) => (accum? + (item ? item : 0 )),0 ),
// );
