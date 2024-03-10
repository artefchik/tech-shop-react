import { classNames } from 'shared/lib/classNames/classNames';
import { Slider } from 'shared/ui/Slider/Slider';
import { VStack } from 'shared/ui/Stack';
import { useTranslation } from 'react-i18next';
import { getRoutePathProducts } from 'shared/const/router';
import { ProductCategory } from 'entities/Product/model/product';
import { SwiperSlide } from 'swiper/react';
import { ProductItem } from 'entities/Product/ui/ProductItem/ProductItem';
import { ViewType } from 'shared/const/types';
import { useGetMainBlockPage } from '../../model/api/mainPageApi';
import { MainPageCardHeader } from '../MainPageCardHeader/MainPageCardHeader';
import { breakpointsMainPageCards, MainPageApiArg } from '../../model/types/cardBlocks';

interface MainPageProductsCardsProps {
    className?: string;
    category: ProductCategory;
}

export const MainPageProductsCards = (props: MainPageProductsCardsProps) => {
    const { className, category } = props;
    const { t } = useTranslation();

    const getParamsForFetch = (category: ProductCategory): MainPageApiArg => {
        switch (category) {
            case ProductCategory.PC:
                return {
                    limit: 10,
                    order: 'asc',
                    url: '/products',
                    category: 'pc',
                };
            case ProductCategory.PHONE:
                return {
                    limit: 10,
                    order: 'asc',
                    url: '/products',
                    category: 'phone',
                };
            default:
                return {
                    limit: 0,
                    order: '',
                    url: '',
                };
        }
    };

    const { data: products, isLoading } = useGetMainBlockPage(
        getParamsForFetch(category),
    );

    return (
        <VStack gap="15" As="section" className={className}>
            <MainPageCardHeader title={t('Products')} srcLink={getRoutePathProducts()} />
            <Slider
                breakpoints={breakpointsMainPageCards}
                spaceBetween={20}
                pagination={false}
            >
                {products &&
                    products.map((product) => (
                        <SwiperSlide key={product.id}>
                            <ProductItem product={product} view={ViewType.SMALL} />
                        </SwiperSlide>
                    ))}
            </Slider>
        </VStack>
    );
};
