import { EditorBlock, TextBlock } from 'features/Editor/model/types/editor';
import { getStorageItem } from 'shared/lib/helpers/localStorage';
import { EDITOR_LOCALSTORAGE_KEY } from 'shared/const/localStorage';
import { ArticleBlockType } from 'entities/Article/model/types/article';

export interface StorageBlocks {
    title: string;
    blocks: EditorBlock[];
}

export const getStorageBlocks = () => {
    const data = getStorageItem(EDITOR_LOCALSTORAGE_KEY) as StorageBlocks;
    if (data) {
        const { blocks, title } = data;
        const textBlocks = blocks.some((block) => {
            if (block.type === ArticleBlockType.TEXT) {
                const item = block as TextBlock;
                return item.text;
            }
        });
        const isTitle = Boolean(title);

        return textBlocks && isTitle;
    }
    return false;
};
