import { classNames } from 'shared/lib/classNames/classNames';
import { Card } from 'shared/ui/Card/Card';
import { VStack } from 'shared/ui/Stack';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { DropdownBox } from 'shared/ui/DropdownBox/DropdownBox';
import { ArticleType } from 'entities/Article';
import { TabItem, Tabs } from 'shared/ui/Tabs/Tabs';
import { LanguageType } from 'shared/const/types';
import { DynamicModelLoader } from 'shared/lib/components/DynamicModelLoader/DynamicModelLoader';
import { useCallback, useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { getDate } from 'shared/lib/helpers/date';
import {
    getStorageItem,
    setStorageItem,
} from 'shared/lib/helpers/localStorage';
import { EDITOR_CREATED_LOCALSTORAGE_KEY } from 'shared/const/localStorage';
import {
    sandboxSettingsActions,
    sandboxSettingsReducer,
} from '../../model/slice/sandboxSettingsSlice';
import cls from './SandboxSettingsPage.module.scss';
import { SandboxSettingsPreview } from '../SandboxSettingsPreview/SandboxSettingsPreview';
import { getSandboxSettingsLang } from '../../model/selectors/getSandboxSettingsLang/getSandboxSettingsLang';

interface SandboxSettingsPageProps {
    className?: string;
}

const articleCategories: ArticleType[] = [
    ArticleType.IT,
    ArticleType.POLITICS,
    ArticleType.SCIENCE,
];

const languageItems: TabItem[] = [
    {
        value: LanguageType.RU,
        content: 'Русский',
    },
    {
        value: LanguageType.EN,
        content: 'Английский',
    },
];

export const SandboxSettingsPage = (props: SandboxSettingsPageProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const lang = useSelector(getSandboxSettingsLang);

    const onTabClick = useCallback(
        (tab: TabItem) => {
            dispatch(sandboxSettingsActions.setLang(tab.value as LanguageType));
        },
        [dispatch],
    );

    const onChangeType = useCallback(
        (items: ArticleType[]) => {
            dispatch(sandboxSettingsActions.setTypes(items));
        },
        [dispatch],
    );

    return (
        <DynamicModelLoader
            name="sandboxSettings"
            reducer={sandboxSettingsReducer}
        >
            <VStack gap="20">
                <Text theme={TextTheme.HEADER} title="Настройки статьи" />
                <Card
                    className={classNames(cls.SandboxSettingsPage, {}, [
                        className,
                    ])}
                >
                    <VStack gap="25">
                        <VStack gap="15">
                            <Text title="Язык статьи" />
                            <Tabs
                                tabs={languageItems}
                                value={lang}
                                onTabClick={onTabClick}
                                name="lang"
                            />
                        </VStack>
                        <VStack gap="10">
                            <Text title="Категории" />
                            <DropdownBox
                                items={articleCategories}
                                onChange={onChangeType}
                            />
                        </VStack>
                        <SandboxSettingsPreview />
                    </VStack>
                </Card>
            </VStack>
        </DynamicModelLoader>
    );
};
