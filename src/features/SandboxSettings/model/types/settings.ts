import { TabItem } from 'shared/ui/Tabs/Tabs';
import { LanguageType } from 'shared/const/types';
import { ArticleType } from 'entities/Article';

export const languageItems: TabItem[] = [
    {
        value: LanguageType.RU,
        content: 'Русский',
    },
    {
        value: LanguageType.EN,
        content: 'Английский',
    },
];
export const articleCategories: ArticleType[] = [
    ArticleType.IT,
    ArticleType.POLITICS,
    ArticleType.SCIENCE,
];

export interface SandboxSettingsSchema {
    types: ArticleType;
    previewImage: string;
    keyWords: string[];
    lang: LanguageType;
}
