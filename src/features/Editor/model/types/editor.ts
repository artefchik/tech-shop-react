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
export interface EditorSchema {
    title: string;
    img?: string;

    blocks: EditorBlock[];
}
