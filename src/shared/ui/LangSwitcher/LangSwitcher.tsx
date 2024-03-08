import { useTranslation } from 'react-i18next';
import React, { useMemo } from 'react';
import { Dropdown } from 'shared/ui/DropdownsList';
import langIcon from 'shared/assets/icons/langSwitch.svg';
import { DropdownItem } from 'shared/ui/DropdownsList/ui/Dropdown/Dropdown';
import { HStack } from 'shared/ui/Stack';

interface LangSwitcherProps {
    className?: string;
}

export const LangSwitcher = ({ className }: LangSwitcherProps) => {
    const { t, i18n } = useTranslation();

    const toggle = (lang: string) => async () => {
        await i18n.changeLanguage(lang);
    };

    const langVariants = useMemo<DropdownItem[]>(
        () => [
            {
                content: 'Русский ',
                onClick: toggle('ru'),
            },
            {
                content: 'English ',
                onClick: toggle('en'),
            },
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    );

    return (
        <HStack gap="10" align="center">
            <Dropdown
                defaultValue={i18n.language.toLocaleUpperCase()}
                items={langVariants}
                icon={langIcon}
                open="topLeft"
                triggerClear
                className={className}
            />
        </HStack>
    );
};
