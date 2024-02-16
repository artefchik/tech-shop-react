import { classNames } from 'shared/lib/classNames/classNames';
import { Card } from 'shared/ui/Card/Card';
import { VStack } from 'shared/ui/Stack';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { DropdownBox } from 'shared/ui/DropdownBox/DropdownBox';
import { ArticleType } from 'entities/Article';
import { TabItem, Tabs } from 'shared/ui/Tabs/Tabs';
import { LanguageType } from 'shared/const/types';
import { DynamicModelLoader } from 'shared/lib/components/DynamicModelLoader/DynamicModelLoader';
import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { Input, InputTheme } from 'shared/ui/Input/Input';
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce';
import { getStorageBlocks } from 'pages/SandboxPage/model/services/getStorageBlock/getStorageBlock';
import { getSandboxSettingsLang } from 'features/SandboxSettings/model/selectors/getSandboxSettingsLang/getSandboxSettingsLang';
import { getSandboxSettingsKeyWords } from 'features/SandboxSettings/model/selectors/getSandboxSettingsKeyWords/getSandboxSettingsKeyWords';
import { SandboxSettings } from 'features/SandboxSettings';
import {
    sandboxSettingsActions,
    sandboxSettingsReducer,
} from '../../../../features/SandboxSettings/model/slice/sandboxSettingsSlice';
import cls from './SandboxSettingsPage.module.scss';
import { SandboxSettingsPreview } from '../SandboxSettingsPreview/SandboxSettingsPreview';

interface SandboxSettingsPageProps {
    className?: string;
}

export const SandboxSettingsPage = (props: SandboxSettingsPageProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();

    return (
        <DynamicModelLoader name="sandboxSettings" reducer={sandboxSettingsReducer}>
            <VStack gap="20">
                <Text theme={TextTheme.HEADER} title="Настройки статьи" />
                <Card>
                    <VStack gap="25">
                        <SandboxSettings />
                        <SandboxSettingsPreview />
                    </VStack>
                </Card>
            </VStack>
        </DynamicModelLoader>
    );
};
