import { classNames } from 'shared/lib/classNames/classNames';
import { HStack } from 'shared/ui/Stack';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { getRoutePathMain } from 'shared/const/router';
import Logo from 'shared/assets/icons/logo.svg';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { footerBottomLinksList } from '../../model/types/footer';
import cls from './FooterBottom.module.scss';

interface FooterBottomProps {
    className?: string;
}

export const FooterBottom = ({ className }: FooterBottomProps) => (
    <HStack
        className={classNames(cls.FooterBottom, {}, [className])}
        justify="between"
        align="center"
        gap="10"
    >
        <HStack align="center" gap="10">
            <AppLink
                to={getRoutePathMain()}
                className={cls.logo}
                theme={AppLinkTheme.CLEAR}
            >
                <Logo />
            </AppLink>
            <Text
                size={TextSize.SMALL}
                text="© React Tech Shop 2024. All Rights Reserved"
                theme={TextTheme.SECONDARY}
            />
        </HStack>
        <HStack align="center" gap="20">
            {footerBottomLinksList.map((item) => (
                <AppLink
                    className={cls.link}
                    theme={AppLinkTheme.BASE}
                    key={item.title}
                    to={item.path}
                >
                    {item.title}
                </AppLink>
            ))}
        </HStack>
    </HStack>
);
