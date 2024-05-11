import { StateSchema } from 'app/providers/StoreProvider';

export const getOfferedArticleDetailsError = (state: StateSchema) =>
    state.offeredArticleDetails?.error ?? '';
