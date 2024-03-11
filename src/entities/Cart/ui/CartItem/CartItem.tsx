import { classNames } from 'shared/lib/classNames/classNames';
import { Card } from 'shared/ui/Card/Card';
import { HStack } from 'shared/ui/Stack';
import { Text } from 'shared/ui/Text/Text';
import { memo, ReactNode } from 'react';
import cls from './CartItem.module.scss';
import { CartItemType } from '../../model/types/cart';

interface CartItemProps {
    className?: string;
    product: CartItemType;
    counter?: ReactNode;
    deleteButton?: ReactNode;
}

export const CartItem = memo((props: CartItemProps) => {
    const { className, product, counter, deleteButton } = props;

    return (
        <Card className={classNames(cls.CartItem, {}, [className])}>
            <HStack align="center" gap="5">
                <div className={cls.image}>
                    <img src={product.imageSrc} alt={product.title} />
                </div>
                <HStack
                    gap="15"
                    justify="between"
                    width
                    align="center"
                    className={cls.content}
                >
                    <Text text={product.title} />
                    <Text text={String(product.price.current)} />
                    <HStack gap="20" align="center" className={cls.actions}>
                        {counter && counter}
                        {deleteButton && deleteButton}
                    </HStack>
                </HStack>
            </HStack>
        </Card>
    );
});
