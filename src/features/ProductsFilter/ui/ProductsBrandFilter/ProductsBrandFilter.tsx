import { Select, SelectItem } from 'shared/ui/DropdownsList/ui/Select/Select';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useTranslation } from 'react-i18next';
import { productsFiltersActions } from '../../model/slice/ProductsFilterSlice';
import { getProductsFilterBrand } from '../../model/selectors/getProductsFilterBrand/getProductsFilterBrand';

interface ProductsBrandFilterProps {
    className?: string;
    onSend: () => void;
}

const brands: SelectItem[] = [
    {
        value: 'Apple',
        content: 'Apple',
    },
];

export const ProductsBrandFilter = (props: ProductsBrandFilterProps) => {
    const { className, onSend } = props;
    const brand = useSelector(getProductsFilterBrand);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const onChangeBrand = useCallback(
        (value: string) => {
            dispatch(productsFiltersActions.setBrand(value));
            onSend();
        },
        [dispatch, onSend],
    );

    const onClearBrand = useCallback(() => {
        dispatch(productsFiltersActions.setBrand(''));
        onSend();
    }, [dispatch, onSend]);

    return (
        <Select
            value={brand}
            onChange={onChangeBrand}
            items={brands}
            defaultValue={brand || t('Brand')}
            className={className}
            onClearValue={onClearBrand}
        />
    );
};
