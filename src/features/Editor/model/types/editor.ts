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
    text?: string;
}

export type EditorBlock = ImageBlock | TextBlock;

export interface DateChange {
    hour: number;
    minutes: number;
    day?: number;
    text?: string;
}

export interface Editor {
    blocks: EditorBlock[];
    title: string;
}

export interface EditorSchema {
    title?: string;
    img?: string;
    editorData: Editor;
    dateChange: DateChange;
    dataStorage?: Editor;
    _initiated: boolean;
}
