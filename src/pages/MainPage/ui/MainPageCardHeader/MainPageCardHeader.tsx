import { classNames } from 'shared/lib/classNames/classNames';
import { HStack } from 'shared/ui/Stack';
import { Text, TextSize, TextWeight } from 'shared/ui/Text/Text';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { useTranslation } from 'react-i18next';
import cls from './MainPageCardHeader.module.scss';

interface MainPageCardHeaderProps {
    className?: string;
    title: string;
    srcLink: string;
}

export const MainPageCardHeader = (props: MainPageCardHeaderProps) => {
    const { className, srcLink, title } = props;
    const { t } = useTranslation();
    return (
        <HStack className={className} justify="between" align="center" gap="15">
            <Text text={title} size={TextSize.BIG} weight={TextWeight.SEMI} As="h4" />
            <AppLink theme={AppLinkTheme.SECONDARY} to={srcLink}>
                {t('См.все')}
            </AppLink>
        </HStack>
    );
};
