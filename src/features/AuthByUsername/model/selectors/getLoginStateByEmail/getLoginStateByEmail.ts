import { StateSchema } from 'app/providers/StoreProvider';

export const getLoginStateByEmail = (state: StateSchema) => state?.login?.email ?? '';
