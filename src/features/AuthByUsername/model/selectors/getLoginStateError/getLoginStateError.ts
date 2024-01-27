import { StateSchema } from 'app/providers/StoreProvider';

export const getLoginStateError = (state: StateSchema) => state?.login?.error;
