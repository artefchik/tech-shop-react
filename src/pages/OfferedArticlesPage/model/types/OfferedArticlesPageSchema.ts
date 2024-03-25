import { Article } from 'entities/Article';

export interface OfferedArticlesPageSchema {
    data?: Article[];
    isLoading: boolean;
    error?: string;
}
