import { StateSchema } from 'app/providers/StoreProvider';

export const getArticleDetailsCommentsData = (state: StateSchema) =>
    state.articleDetailsComments?.data;
