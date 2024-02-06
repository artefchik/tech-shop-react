import { classNames } from 'shared/lib/classNames/classNames';
import { HStack, VStack } from 'shared/ui/Stack';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { Card } from 'shared/ui/Card/Card';
import { Input } from 'shared/ui/Input/Input';
import { Button } from 'shared/ui/Button/Button';
import { FooterLinkItem } from '../FooterLinkItem/FooterLinkItem';
import {
    footerCategoryLinksList,
    footerLinksList,
} from '../../model/types/footer';
import cls from './FooterTop.module.scss';

interface FooterTopProps {
    className?: string;
}

export const FooterTop = ({ className }: FooterTopProps) => (
    <HStack className={classNames(cls.FooterTop, {}, [className])}>
        <VStack className={cls.links} gap="25">
            <VStack gap="10">
                <Text title="About" />
                <Text
                    className={cls.infoText}
                    theme={TextTheme.SMALL}
                    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
                />
            </VStack>
            <VStack gap="15">
                <HStack align="center" gap="5">
                    <Text title="Email:" theme={TextTheme.SMALL} />
                    <AppLink theme={AppLinkTheme.BASE} to="info@gmail.com">
                        artemadeev42@gmail.com
                    </AppLink>
                </HStack>
                <HStack align="center" gap="5">
                    <Text title="Phone:" theme={TextTheme.SMALL} />
                    <AppLink theme={AppLinkTheme.BASE} to="tell:+88007553555">
                        88007553555
                    </AppLink>
                </HStack>
            </VStack>
        </VStack>
        <HStack className={cls.links} justify="center" gap="30">
            <FooterLinkItem links={footerLinksList} title="Quick Link" />
            <FooterLinkItem
                links={footerCategoryLinksList}
                title="Categories"
            />
        </HStack>
        <Card className={cls.form}>
            <VStack gap="20" className={cls.bodyForm} justify="between" width>
                <Text
                    align={TextAlign.CENTER}
                    title="Weekly Newsletter"
                    text="Get blog articles and offers via email"
                />
                <VStack gap="10">
                    <Input placeholder="Your Email" />
                    <Button>Subscribe</Button>
                </VStack>
            </VStack>
        </Card>
    </HStack>
);
