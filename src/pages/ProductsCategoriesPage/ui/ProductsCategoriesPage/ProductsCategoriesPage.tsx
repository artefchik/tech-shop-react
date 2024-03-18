import { classNames } from 'shared/lib/classNames/classNames';

import { Page } from 'shared/ui/Page/Page';
import { Container } from 'shared/ui/Container/Container';
import { ProductCategoryItem } from '../ProductCategoryItem/ProductCategoryItem';
import cls from './ProductsCategoriesPage.module.scss';
import { productsCategoriesList } from '../../model/types/categories';

interface ProductsCategoriesProps {
    className?: string;
}

const ProductsCategoriesPage = (props: ProductsCategoriesProps) => {
    const { className } = props;

    return (
        <Page
            isBottomPadding
            className={classNames(cls.ProductsCategoriesPage, {}, [className])}
        >
            <Container className={cls.body}>
                {productsCategoriesList.map((productCategory) => (
                    <ProductCategoryItem
                        category={productCategory}
                        key={productCategory.link}
                    />
                ))}
            </Container>
        </Page>
    );
};

export default ProductsCategoriesPage;
