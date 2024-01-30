import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ProductDetailsPage.module.scss';

interface ProductDetailsPageProps {
    className?: string;
}

const ProductDetailsPage = (props: ProductDetailsPageProps) => {
    const { className } = props;
    return (
        <div className={classNames(cls.ProductDetailsPage, {}, [className])}>
            ProductDetailsPage
        </div>
    );
};

export default ProductDetailsPage;
