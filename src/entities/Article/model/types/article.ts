import { User } from 'entities/User';

export enum ArticleBlockType {
    TEXT = 'TEXT',
    IMAGE = 'IMAGE',
}

export interface ArticleBlockBase {
    _id: string;
    type: ArticleBlockType;
    title?: string;
}

export interface ArticleTextBlock extends ArticleBlockBase {
    paragraph?: string;
}
export interface ArticleImageBlock extends ArticleBlockBase {
    src?: string;
}

export type ArticleBlock = ArticleImageBlock | ArticleTextBlock;

export enum ArticleType {
    ALL = 'All',
    IT = 'IT',
    SCIENCE = 'Science',
    POLITICS = 'Politics',
}

export enum ArticleView {
    BIG = 'big',
    SMALL = 'small',
}

export interface Article {
    id: string;
    title: string;
    user: User;
    img: string;
    views: number;
    createdAt: Date;
    isUpdate: boolean;
    types: ArticleType[];
    blocks: ArticleBlock[];
}
