import { StateSchema } from 'app/providers/StoreProvider';

export const getOfferedArticleDetailsIsLoading = (state: StateSchema) =>
    state.offeredArticleDetails?.isLoading ?? false;
