import { StateSchema } from 'app/providers/StoreProvider';

export const getOfferedArticlesData = (state: StateSchema) =>
    state.offeredArticlesPage?.data;
