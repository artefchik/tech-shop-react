import { StateSchema } from 'app/providers/StoreProvider';

export const getArticleListIsLoading = (state:StateSchema) => state.articlesPage?.isLoading;
