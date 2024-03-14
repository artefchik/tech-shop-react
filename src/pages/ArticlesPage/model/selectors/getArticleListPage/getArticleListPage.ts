import { StateSchema } from 'app/providers/StoreProvider';

export const getArticleListPage = (state: StateSchema) => state.articlesPage?.page || 0;
