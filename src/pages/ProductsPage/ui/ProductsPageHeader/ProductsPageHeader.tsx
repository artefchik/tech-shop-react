import { classNames } from 'shared/lib/classNames/classNames';
import { HStack } from 'shared/ui/Stack';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { ProductsFilter } from 'features/ProductsFilter/ui/ProductsFilter/ProductsFilter';
import { ProductsViewSelector } from 'pages/ProductsPage/ui/ProductsViewSelector/ui/ProductsViewSelector';
import { ProductsCategories } from 'shared/const/types';
import { memo, useCallback } from 'react';
import cls from './ProductsPageHeader.module.scss';

interface ProductsPageHeaderProps {
    className?: string;
    category?: string;
}

const toUpperCaseFirstLetter = (str: string) =>
    str[0].toUpperCase() + str.slice(1);

export const ProductsPageHeader = memo((props: ProductsPageHeaderProps) => {
    const { className, category = 'Products' } = props;

    const renderTitle = useCallback(() => {
        switch (category) {
            case ProductsCategories.ALL:
                return `${toUpperCaseFirstLetter(ProductsCategories.ALL)}Products`;
            case ProductsCategories.PC:
                return toUpperCaseFirstLetter(ProductsCategories.PC);
            case ProductsCategories.PHONE:
                return toUpperCaseFirstLetter(ProductsCategories.PHONE);
            case ProductsCategories.ACCESSORIES:
                return toUpperCaseFirstLetter(ProductsCategories.ACCESSORIES);

            default:
                return toUpperCaseFirstLetter(category);
        }
    }, [category]);

    return (
        <HStack
            align="center"
            justify="between"
            gap="15"
            className={classNames(cls.ProductsPageHeader, {}, [className])}
        >
            <Text title={renderTitle()} theme={TextTheme.HEADER} />
            <HStack align="center" gap="15">
                <ProductsFilter />
                <ProductsViewSelector />
            </HStack>
        </HStack>
    );
});
