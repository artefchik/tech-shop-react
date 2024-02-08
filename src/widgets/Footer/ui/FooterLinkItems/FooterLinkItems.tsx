import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import { VStack } from 'shared/ui/Stack';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import cls from './FooterLinkItems.module.scss';
import { FooterLinkType } from '../../model/types/footer';

interface FooterLinkItemProps {
    className?: string;
    links: FooterLinkType[];
}

export const FooterLinkItems = (props: FooterLinkItemProps) => {
    const { className, links } = props;
    return (
        <VStack gap="10">
            {links.map((link) => (
                <AppLink
                    key={link.path}
                    theme={AppLinkTheme.BASE}
                    to={link.path}
                >
                    {link.title}
                </AppLink>
            ))}
        </VStack>
    );
};
