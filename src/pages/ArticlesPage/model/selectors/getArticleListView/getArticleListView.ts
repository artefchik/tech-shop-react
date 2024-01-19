import { StateSchema } from 'app/providers/StoreProvider';

export const getArticleListView = (state:StateSchema) => state.articlesPage?.view;
