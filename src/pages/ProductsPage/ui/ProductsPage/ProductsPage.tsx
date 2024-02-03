import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'shared/ui/Page/Page';
import { Container } from 'shared/ui/Container/Container';
import { useInView } from 'react-intersection-observer';
import { DynamicModelLoader } from 'shared/lib/components/DynamicModelLoader/DynamicModelLoader';
import { productsPageReducer } from 'pages/ProductsPage/model/slice/productsPageSlice';
import { ProductsPageInfiniteList } from 'pages/ProductsPage/ui/ProductsPageInfiniteList/ProductsPageInfiniteList';
import { useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchProductsList } from 'pages/ProductsPage/model/services/fetchProductsList/fetchProductsList';
import { useSelector } from 'react-redux';
import { getCart } from 'entities/Cart/model/slice/cartSlice';
import cls from './ProductsPage.module.scss';
import { ProductsPageHeader } from '../ProductsPageHeader/ProductsPageHeader';

interface ProductsPageProps {
    className?: string;
}

const ProductsPage = (props: ProductsPageProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();

    const { ref, inView } = useInView({
        threshold: 1,
    });

    useEffect(() => {
        dispatch(fetchProductsList({}));
    }, [dispatch]);

    return (
        <DynamicModelLoader name="productsPage" reducer={productsPageReducer}>
            <Page
                // triggerRef={ref}
                // onScrollEnd={}
                className={classNames(cls.ProductsPage, {}, [className])}
            >
                <Container>
                    {/* {products && ( */}
                    {/*    <ProductList products={products} isLoading={isLoading} /> */}
                    {/* )} */}
                    <ProductsPageHeader className={cls.header} />
                    <ProductsPageInfiniteList />
                </Container>
            </Page>
        </DynamicModelLoader>
    );
};

export default ProductsPage;
