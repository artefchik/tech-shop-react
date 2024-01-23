import { StateSchema } from 'app/providers/StoreProvider';

export const getSiteSearchText = (state:StateSchema) => state.siteSearch?.text || '';
