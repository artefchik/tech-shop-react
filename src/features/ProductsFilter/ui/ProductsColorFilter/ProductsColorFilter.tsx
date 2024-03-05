import { Select } from 'shared/ui/DropdownsList/ui/Select/Select';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { productsFiltersActions } from '../../model/slice/ProductsFilterSlice';
import { getProductsFilterColor } from '../../model/selectors/getProductsFilterColor/getProductsFilterColor';

interface ProductsModelFilterProps {
    className?: string;
    onSend: () => void;
}

export const ProductsColorFilter = (props: ProductsModelFilterProps) => {
    const { className, onSend } = props;
    const color = useSelector(getProductsFilterColor);
    const dispatch = useAppDispatch();

    const onChangeColor = useCallback(
        (value: string) => {
            dispatch(productsFiltersActions.setColor(value));
            onSend();
        },
        [dispatch, onSend],
    );

    return (
        <Select
            value={color}
            onChange={onChangeColor}
            items={[]}
            defaultValue="Цвет ..."
            className={className}
        />
    );
};
