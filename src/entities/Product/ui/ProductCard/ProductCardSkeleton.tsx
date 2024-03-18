import { classNames } from 'shared/lib/classNames/classNames';
import { HStack, VStack } from 'shared/ui/Stack';
import { Card } from 'shared/ui/Card/Card';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { ViewType } from 'shared/const/types';
import { memo } from 'react';
import cls from './ProductCard.module.scss';

interface ProductItemSkeletonProps {
    className?: string;
    view: ViewType;
}

export const ProductCardSkeleton = memo((props: ProductItemSkeletonProps) => {
    const { className, view } = props;

    if (view === ViewType.SMALL) {
        return (
            <Card className={classNames(cls.ProductCard, {}, [className])}>
                <VStack gap="15">
                    <Skeleton width="100%" height={200} />
                    <VStack gap="10">
                        <Skeleton width="100%" height={20} />
                        <Skeleton width="100%" height={20} />
                        <HStack align="center" gap="15">
                            <Skeleton width="40" height={22} />
                            <Skeleton width="40" height={22} />
                        </HStack>
                        <Skeleton width="100%" height={40} />
                    </VStack>
                </VStack>
            </Card>
        );
    }

    return (
        <Card>
            <HStack gap="15">
                <Skeleton
                    height={255}
                    width={230}
                    className={cls.skeletonImage}
                />
                <VStack gap="20" width>
                    <Skeleton height={32} width="100%" />
                    <Skeleton height="100%" width="100%" />
                </VStack>
                <VStack className={cls.actionsBlock} gap="20">
                    <Skeleton height={22} />
                    <HStack gap="20">
                        <Skeleton height={40} width={160} />
                        <Skeleton height={40} width={40} />
                    </HStack>
                </VStack>
            </HStack>
        </Card>
    );
});
