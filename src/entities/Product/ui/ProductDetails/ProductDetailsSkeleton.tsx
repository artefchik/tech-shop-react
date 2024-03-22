import { HStack, VStack } from 'shared/ui/Stack';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Card } from 'shared/ui/Card/Card';
import cls from './ProductDetails.module.scss';

interface ProductDetailsSkeletonProps {
    className?: string;
}

export const ProductDetailsSkeleton = ({
    className,
}: ProductDetailsSkeletonProps) => (
    <VStack gap="10">
        <Skeleton width="100%" height={42} />
        <Card>
            <HStack className={cls.ProductDetails}>
                <div className={cls.bodyImage}>
                    <Skeleton className={cls.image} />
                </div>
                <VStack gap="25">
                    <Skeleton width="40%" height={32} />
                    <VStack gap="15">
                        <Skeleton width="50%" height={32} />
                        <Skeleton width="50%" height={32} />
                        <Skeleton width="50%" height={32} />
                    </VStack>
                    <Skeleton width="100%" height={40} />
                </VStack>
            </HStack>
        </Card>
    </VStack>
);
