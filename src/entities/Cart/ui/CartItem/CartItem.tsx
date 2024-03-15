import { classNames } from 'shared/lib/classNames/classNames';
import { Card } from 'shared/ui/Card/Card';
import { HStack } from 'shared/ui/Stack';
import { Text } from 'shared/ui/Text/Text';
import { memo, ReactNode } from 'react';
import { formatToCurrency } from 'shared/lib/helpers/formatToCurrency';
import { AppImage } from 'shared/ui/AppImage/AppImage';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { NotFoundImage } from 'shared/ui/NotFoundImage/NotFoundImage';
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
            <HStack align="center" gap="10">
                <div className={cls.image}>
                    <AppImage
                        fallback={<Skeleton height="100%" />}
                        errorFallback={<NotFoundImage className={cls.image} />}
                        src={__API__ + product.imageSrc}
                        alt={product.title}
                    />
                </div>
                <HStack
                    gap="15"
                    justify="between"
                    width
                    align="center"
                    className={cls.content}
                >
                    <Text text={product.title} />
                    <Text text={formatToCurrency(product.price.current)} />
                    <HStack gap="20" align="center" className={cls.actions}>
                        {counter && counter}
                        {deleteButton && deleteButton}
                    </HStack>
                </HStack>
            </HStack>
        </Card>
    );
});
