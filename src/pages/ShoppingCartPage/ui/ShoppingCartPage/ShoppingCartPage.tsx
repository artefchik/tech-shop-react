import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'shared/ui/Page/Page';
import { Container } from 'shared/ui/Container/Container';
import { ShoppingCartList } from 'pages/ShoppingCartPage/ui/ShoppingCartList/ShoppingCartList';
import { ShoppingCartHeaderPage } from 'pages/ShoppingCartPage/ui/ShoppingCartHeaderPage/ShoppingCartHeaderPage';
import { ShoppingCartTotalSummary } from 'pages/ShoppingCartPage/ui/ShoppingCartTotalSummary/ShoppingCartTotalSummary';
import cls from './ShoppingCartPage.module.scss';

interface ProductsCartPageProps {
    className?: string;
}

const ShoppingCartPage = (props: ProductsCartPageProps) => {
    const { className } = props;

    return (
        <Page className={classNames(cls.ShoppingCartPage, {}, [className])}>
            <Container>
                <ShoppingCartHeaderPage className={cls.header} />
                <ShoppingCartList className={cls.list} />
                <ShoppingCartTotalSummary />
            </Container>
        </Page>
    );
};
export default ShoppingCartPage;
