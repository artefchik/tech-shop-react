import { Page } from 'shared/ui/Page/Page';
import { Container } from 'shared/ui/Container/Container';
import { productDetailsReducer } from 'entities/Product';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useParams } from 'react-router-dom';
import { AdvantagesItemList } from 'widgets/Advantages';
import { ProductDetailsCard } from 'widgets/ProductDetailsCard';

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
            <Page>
                <Container>
                    <ProductDetailsCard productId={id} />
                </Container>
            </Page>
            <AdvantagesItemList />
        </DynamicModuleLoader>
    );
};

export default ProductDetailsPage;
