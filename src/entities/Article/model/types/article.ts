import { User } from 'entities/User';

export enum ArticleBlockType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE'
}

export interface ArticleBlockBase {
  id:string;
  type:ArticleBlockType;
  title?:string
}

export interface ArticleTextBlock extends ArticleBlockBase {
  paragraphs?:string[]
}
export interface ArticleImageBlock extends ArticleBlockBase {
  src?:string
}

export type ArticleBlock = ArticleImageBlock | ArticleTextBlock

export enum ArticleType {
  IT = 'IT',
  SCIENCE = 'SCIENCE',
  POLITICS = 'POLITICS'
}

export enum ArticleView {
  BIG = 'big',
  SMALL = 'small'
}

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  user: User;
  img: string;
  views: number;
  createdAt: string;
  types:ArticleType[];
  blocks:ArticleBlock[]
}
