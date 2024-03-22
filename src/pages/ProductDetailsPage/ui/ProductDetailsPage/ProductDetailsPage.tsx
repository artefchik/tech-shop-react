import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'shared/ui/Page/Page';
import { Container } from 'shared/ui/Container/Container';
import { ProductDetails, productDetailsReducer } from 'entities/Product';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useParams } from 'react-router-dom';
import { ProductDetailsCard } from 'widgets/ProductDetailsCard/ui/ProductDetailsCard';
import { AdvantagesItemList } from 'widgets/Advantages';
import cls from './ProductDetailsPage.module.scss';

interface ProductDetailsPageProps {
    className?: string;
}
const reducers: ReducersList = {
    productDetails: productDetailsReducer,
};

const ProductDetailsPage = (props: ProductDetailsPageProps) => {
    const { className } = props;
    const { id } = useParams<{ id: string }>();
    if (!id) {
        return null;
    }
    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page
                className={classNames(cls.ProductDetailsPage, {}, [className])}
            >
                <Container>
                    <ProductDetailsCard productId={id} />
                </Container>
            </Page>
            <AdvantagesItemList />
        </DynamicModuleLoader>
    );
};

export default ProductDetailsPage;
