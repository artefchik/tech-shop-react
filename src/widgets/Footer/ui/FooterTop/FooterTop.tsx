import { classNames } from 'shared/lib/classNames/classNames';
import { HStack, VStack } from 'shared/ui/Stack';
import { Text, TextAlign, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { Card } from 'shared/ui/Card/Card';
import { Input } from 'shared/ui/Input/Input';
import { Button } from 'shared/ui/Button/Button';
import { Spoller } from 'shared/ui/Spoller/Spoller';

import { useTranslation } from 'react-i18next';
import cls from './FooterTop.module.scss';
import { FooterLinkItems } from '../FooterLinkItems/FooterLinkItems';
import { footerCategoryLinksList, footerLinksList } from '../../model/types/footer';

interface FooterTopProps {
    className?: string;
}

export const FooterTop = ({ className }: FooterTopProps) => {
    const { t, i18n } = useTranslation();
    return (
        <HStack className={classNames(cls.FooterTop, {}, [className])}>
            <VStack className={cls.links} gap="25">
                <VStack gap="5">
                    <Text text="About" size={TextSize.BIG} />
                    <Text
                        className={cls.infoText}
                        size={TextSize.SMALL}
                        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
                    />
                </VStack>
                <VStack gap="15">
                    <HStack align="center" gap="5">
                        <Text text={`${t('Email')}:`} size={TextSize.SMALL} />
                        <AppLink theme={AppLinkTheme.BASE} to="info@gmail.com">
                            artemadeev42@gmail.com
                        </AppLink>
                    </HStack>
                    <HStack align="center" gap="5">
                        <Text text={`${t('Phone')}:`} size={TextSize.SMALL} />
                        <AppLink theme={AppLinkTheme.BASE} to="tell:+88007553555">
                            88007553555
                        </AppLink>
                    </HStack>
                </VStack>
            </VStack>
            <HStack className={cls.links} justify="center" gap="30">
                <Spoller
                    open
                    title={t('Links')}
                    content={<FooterLinkItems links={footerLinksList} />}
                />
                <Spoller
                    open
                    title={t('Categories')}
                    content={<FooterLinkItems links={footerCategoryLinksList} />}
                />
            </HStack>
            <Card className={cls.form}>
                <VStack gap="20" className={cls.bodyForm} justify="between" width>
                    <VStack align="center" gap="5">
                        <Text
                            align={TextAlign.CENTER}
                            size={TextSize.BIG}
                            text={t('Weekly Newsletter')}
                        />
                        <Text
                            align={TextAlign.CENTER}
                            theme={TextTheme.SECONDARY}
                            text={t('Get blog articles and offers via email')}
                        />
                    </VStack>
                    <VStack gap="10">
                        <Input placeholder={t('Email')} />
                        <Button>{t('Subscribe')}</Button>
                    </VStack>
                </VStack>
            </Card>
        </HStack>
    );
};
