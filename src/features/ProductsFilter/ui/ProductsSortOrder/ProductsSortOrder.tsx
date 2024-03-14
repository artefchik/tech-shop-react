import { Select } from 'shared/ui/DropdownsList/ui/Select/Select';
import { useCallback } from 'react';
import { SortOrder } from 'shared/const/types';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { sortOrderOptions } from 'shared/const/order';
import { useTranslation } from 'react-i18next';
import { productsFiltersActions } from '../../model/slice/ProductsFilterSlice';
import { getProductsFilterOrder } from '../../model/selectors/getProductsFilterOrder/getProductsFilterOrder';
import { sortProducts } from '../../model/types/sortProducts';

interface ProductsSortOrderProps {
    className?: string;
    onSend: () => void;
}

export const ProductsSortOrder = (props: ProductsSortOrderProps) => {
    const { className, onSend } = props;
    const order = useSelector(getProductsFilterOrder);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const onChangeOrder = useCallback(
        (value: string) => {
            dispatch(productsFiltersActions.setOrder(value as SortOrder));
            onSend();
        },
        [dispatch, onSend],
    );

    return (
        <Select
            value={order}
            onChange={onChangeOrder}
            items={sortProducts}
            defaultValue={t('Sort by')}
            className={className}
        />
    );
};
