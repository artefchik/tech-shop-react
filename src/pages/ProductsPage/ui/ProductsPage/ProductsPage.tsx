import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'shared/ui/Page/Page';
import { Container } from 'shared/ui/Container/Container';
import { useInView } from 'react-intersection-observer';
import { productsPageReducer } from 'pages/ProductsPage/model/slice/productsPageSlice';
import { useCallback, useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchProductsList } from 'pages/ProductsPage/model/services/fetchProductsList/fetchProductsList';
import { useParams } from 'react-router-dom';
import { ProductsPageInfiniteList } from 'pages/ProductsPage/ui/ProductsPageInfiniteList/ProductsPageInfiniteList';
import { ProductsPageHeader } from 'pages/ProductsPage/ui/ProductsPageHeader/ProductsPageHeader';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { fetchProductsNextPage } from 'pages/ProductsPage/model/services/fetchProductsNextPage/fetchProductsNextPage';
import { initArticlePage } from 'pages/ArticlesPage/model/services/initArticlePage/initArticlePage';
import { initProductsPage } from 'pages/ProductsPage/model/services/initProductsPage/initProductsPage';
import cls from './ProductsPage.module.scss';

interface ProductsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    productsPage: productsPageReducer,
};
const ProductsPage = (props: ProductsPageProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const { category } = useParams<{ category: string }>();

    const { ref, inView } = useInView({
        threshold: 1,
    });

    const onLoadNextPage = useCallback(() => {
        if (inView) {
            dispatch(fetchProductsNextPage());
        }
    }, [dispatch, inView]);

    useEffect(() => {
        dispatch(initProductsPage());
    }, [category, dispatch]);
    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page
                triggerRef={ref}
                onScrollEnd={onLoadNextPage}
                className={classNames(cls.ProductsPage, {}, [className])}
            >
                <Container>
                    <ProductsPageHeader category={category} className={cls.header} />
                    <ProductsPageInfiniteList />
                </Container>
            </Page>
        </DynamicModuleLoader>
    );
};

export default ProductsPage;
