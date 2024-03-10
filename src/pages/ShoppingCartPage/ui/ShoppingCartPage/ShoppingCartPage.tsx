import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'shared/ui/Page/Page';
import { Container } from 'shared/ui/Container/Container';
import { ShoppingCartList } from 'pages/ShoppingCartPage/ui/ShoppingCartList/ShoppingCartList';
import { ShoppingCartHeaderPage } from 'pages/ShoppingCartPage/ui/ShoppingCartHeaderPage/ShoppingCartHeaderPage';
import { ShoppingCartTotalSummary } from 'pages/ShoppingCartPage/ui/ShoppingCartTotalSummary/ShoppingCartTotalSummary';
import { VStack } from 'shared/ui/Stack';
import { useSelector } from 'react-redux';
import { CartPageIsEmpty } from 'pages/ShoppingCartPage/ui/CartPageIsEmpty/CartPageIsEmpty';
import { getCartProducts } from 'features/CartProduct/model/slice/cartProductsSlice';
import cls from './ShoppingCartPage.module.scss';

interface ProductsCartPageProps {
    className?: string;
}

const ShoppingCartPage = (props: ProductsCartPageProps) => {
    const { className } = props;
    const totalCart = useSelector(getCartProducts.selectTotal);

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
