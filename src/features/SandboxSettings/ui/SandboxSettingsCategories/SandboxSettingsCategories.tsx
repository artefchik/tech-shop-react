import { classNames } from 'shared/lib/classNames/classNames';
import {
    DropdownBox,
    DropdownBoxItem,
} from 'shared/ui/DropdownBox/DropdownBox';
import { VStack } from 'shared/ui/Stack';
import { useCallback, useMemo } from 'react';
import { ArticleType } from 'entities/Article';
import { sandboxSettingsActions } from 'features/SandboxSettings/model/slice/sandboxSettingsSlice';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text } from 'shared/ui/Text/Text';
import { Select, SelectItem } from 'shared/ui/DropdownsList/ui/Select/Select';
import { useSelector } from 'react-redux';
import { getSandboxSettingsType } from 'features/SandboxSettings/model/selectors/getSandboxSettingsType/getSandboxSettingsType';
import { useTranslation } from 'react-i18next';

interface SandboxSettingsCategoriesProps {
    className?: string;
}

export const SandboxSettingsCategories = (
    props: SandboxSettingsCategoriesProps,
) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const type = useSelector(getSandboxSettingsType);

    const onChangeType = useCallback(
        (type: string) => {
            dispatch(sandboxSettingsActions.setTypes(type as ArticleType));
        },
        [dispatch],
    );

    const sortTypesOptions = useMemo<DropdownBoxItem[]>(
        () => [
            {
                value: ArticleType.ALL,
                content: 'Все статьи',
            },
            {
                value: ArticleType.SCIENCE,
                content: 'Наука',
            },
            {
                value: ArticleType.IT,
                content: 'IT',
            },
            {
                value: ArticleType.POLITICS,
                content: 'Политика',
            },
        ],
        [],
    );

    return (
        <VStack gap="10" className={className}>
            <Text text={t('Categories')} />
            <Select
                value={type}
                onChange={onChangeType}
                items={sortTypesOptions}
                defaultValue={type || 'Categories'}
                className={className}
            />
        </VStack>
    );
};
