import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ProductsCartPage.module.scss';

interface ProductsCartPageProps {
    className?: string;
}

const ProductsCartPage = (props: ProductsCartPageProps) => {
    const { className } = props;
    return (
        <div className={classNames(cls.ProductsCartPage, {}, [className])}>
            ProductsCartPage
        </div>
    );
};
export default ProductsCartPage;
