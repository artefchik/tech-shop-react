// ArticleBlockType from Article

import React from 'react';
import { DropdownItem } from 'shared/ui/DropdownsList/ui/Dropdown/Dropdown';
import {
    ArticleBlock,
    ArticleBlockType,
} from 'entities/Article/model/types/article';

export enum BlockType {
    TITLE = 'title',
    SUBTITLE = 'subtitle',
    IMAGE = 'image',
    PARAGRAPH = 'paragraph',
    LINK = 'link',
}

// export interface DropdownItem {
//     content: string;
//     icon?: React.VFC<React.SVGProps<SVGSVGElement>>;
//     action?: BlockType;
// }

// export const createBlockConfig: Record<BlockType, DropdownItem> = {
//     [BlockType.TITLE]: {
//         content: 'Заголовок',
//     },
//     [BlockType.SUBTITLE]: {
//         content: 'Подзаголовок',
//     },
//     [BlockType.IMAGE]: {
//         content: 'Изображение',
//     },
//     [BlockType.PARAGRAPH]: {
//         content: 'Параграф',
//     },
//     [BlockType.LINK]: {
//         content: 'Ссылка',
//     },
// };

//
// export interface ArticleBlockBase {
//     id: string;
//     type: ArticleBlockType;
//     title?: string;
// }
//
// export interface ArticleTextBlock extends ArticleBlockBase {
//     paragraphs?: string[];
// }
// export interface ArticleImageBlock extends ArticleBlockBase {
//     src?: string;
// }

export interface DataForm {
    title: string;
    img: string;
}

export interface SandboxPageSchema {
    title: string;
    img?: string;

    blocks: ArticleBlock[];
}
