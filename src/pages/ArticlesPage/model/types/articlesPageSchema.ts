import { EntityState } from '@reduxjs/toolkit';
import { Article } from 'entities/Article';
import { ViewType } from 'shared/const/types';

export interface ArticlesPageSchema extends EntityState<Article> {
    isLoading?: boolean;
    error?: string;
    view: ViewType;

    page: number;
    limit: number;
    hasMore: boolean;

    _inited: boolean;
}
