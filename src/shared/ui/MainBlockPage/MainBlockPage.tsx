import { classNames } from 'shared/lib/classNames/classNames';
import { HStack, VStack } from 'shared/ui/Stack';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { ReactNode } from 'react';
import cls from './MainBlockPage.module.scss';

interface MainBlockPageProps {
    className?: string;
    title?: string;
    srcLink: string;
    ListBlock?: ReactNode;
}

export const MainBlockPage = (props: MainBlockPageProps) => {
    const { className, title, srcLink, ListBlock } = props;
    return (
        <VStack
            gap="15"
            className={classNames(cls.MainBlockPage, {}, [className])}
        >
            <HStack justify="between" align="center" gap="15">
                <Text title={title} theme={TextTheme.HEADER} />
                <AppLink theme={AppLinkTheme.SECONDARY} to={srcLink}>
                    См.все
                </AppLink>
            </HStack>
            {ListBlock && ListBlock}
        </VStack>
    );
};
