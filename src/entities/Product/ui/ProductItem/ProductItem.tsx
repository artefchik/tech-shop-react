import { classNames } from 'shared/lib/classNames/classNames';
import { Card } from 'shared/ui/Card/Card';
import { HStack, VStack } from 'shared/ui/Stack';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { memo, ReactNode } from 'react';
import { StarRating } from 'shared/ui/StarRating/StarRating';
import { formatToCurrency } from 'shared/lib/helpers/formatToCurrency';
import { ViewType } from 'shared/const/types';
import { Product } from '../../model/product';
import cls from './ProductItem.module.scss';

interface ProductItemProps {
    className?: string;
    product: Product;
    view: ViewType;
    AddToCartButton?: ReactNode;
    FavoriteButton?: ReactNode;
}

export const ProductItem = memo((props: ProductItemProps) => {
    const { className, product, view, AddToCartButton, FavoriteButton } = props;

    if (view === ViewType.SMALL) {
        return (
            <Card className={classNames(cls.ProductCard, {}, [className, cls[view]])}>
                <VStack gap="10" className={cls.body}>
                    <div className={cls.image}>
                        <img src={__API__ + product.imageSrc} alt={product.title} />
                        <div className={cls.favorites}>
                            {FavoriteButton && FavoriteButton}
                        </div>
                    </div>
                    <VStack className={cls.content}>
                        <StarRating selectedStars={product.starRating} />
                        <VStack gap="5">
                            <Text text={product.title} className={cls.title} />
                            <HStack align="center" gap="15">
                                <Text text={formatToCurrency(product.price.current)} />

                                <Text
                                    text={formatToCurrency(product.price.current)}
                                    className={cls.previousPrice}
                                    theme={TextTheme.SECONDARY}
                                />
                            </HStack>
                        </VStack>
                    </VStack>
                    {AddToCartButton}
                </VStack>
            </Card>
        );
    }

    return (
        <Card className={classNames(cls.ProductCard, {}, [className, cls[view]])}>
            <HStack gap="15" className={cls.card}>
                <VStack gap="15" className={cls.imageBlock}>
                    <div className={cls.image}>
                        <img src={__API__ + product.imageSrc} alt={product.title} />
                    </div>
                    <HStack justify="center" className={cls.rating}>
                        <StarRating selectedStars={product.starRating} />
                    </HStack>
                </VStack>
                <VStack className={cls.textBlock} gap="20">
                    <Text
                        text={product.title}
                        className={cls.title}
                        size={TextSize.BIG}
                    />
                    <HStack className={cls.block}>
                        <div className={cls.specifications}>specifications</div>
                    </HStack>
                </VStack>
                <VStack className={cls.actionsBlock} gap="20">
                    <HStack align="center" gap="15">
                        <Text text={formatToCurrency(product.price.current)} />

                        <Text
                            text={formatToCurrency(product.price.previous)}
                            className={cls.previousPrice}
                            theme={TextTheme.SECONDARY}
                        />
                    </HStack>
                    <HStack align="center" gap="20">
                        {AddToCartButton}
                        {FavoriteButton && FavoriteButton}
                    </HStack>
                </VStack>
            </HStack>
        </Card>
    );
});
