import { VStack } from 'shared/ui/Stack';
import { useTranslation } from 'react-i18next';
import { getRoutePathProducts } from 'shared/const/router';
import { Product, ProductCategory } from 'entities/Product/model/types/product';
import { ViewType } from 'shared/const/types';
import { ProductCard, ProductCardSkeleton } from 'entities/Product';
import { ProductFavoriteButton } from 'features/ProductFavoriteButton';
import { MainPageCardsSlider } from '../MainPageCardsSlider/MainPageCardsSlider';
import { useGetMainBlockPage } from '../../model/api/mainPageApi';
import { MainPageCardHeader } from '../MainPageCardHeader/MainPageCardHeader';

interface MainPageProductsCardsProps {
    className?: string;
}

export const MainPageProductsCards = (props: MainPageProductsCardsProps) => {
    const { className } = props;
    const { t } = useTranslation();

    const { data: products, isLoading } = useGetMainBlockPage({
        limit: 10,
        order: 'asc',
        url: '/products',
        category: '',
    });

    return (
        <VStack gap="15" As="section" className={className}>
            <MainPageCardHeader
                title={t('Products')}
                srcLink={getRoutePathProducts()}
            />
            <MainPageCardsSlider<Product> data={products}>
                {(product) =>
                    isLoading ? (
                        <ProductCardSkeleton view={ViewType.SMALL} />
                    ) : (
                        <ProductCard
                            FavoriteButton={
                                <ProductFavoriteButton productId={product.id} />
                            }
                            product={product}
                            view={ViewType.SMALL}
                        />
                    )
                }
            </MainPageCardsSlider>
        </VStack>
    );
};
