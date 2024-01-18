export { getArticleDetailsData } from './model/selectors/getArticleDetailsData/getArticleDetailsData';
export {
    getArticleDetailsIsLoading,
} from './model/selectors/getArticleDetailsIsLoading/getArticleDetailsIsLoading';
export { getArticleDetailsError } from './model/selectors/getArticleDetailsError/getArticleDetailsError';

export { articleDetailsActions, articleDetailsReducer } from './model/slice/articleDetailsSlice';
export { ArticleDetails } from './ui/ArticleDetails/ArticleDetails';
export { ArticleDetailsSchema } from './model/types/ArticleDetailsSchema';
