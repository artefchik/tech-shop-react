import { classNames } from 'shared/lib/classNames/classNames';
import { HStack } from 'shared/ui/Stack';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { ProductsFilter } from 'features/ProductsFilter/ui/ProductsFilter/ProductsFilter';
import { ProductsCategories } from 'shared/const/types';
import { memo, useCallback } from 'react';
import { ProductsCategoriesMap } from 'pages/ProductsPage/model/types/productsCategories';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ProductsViewSelector } from '../ProductsViewSelector/ui/ProductsViewSelector';
import { fetchProductsList } from '../../model/services/fetchProductsList/fetchProductsList';
import cls from './ProductsPageHeader.module.scss';
import { productsPageActions } from '../../model/slice/productsPageSlice';

interface ProductsPageHeaderProps {
    className?: string;
    category?: string;
}

export const ProductsPageHeader = memo((props: ProductsPageHeaderProps) => {
    const { className, category = 'Products' } = props;
    const dispatch = useAppDispatch();
    const renderTitle = useCallback(() => {
        switch (category) {
            case ProductsCategories.ALL:
                return ProductsCategoriesMap[ProductsCategories.ALL];
            case ProductsCategories.PC:
                return ProductsCategoriesMap[ProductsCategories.PC];
            case ProductsCategories.PHONE:
                return ProductsCategoriesMap[ProductsCategories.PHONE];
            case ProductsCategories.ACCESSORIES:
                return ProductsCategoriesMap[ProductsCategories.ACCESSORIES];

            default:
                return ProductsCategoriesMap[ProductsCategories.ALL];
        }
    }, [category]);

    const fetchData = useCallback(() => {
        dispatch(productsPageActions.setPage(1));
        dispatch(fetchProductsList({ replace: true }));
    }, [category, dispatch]);
    return (
        <HStack
            align="center"
            justify="between"
            gap="15"
            className={classNames(cls.ProductsPageHeader, {}, [className])}
        >
            <Text text={renderTitle()} size={TextSize.LARGE} />
            <HStack align="center" gap="15">
                <ProductsFilter fetchData={fetchData} />
                <ProductsViewSelector />
            </HStack>
        </HStack>
    );
});
