import { classNames } from 'shared/lib/classNames/classNames';
import support from 'shared/assets/icons/support.svg';
import user from 'shared/assets/icons/user.svg';
import priceTag from 'shared/assets/icons/price-tag.svg';
import { Container } from 'shared/ui/Container/Container';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { AdvantagesItem } from '../AdvantagesItem/AdvantagesItem';
import cls from './AdvantagesItemList.module.scss';
import { Advantages } from '../../model/types/advantages';

interface AdvantagesItemListProps {
    className?: string;
}

export const AdvantagesItemList = (props: AdvantagesItemListProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const advantagesItems = useMemo<Advantages[]>(
        () => [
            {
                icon: support,
                title: t('Product Support'),
                text: t('advantages-text-2'),
            },
            {
                icon: user,
                title: t('Personal Account'),
                text: t('advantages-text-1'),
            },

            {
                icon: priceTag,
                title: t('Amazing Savings'),
                text: t('advantages-text-3'),
            },
        ],
        [t],
    );

    return (
        <div className={classNames(cls.AdvantagesItemList, {}, [className])}>
            <Container>
                {advantagesItems.map((advantages, index) => (
                    <AdvantagesItem
                        advantages={advantages}
                        key={index}
                        className={cls.item}
                    />
                ))}
            </Container>
        </div>
    );
};
