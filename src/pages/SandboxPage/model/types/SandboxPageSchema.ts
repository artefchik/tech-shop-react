import { Article } from 'entities/Article';

export interface SandboxPageSchema {
    data?: Article;
    isLoading: boolean;
    error?: string;
}
