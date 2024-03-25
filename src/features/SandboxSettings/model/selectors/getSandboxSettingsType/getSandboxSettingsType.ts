import { StateSchema } from 'app/providers/StoreProvider';
import { LanguageType } from 'shared/const/types';
import { ArticleType } from 'entities/Article';

export const getSandboxSettingsType = (state: StateSchema) =>
    state.sandboxSettings?.types ?? ArticleType.IT;
