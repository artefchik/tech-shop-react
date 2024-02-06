import { StateSchema } from 'app/providers/StoreProvider';

export const getArticleListLimit = (state: StateSchema) =>
    state.articlesPage?.limit || 6;
