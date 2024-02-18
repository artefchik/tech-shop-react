import { VStack } from 'shared/ui/Stack';
import { Text } from 'shared/ui/Text/Text';
import { TabItem, Tabs } from 'shared/ui/Tabs/Tabs';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useCallback } from 'react';
import { LanguageType } from 'shared/const/types';
import { sandboxSettingsActions } from '../../model/slice/sandboxSettingsSlice';
import { getSandboxSettingsLang } from '../../model/selectors/getSandboxSettingsLang/getSandboxSettingsLang';
import { languageItems } from '../../model/types/settings';

interface SandboxSettingLanguageProps {
    className?: string;
}

export const SandboxSettingLanguage = (props: SandboxSettingLanguageProps) => {
    const { className } = props;
    const lang = useSelector(getSandboxSettingsLang);
    const dispatch = useAppDispatch();
    const onTabClick = useCallback(
        (tab: TabItem) => {
            dispatch(sandboxSettingsActions.setLang(tab.value as LanguageType));
        },
        [dispatch],
    );

    return (
        <VStack gap="10" className={className}>
            <Text text="Язык статьи" />
            <Tabs tabs={languageItems} value={lang} onTabClick={onTabClick} name="lang" />
        </VStack>
    );
};
