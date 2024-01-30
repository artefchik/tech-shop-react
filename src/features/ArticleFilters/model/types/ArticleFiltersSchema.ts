import { ArticleType } from 'entities/Article';
import { SortOrder } from 'shared/const/types';
import { ArticleSortField } from './filters';

export interface ArticleFiltersSchema {
    sort: ArticleSortField;
    search: string;
    type: ArticleType;
    order: SortOrder;
}
