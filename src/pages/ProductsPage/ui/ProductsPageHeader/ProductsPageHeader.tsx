import { classNames } from 'shared/lib/classNames/classNames';
import { HStack } from 'shared/ui/Stack';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { ProductsFilter } from 'features/ProductsFilter/ui/ProductsFilter/ProductsFilter';
import { ProductsCategories } from 'shared/const/types';
import { memo, useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useTranslation } from 'react-i18next';
import { ProductsCategoriesMap } from '../../model/types/productsCategories';
import { ProductsViewSelector } from '../ProductsViewSelector/ProductsViewSelector';
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
    const { t } = useTranslation();
    const renderTitle = useCallback(() => {
        switch (category) {
            case ProductsCategories.ALL:
                return t('All');
            case ProductsCategories.PC:
                return t('PC');
            case ProductsCategories.PHONE:
                return t('Phones');
            case ProductsCategories.ACCESSORIES:
                return t('Accessories');

            default:
                return ProductsCategoriesMap[ProductsCategories.ALL];
        }
    }, [category, t]);

    const fetchData = useCallback(() => {
        dispatch(productsPageActions.setPage(1));
        dispatch(fetchProductsList({ replace: true }));
    }, [dispatch]);

    return (
        <HStack
            align="center"
            justify="between"
            gap="15"
            className={classNames(cls.ProductsPageHeader, {}, [className])}
        >
            <Text text={renderTitle()} size={TextSize.LARGE} As="h3" />
            <HStack align="center" gap="15">
                <ProductsFilter
                    category={category}
                    className={cls.filters}
                    fetchData={fetchData}
                />
                <ProductsViewSelector />
            </HStack>
        </HStack>
    );
});
