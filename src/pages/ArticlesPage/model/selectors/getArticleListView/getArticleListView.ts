import { StateSchema } from 'app/providers/StoreProvider';
import { ViewType } from 'shared/const/types';

export const getArticleListView = (state: StateSchema) =>
    state.articlesPage?.view ?? ViewType.SMALL;
