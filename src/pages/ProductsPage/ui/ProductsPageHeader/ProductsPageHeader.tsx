import { classNames } from 'shared/lib/classNames/classNames';
import { HStack } from 'shared/ui/Stack';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { ProductsFilter } from 'features/ProductsFilter/ui/ProductsFilter/ProductsFilter';
import { ProductsViewSelector } from 'pages/ProductsPage/ui/ProductsViewSelector/ui/ProductsViewSelector';
import cls from './ProductsPageHeader.module.scss';

interface ProductsPageHeaderProps {
    className?: string;
}

export const ProductsPageHeader = (props: ProductsPageHeaderProps) => {
    const { className } = props;
    return (
        <HStack
            align="center"
            justify="between"
            gap="15"
            className={classNames(cls.ProductsPageHeader, {}, [className])}
        >
            <Text title="Products" theme={TextTheme.HEADER} />
            <HStack align="center" gap="15">
                <ProductsFilter />
                <ProductsViewSelector />
            </HStack>
        </HStack>
    );
};
