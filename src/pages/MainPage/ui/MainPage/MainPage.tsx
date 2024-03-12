import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'shared/ui/Page/Page';
import { Container } from 'shared/ui/Container/Container';
import { VStack } from 'shared/ui/Stack';
import { MainPageProductsCards } from 'pages/MainPage/ui/MainPageProductsCards/MainPageProductsCards';
import { ProductCategory } from 'entities/Product/model/product';
import { useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchProductsFavorites } from 'features/ProductFavoriteButton/model/services/fetchProductsFavorites/fetchProductsFavorites';
import { AdvantagesItemList } from 'widgets/Advantages';
import cls from './MainPage.module.scss';
import { MainSliderPage } from '../../ui/MainSliderPage/MainSliderPage';

interface MainPageProps {
    className?: string;
}

const MainPage = (props: MainPageProps) => {
    const { className } = props;

    return (
        <Page className={classNames(cls.MainPage, {}, [className])}>
            <Container className={cls.container}>
                <VStack gap="20">
                    <MainSliderPage />
                    <MainPageProductsCards category={ProductCategory.PHONE} />
                </VStack>
            </Container>
            <AdvantagesItemList />
        </Page>
    );
};
export default MainPage;
