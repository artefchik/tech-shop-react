import { Select } from 'shared/ui/DropdownsList/ui/Select/Select';
import { ReactNode, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { productsFiltersActions } from '../../model/slice/ProductsFilterSlice';
import { getProductsFilterModel } from '../../model/selectors/getProductsFilterModel/getProductsFilterModel';

interface ProductsModelFilterProps {
    className?: string;
    onSend: () => void;
}

export const ProductsModelFilter = (props: ProductsModelFilterProps) => {
    const { className, onSend } = props;
    const model = useSelector(getProductsFilterModel);
    const dispatch = useAppDispatch();

    const onChangeModel = useCallback(
        (value: string) => {
            dispatch(productsFiltersActions.setModel(value));
            onSend();
        },
        [dispatch, onSend],
    );

    return (
        <Select
            value={model}
            onChange={onChangeModel}
            items={[]}
            defaultValue="Модель ..."
            className={className}
        />
    );
};
