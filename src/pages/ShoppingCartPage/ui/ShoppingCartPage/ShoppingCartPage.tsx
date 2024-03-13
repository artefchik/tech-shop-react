import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'shared/ui/Page/Page';
import { Container } from 'shared/ui/Container/Container';
import { VStack } from 'shared/ui/Stack';
import { useSelector } from 'react-redux';
import { fetchCartProductsList, getCartProductsTotal } from 'features/CartProduct';
import { useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { CartPageIsEmpty } from '../CartPageIsEmpty/CartPageIsEmpty';
import { ShoppingCartTotalSummary } from '../ShoppingCartTotalSummary/ShoppingCartTotalSummary';
import { ShoppingCartHeaderPage } from '../ShoppingCartHeaderPage/ShoppingCartHeaderPage';
import { ShoppingCartList } from '../ShoppingCartList/ShoppingCartList';
import cls from './ShoppingCartPage.module.scss';

interface ProductsCartPageProps {
    className?: string;
}

const ShoppingCartPage = (props: ProductsCartPageProps) => {
    const { className } = props;
    const totalCart = useSelector(getCartProductsTotal);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchCartProductsList());
    }, [dispatch]);

    return (
        <Page className={classNames(cls.ShoppingCartPage, {}, [className])}>
            <Container>
                {totalCart > 0 ? (
                    <VStack gap="20">
                        <ShoppingCartHeaderPage />
                        <ShoppingCartList />
                        <ShoppingCartTotalSummary />
                    </VStack>
                ) : (
                    <CartPageIsEmpty />
                )}
            </Container>
        </Page>
    );
};
export default ShoppingCartPage;
