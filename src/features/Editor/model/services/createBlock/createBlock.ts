import { useCallback } from 'react';
import { ArticleBlockType } from 'entities/Article/model/types/article';
import { isBrowser } from 'react-device-detect';
import { v4 as uuidv4 } from 'uuid';

export const createBlockItem = (type: ArticleBlockType, blockId: string) => {
    const id = isBrowser ? blockId : uuidv4();

    switch (type) {
        case ArticleBlockType.IMAGE:
            return {
                _id: id,
                type: ArticleBlockType.IMAGE,
                image: '',
                title: '',
            };

        default:
            return {
                _id: id,
                type: ArticleBlockType.TEXT,
                title: '',
                text: '',
            };
    }
};
