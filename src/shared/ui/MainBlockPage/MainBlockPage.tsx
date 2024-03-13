import { classNames } from 'shared/lib/classNames/classNames';
import { HStack, VStack } from 'shared/ui/Stack';
import { Text, TextSize, TextWeight } from 'shared/ui/Text/Text';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './MainBlockPage.module.scss';

interface MainBlockPageProps {
    className?: string;
    title?: string;
    srcLink: string;
    ListBlock?: ReactNode;
}

export const MainBlockPage = (props: MainBlockPageProps) => {
    const { className, title, srcLink, ListBlock } = props;
    const { t } = useTranslation();
    return (
        <VStack gap="15" className={classNames(cls.MainBlockPage, {}, [className])}>
            <HStack justify="between" align="center" gap="15">
                <Text text={title} size={TextSize.BIG} weight={TextWeight.SEMI} />
                <AppLink theme={AppLinkTheme.SECONDARY} to={srcLink}>
                    {t('См.все')}
                </AppLink>
            </HStack>
            {ListBlock && ListBlock}
        </VStack>
    );
};
