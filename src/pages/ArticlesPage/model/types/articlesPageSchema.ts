import { EntityState } from '@reduxjs/toolkit';
import { Article, ArticleView } from 'entities/Article';
import { ViewType } from 'shared/ui/ViewSelector/ViewSelector';

export interface ArticlesPageSchema extends EntityState<Article> {
    isLoading?: boolean;
    error?: string;
    view: ViewType;

    page: number;
    limit?: number;
    hasMore: boolean;

    _inited: boolean;
}
