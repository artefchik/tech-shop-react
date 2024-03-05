import { Select } from 'shared/ui/DropdownsList/ui/Select/Select';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { productsFiltersActions } from '../../model/slice/ProductsFilterSlice';
import { getProductsFilterBrand } from '../../model/selectors/getProductsFilterBrand/getProductsFilterBrand';

interface ProductsBrandFilterProps {
    className?: string;
    onSend: () => void;
}

export const ProductsBrandFilter = (props: ProductsBrandFilterProps) => {
    const { className, onSend } = props;
    const brand = useSelector(getProductsFilterBrand);
    const dispatch = useAppDispatch();

    const onChangeBrand = useCallback(
        (value: string) => {
            dispatch(productsFiltersActions.setBrand(value));
            onSend();
        },
        [dispatch, onSend],
    );

    return (
        <Select
            value={brand}
            onChange={onChangeBrand}
            items={[]}
            defaultValue="Бренд ..."
            className={className}
        />
    );
};
