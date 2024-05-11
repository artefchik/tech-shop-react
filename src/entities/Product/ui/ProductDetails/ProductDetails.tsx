import { classNames } from 'shared/lib/classNames/classNames';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from 'shared/ui/Card/Card';
import { HStack, VStack } from 'shared/ui/Stack';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { AppImage } from 'shared/ui/AppImage/AppImage';
import { formatToCurrency } from 'shared/lib/helpers/formatToCurrency';
import { Product } from 'entities/Product';
import { NotFoundImage } from 'shared/ui/NotFoundImage/NotFoundImage';
import { EmptySearch } from 'shared/ui/EmptySearch/EmptySearch';
import { getRoutePathProducts } from 'shared/const/router';
import { ProductDetailsSkeleton } from '../ProductDetails/ProductDetailsSkeleton';
import cls from './ProductDetails.module.scss';

interface ProductDetailsProps {
    className?: string;
    product?: Product;
    children?: ReactNode;
    isLoading?: boolean;
    error?: boolean;
}

export const ProductDetails = (props: ProductDetailsProps) => {
    const { className, product, error = false, children, isLoading } = props;
    const { t } = useTranslation();

    let content;

    if (isLoading) {
        content = <ProductDetailsSkeleton />;
    } else if (error) {
        content = (
            <EmptySearch
                text={t('Product not found')}
                to={getRoutePathProducts()}
                labelLink={t('All products')}
            />
        );
    } else {
        content = (
            <VStack gap="10">
                <Text size={TextSize.LARGE} text={product?.title} As="h3" />
                <Card
                    className={classNames(cls.ProductDetails, {}, [className])}
                >
                    <div className={cls.bodyImage}>
                        <AppImage
                            src={product?.imageSrc}
                            className={cls.image}
                            errorFallback={<NotFoundImage />}
                        />
                    </div>
                    <VStack gap="25" className={cls.content}>
                        <HStack align="center" gap="10">
                            <Text
                                size={TextSize.BIG}
                                text={formatToCurrency(
                                    product?.price.current ?? 0,
                                )}
                                As="span"
                            />
                            <Text
                                size={TextSize.BIG}
                                theme={TextTheme.SECONDARY}
                                text={formatToCurrency(
                                    product?.price.previous ?? 0,
                                )}
                                className={cls.prevPrice}
                                As="span"
                            />
                        </HStack>
                        <VStack gap="15">
                            <HStack gap="20">
                                <Text text={t('Brand')} />
                                <Text text={product?.brand} As="span" />
                            </HStack>
                            <HStack gap="20">
                                <Text text={t('Color')} />
                                <Text text={product?.color} As="span" />
                            </HStack>
                            <HStack gap="20">
                                <Text text={t('Memory')} />
                                <Text text={product?.memory} As="span" />
                            </HStack>
                        </VStack>
                        <div className={cls.buttons}>{children}</div>
                    </VStack>
                </Card>
            </VStack>
        );
    }

    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{content}</>;
};
