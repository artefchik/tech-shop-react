import { ArticleType } from 'entities/Article';
import { LanguageType } from 'shared/const/types';

export interface SandboxSettingsSchema {
    types: ArticleType[];
    previewImage: string;
    keyWords: string[];
    lang: LanguageType;
}
