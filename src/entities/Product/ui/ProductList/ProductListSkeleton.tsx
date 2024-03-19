import { ViewType } from 'shared/const/types';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ProductList.module.scss';
import { ProductCardSkeleton } from '../ProductCard/ProductCardSkeleton';

interface ProductListSkeletonProps {
    className?: string;
    view: ViewType;
}

export const ProductListSkeleton = (props: ProductListSkeletonProps) => {
    const { className, view } = props;
    return (
        <div
            className={classNames(cls.ProductList, {}, [className, cls[view]])}
        >
            {new Array(view === ViewType.SMALL ? 6 : 3)
                .fill(0)
                .map((item, index) => (
                    <ProductCardSkeleton key={index} view={view} />
                ))}
        </div>
    );
};
