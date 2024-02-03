import { classNames } from 'shared/lib/classNames/classNames';
import { Card } from 'shared/ui/Card/Card';
import { HStack, VStack } from 'shared/ui/Stack';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { Button } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import favorites from 'shared/assets/icons/favorites.svg';
import { memo, ReactNode, useState } from 'react';
import { ViewType } from 'shared/ui/ViewSelector/ViewSelector';
import { StarRating } from 'shared/ui/StarRating/StarRating';
import cartPlus from 'shared/assets/icons/cartPlus.svg';
import { Product } from '../../model/product';
import cls from './ProductItem.module.scss';

interface ProductItemProps {
    className?: string;
    product: Product;
    view: ViewType;
    AddToCartButton?: ReactNode;
}

export const ProductItem = memo((props: ProductItemProps) => {
    const { className, product, view, AddToCartButton } = props;

    if (view === ViewType.SMALL) {
        return (
            <Card
                className={classNames(cls.ProductCard, {}, [
                    className,
                    cls[view],
                ])}
            >
                <VStack gap="10">
                    <div className={cls.image}>
                        <img src={product.image} alt={product.title} />
                        <Icon
                            hover={false}
                            Svg={favorites}
                            className={cls.favorites}
                        />
                    </div>
                    <StarRating selectedStars={product.starRating} />
                    <VStack gap="10">
                        <Text
                            title={product.title}
                            theme={TextTheme.SMALL}
                            className={cls.title}
                        />
                        <HStack align="center" gap="15">
                            <Text
                                title={`${product.priceSymbol}${String(
                                    product.price.current,
                                )}`}
                                className={cls.currentPrice}
                                theme={TextTheme.PRICE}
                            />

                            <Text
                                text={`${product.priceSymbol}${String(
                                    product.price.previous,
                                )}`}
                                className={cls.previousPrice}
                                theme={TextTheme.SECONDARY}
                            />
                        </HStack>
                    </VStack>
                    {AddToCartButton}
                </VStack>
            </Card>
        );
    }

    return (
        <Card
            className={classNames(cls.ProductCard, {}, [className, cls[view]])}
        >
            <HStack gap="15" className={cls.card}>
                <VStack gap="15" className={cls.imageBlock}>
                    <div className={cls.image}>
                        <img src={product.image} alt={product.title} />
                    </div>
                    <HStack justify="center" className={cls.rating}>
                        <StarRating selectedStars={product.starRating} />
                    </HStack>
                </VStack>
                <VStack className={cls.textBlock} gap="20">
                    <Text
                        title={product.title}
                        className={cls.title}
                        theme={TextTheme.SECONDARY}
                    />
                    <HStack className={cls.block}>
                        <div className={cls.specifications}>specifications</div>
                    </HStack>
                </VStack>
                <VStack className={cls.actionsBlock} gap="20">
                    <HStack align="center" gap="15">
                        <Text
                            title={`${product.priceSymbol}${String(
                                product.price.current,
                            )}`}
                            className={cls.currentPrice}
                            theme={TextTheme.SECONDARY}
                        />

                        <Text
                            text={`${product.priceSymbol}${String(
                                product.price.previous,
                            )}`}
                            className={cls.previousPrice}
                            theme={TextTheme.SECONDARY}
                        />
                    </HStack>
                    <HStack align="center" gap="20">
                        {AddToCartButton}
                        <Icon
                            hover={false}
                            Svg={favorites}
                            className={cls.favorites}
                        />
                    </HStack>
                </VStack>
            </HStack>
        </Card>
    );
});
