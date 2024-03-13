import { classNames } from 'shared/lib/classNames/classNames';
import { HStack } from 'shared/ui/Stack';
import support from 'shared/assets/icons/support.svg';
import user from 'shared/assets/icons/user.svg';
import priceTag from 'shared/assets/icons/price-tag.svg';
import { Container } from 'shared/ui/Container/Container';
import { AdvantagesItem } from '../AdvantagesItem/AdvantagesItem';
import cls from './AdvantagesItemList.module.scss';
import { Advantages } from '../../model/types/advantages';

interface AdvantagesItemListProps {
    className?: string;
}

export const AdvantagesItemList = (props: AdvantagesItemListProps) => {
    const { className } = props;

    const advantagesItems: Advantages[] = [
        {
            icon: support,
            title: 'Product Support',
            text: 'Up to 3 years on-site warranty available for your peace of mind.',
        },
        {
            icon: user,
            title: 'Personal Account',
            text: 'With big discounts, free delivery and a dedicated support specialist.',
        },
        {
            icon: priceTag,
            title: 'Amazing Savings',
            text: 'Up to 70% off new Products, you can be sure of the best price.',
        },
    ];

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
