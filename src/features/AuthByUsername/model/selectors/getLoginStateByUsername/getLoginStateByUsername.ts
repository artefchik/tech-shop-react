import { StateSchema } from 'app/providers/StoreProvider';

export const getLoginStateByUsername = (state: StateSchema) => state?.login?.username;
