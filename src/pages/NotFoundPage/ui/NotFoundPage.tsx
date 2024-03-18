import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'shared/ui/Page/Page';
import { Text } from 'shared/ui/Text/Text';
import { VStack } from 'shared/ui/Stack';
import { useTranslation } from 'react-i18next';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { getRoutePathMain } from 'shared/const/router';
import cls from './NotFoundPage.module.scss';

interface NotFoundPageProps {
    className?: string;
}

export const NotFoundPage = ({ className }: NotFoundPageProps) => {
    const { t } = useTranslation();
    return (
        <Page className={classNames(cls.NotFoundPage, {}, [className])}>
            <VStack gap="30" align="center">
                <Text text="404" className={cls.title} As="span" />
                <Text text={t('Page Not Found')} className={cls.text} />
                <AppLink to={getRoutePathMain()}>{t('Go Home')}</AppLink>
            </VStack>
        </Page>
    );
};
