import { Article } from 'entities/Article';

export interface OfferedArticle extends Article {
    rejected?: string;
}

export interface OfferedArticleDetailsSchema {
    data?: OfferedArticle;
    isLoading: boolean;
    error?: string;
}
