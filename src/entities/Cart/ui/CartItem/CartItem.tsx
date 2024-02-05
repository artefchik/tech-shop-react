import { classNames } from 'shared/lib/classNames/classNames';
import { Card } from 'shared/ui/Card/Card';
import { CartItemType } from 'entities/Cart/model/types/cart';
import { HStack } from 'shared/ui/Stack';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { memo, ReactNode } from 'react';
import cls from './CartItem.module.scss';

interface CartItemProps {
    className?: string;
    product: CartItemType;
    counter?: ReactNode;
    removeButton?: ReactNode;
}

export const CartItem = memo((props: CartItemProps) => {
    const { className, product, counter, removeButton } = props;

    return (
        <Card className={classNames(cls.CartItem, {}, [className])}>
            <HStack align="center" gap="5">
                <div className={cls.image}>
                    <img src={product.image} alt={product.title} />
                </div>
                <HStack
                    gap="15"
                    justify="between"
                    width
                    align="center"
                    className={cls.content}
                >
                    <Text title={product.title} />
                    <Text
                        text={String(product.price.current)}
                        theme={TextTheme.PRICE}
                    />
                    <HStack gap="20" align="center" className={cls.actions}>
                        {counter && counter}
                        {removeButton && removeButton}
                    </HStack>
                </HStack>
            </HStack>
        </Card>
    );
});
