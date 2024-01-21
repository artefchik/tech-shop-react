import { ArticleType } from 'entities/Article';
import { ArticleSortField } from './filters';

export interface ArticleFiltersSchema {
  sort:ArticleSortField;
  search:string;
  type:ArticleType
}
