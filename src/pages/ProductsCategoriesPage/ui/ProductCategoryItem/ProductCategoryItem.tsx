import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextAlign, TextSize } from 'shared/ui/Text/Text';
import { Card } from 'shared/ui/Card/Card';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { ProductsCategoriesItem } from '../../model/types/categories';
import cls from './ProductCategoryItem.module.scss';

interface ProductCategoryItemProps {
    className?: string;
    category: ProductsCategoriesItem;
}

export const ProductCategoryItem = (props: ProductCategoryItemProps) => {
    const { className, category } = props;
    const navigate = useNavigate();

    const openProducts = useCallback(() => {
        navigate(category.link);
    }, [category.link, navigate]);

    return (
        <Card
            As="article"
            className={classNames(cls.ProductCategoryItem, {}, [className])}
            onClick={openProducts}
        >
            <div className={cls.image}>
                <img src={category.image} alt={category.title} />
            </div>
            <Text
                text={category.title}
                align={TextAlign.CENTER}
                size={TextSize.BIG}
                As="h5"
            />
        </Card>
    );
};
