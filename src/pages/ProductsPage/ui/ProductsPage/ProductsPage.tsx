import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'shared/ui/Page/Page';
import { Container } from 'shared/ui/Container/Container';
import { useInView } from 'react-intersection-observer';
import { productsPageReducer } from 'pages/ProductsPage/model/slice/productsPageSlice';
import { useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchProductsList } from 'pages/ProductsPage/model/services/fetchProductsList/fetchProductsList';
import { useParams } from 'react-router-dom';
import { ProductsPageInfiniteList } from 'pages/ProductsPage/ui/ProductsPageInfiniteList/ProductsPageInfiniteList';
import { ProductsPageHeader } from 'pages/ProductsPage/ui/ProductsPageHeader/ProductsPageHeader';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
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

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page
                // triggerRef={ref}
                // onScrollEnd={}
                className={classNames(cls.ProductsPage, {}, [className])}
            >
                <Container>
                    <ProductsPageHeader category={category} className={cls.header} />
                    <ProductsPageInfiniteList category={category} />
                </Container>
            </Page>
        </DynamicModuleLoader>
    );
};

export default ProductsPage;
