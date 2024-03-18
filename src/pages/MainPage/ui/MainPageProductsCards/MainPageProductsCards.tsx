import { classNames } from 'shared/lib/classNames/classNames';
import { Slider } from 'shared/ui/Slider/Slider';
import { VStack } from 'shared/ui/Stack';
import { useTranslation } from 'react-i18next';
import { getRoutePathProducts } from 'shared/const/router';
import { Product, ProductCategory } from 'entities/Product/model/product';
import { SwiperSlide } from 'swiper/react';
import { ProductCard } from 'entities/Product/ui/ProductCard/ProductCard';
import { ViewType } from 'shared/const/types';
import { MainPageCardsSlider } from 'pages/MainPage/ui/MainPageCardsSlider/MainPageCardsSlider';
import { Article } from 'entities/Article';
import { ArticleListItem } from 'entities/Article/ui/ArticleListItem/ArticleListItem';
import { useGetMainBlockPage } from '../../model/api/mainPageApi';
import { MainPageCardHeader } from '../MainPageCardHeader/MainPageCardHeader';
import {
    breakpointsMainPageCards,
    MainPageApiArg,
} from '../../model/types/cardBlocks';

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
                {(product) => (
                    <ProductCard product={product} view={ViewType.SMALL} />
                )}
            </MainPageCardsSlider>
        </VStack>
    );
};
