import { StateSchema } from 'app/providers/StoreProvider';
import { ViewType } from 'shared/ui/ViewSelector/ViewSelector';

export const getArticleListView = (state: StateSchema) =>
    state.articlesPage?.view ?? ViewType.SMALL;
