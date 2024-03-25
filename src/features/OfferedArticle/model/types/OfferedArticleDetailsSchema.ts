import { Article } from 'entities/Article';

export interface OfferedArticleDetailsSchema {
    data?: Article;
    isLoading: boolean;
    error?: string;
}
