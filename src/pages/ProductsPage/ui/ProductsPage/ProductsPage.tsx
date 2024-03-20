import { Page } from 'shared/ui/Page/Page';
import { Container } from 'shared/ui/Container/Container';
import { useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useParams, useSearchParams } from 'react-router-dom';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ProductsCategories, ViewType } from 'shared/const/types';
import { isMobile } from 'react-device-detect';
import { initProductsPage } from '../../model/services/initProductsPage/initProductsPage';
import { ProductsPageInfiniteList } from '../ProductsPageInfiniteList/ProductsPageInfiniteList';
import { ProductsPageHeader } from '../ProductsPageHeader/ProductsPageHeader';
import {
    productsPageActions,
    productsPageReducer,
} from '../../model/slice/productsPageSlice';
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
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        dispatch(
            productsPageActions.setCategory(category as ProductsCategories),
        );
    }, [category, dispatch]);

    useEffect(() => {
        dispatch(initProductsPage(searchParams));
    }, [dispatch, searchParams]);

    useEffect(() => {
        if (isMobile) {
            dispatch(productsPageActions.setView(ViewType.SMALL));
        }
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <Page isBottomPadding>
                <Container>
                    <ProductsPageHeader
                        category={category}
                        className={cls.header}
                    />
                    <ProductsPageInfiniteList />
                </Container>
            </Page>
        </DynamicModuleLoader>
    );
};

export default ProductsPage;
