import { ArticleBlock, ArticleBlockType } from 'entities/Article/model/types/article';

interface Block {
    id: string;
    type: ArticleBlockType;
    title?: string;
}
export interface ImageBlock extends Block {
    image?: string;
}

export interface TextBlock extends Block {
    paragraph?: string;
}

export type EditorBlock = ImageBlock | TextBlock;

export interface TimeChange {
    hour: number;
    minutes: number;
    day?: number;
    text?: string;
}

export interface EditorData {
    blocks: EditorBlock[];
    title: string;
}

export interface EditorSavedData extends EditorData {
    savedDate?: string;
}

export interface EditorSchema {
    editorData: EditorData;
    savedData?: EditorSavedData;
    _initiated: boolean;
}
