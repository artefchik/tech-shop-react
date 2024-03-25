import { StateSchema } from 'app/providers/StoreProvider';

export const getOfferedArticleDetailsData = (state: StateSchema) =>
    state.offeredArticleDetails?.data;
