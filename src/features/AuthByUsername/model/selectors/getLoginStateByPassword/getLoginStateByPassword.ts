import { StateSchema } from 'app/providers/StoreProvider';

export const getLoginStateByPassword = (state: StateSchema) => state?.login?.password || '';
