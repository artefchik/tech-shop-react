import { classNames } from 'shared/lib/classNames/classNames';
import { DropdownBox } from 'shared/ui/DropdownBox/DropdownBox';
import { VStack } from 'shared/ui/Stack';
import { useCallback } from 'react';
import { ArticleType } from 'entities/Article';
import { sandboxSettingsActions } from 'features/SandboxSettings/model/slice/sandboxSettingsSlice';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text } from 'shared/ui/Text/Text';
import { articleCategories } from '../../model/types/settings';

interface SandboxSettingsCategoriesProps {
    className?: string;
}

export const SandboxSettingsCategories = (props: SandboxSettingsCategoriesProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();

    const onChangeType = useCallback(
        (items: ArticleType[]) => {
            dispatch(sandboxSettingsActions.setTypes(items));
        },
        [dispatch],
    );

    return (
        <VStack gap="10" className={className}>
            <Text text="Категории" />
            <DropdownBox items={articleCategories} onChange={onChangeType} />
        </VStack>
    );
};
