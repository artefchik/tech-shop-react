import { Article } from 'entities/Article';
import { OfferedArticle } from 'features/OfferedArticle';

export interface OfferedArticlesPageSchema {
    data?: OfferedArticle[];
    isLoading: boolean;
    error?: string;
}
