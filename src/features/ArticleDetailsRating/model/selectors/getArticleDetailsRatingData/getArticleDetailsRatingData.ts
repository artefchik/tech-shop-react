import { StateSchema } from 'app/providers/StoreProvider';

export const getArticleDetailsRatingData = (state: StateSchema) =>
    state.articleDetailsRating?.data;
