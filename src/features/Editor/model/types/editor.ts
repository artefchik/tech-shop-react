import {
    ArticleBlock,
    ArticleBlockType,
} from 'entities/Article/model/types/article';

interface Block {
    id: string;
    type: ArticleBlockType;
    title?: string;
}
export interface ImageBlock extends Block {
    image?: string;
}

export interface TextBlock extends Block {
    paragraphs?: string[];
}

export type EditorBlock = ImageBlock & TextBlock;

// export interface EditorBlock {
//     id: string;
//     type: ArticleBlockType;
//     text?: string;
//     image?: string;
//     title?: string;
// }
export interface DateChange {
    hour: number;
    minutes: number;
    day?: number;
    text?: string;
}

export interface EditorSchema {
    title: string;
    img?: string;
    blocks: EditorBlock[];
    dateChange: DateChange;
    _showBlocks: boolean;
    _inited: boolean;
}
