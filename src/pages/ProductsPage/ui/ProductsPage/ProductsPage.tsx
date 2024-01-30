import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'shared/ui/Page/Page';
import { Container } from 'shared/ui/Container/Container';
import { useInView } from 'react-intersection-observer';
import { ProductList } from 'entities/Product/ui/ProductList/ProductList';
import cls from './ProductsPage.module.scss';

interface ProductsPageProps {
    className?: string;
}

const ProductsPage = (props: ProductsPageProps) => {
    const { className } = props;
    const { ref, inView } = useInView({
        threshold: 1,
    });
    return (
        <Page
            // triggerRef={ref}
            // onScrollEnd={}
            className={classNames(cls.ProductsPage, {}, [className])}
        >
            <Container>
                l{/* {products && ( */}
                {/*    <ProductList products={products} isLoading={isLoading} /> */}
                {/* )} */}
            </Container>
        </Page>
    );
};

export default ProductsPage;
