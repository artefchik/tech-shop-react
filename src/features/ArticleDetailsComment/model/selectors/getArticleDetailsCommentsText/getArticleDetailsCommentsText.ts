import { StateSchema } from 'app/providers/StoreProvider';

export const getArticleDetailsCommentsText = (state: StateSchema) =>
    state.articleDetailsComments?.text || '';
