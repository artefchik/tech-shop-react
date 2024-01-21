import { StateSchema } from 'app/providers/StoreProvider';

export const getArticleListInited = (state:StateSchema) => state.articlesPage?._inited;
