import { StateSchema } from 'app/providers/StoreProvider';
import { LanguageType } from 'shared/const/types';

export const getSandboxSettingsLang = (state: StateSchema) =>
    state.sandboxSettings?.lang ?? LanguageType.RU;
