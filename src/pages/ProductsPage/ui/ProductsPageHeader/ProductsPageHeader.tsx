import { classNames } from 'shared/lib/classNames/classNames';
import { HStack, VStack } from 'shared/ui/Stack';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { ProductsFilter } from 'features/ProductsFilter/ui/ProductsFilter/ProductsFilter';
import { ProductsCategories } from 'shared/const/types';
import { memo, useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useTranslation } from 'react-i18next';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { getRoutePathProducts } from 'shared/const/router';
import arrow from 'shared/assets/icons/arrowRight.svg';
import { Icon } from 'shared/ui/Icon/Icon';
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
        <VStack gap="10">
            <HStack gap="10" className={cls.backLink}>
                <Icon Svg={arrow} hover={false} />
                <AppLink theme={AppLinkTheme.CLEAR} to={getRoutePathProducts()}>
                    {t('Back')}
                </AppLink>
            </HStack>
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
        </VStack>
    );
});
