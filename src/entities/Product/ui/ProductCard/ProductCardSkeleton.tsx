import { classNames } from 'shared/lib/classNames/classNames';
import { HStack, VStack } from 'shared/ui/Stack';
import { Card } from 'shared/ui/Card/Card';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import cls from './ProductCard.module.scss';

interface ProductItemSkeletonProps {
    className?: string;
}

export const ProductCardSkeleton = (props: ProductItemSkeletonProps) => {
    const { className } = props;
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
};
