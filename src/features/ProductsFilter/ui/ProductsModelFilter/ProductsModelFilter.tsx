import { Select, SelectItem } from 'shared/ui/DropdownsList/ui/Select/Select';
import { ReactNode, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useTranslation } from 'react-i18next';
import { productsFiltersActions } from '../../model/slice/ProductsFilterSlice';
import { getProductsFilterModel } from '../../model/selectors/getProductsFilterModel/getProductsFilterModel';

interface ProductsModelFilterProps {
    className?: string;
    onSend: () => void;
}

const models: SelectItem[] = [
    {
        value: 'Apple iPhone 15',
        content: 'Apple iPhone 15',
    },
];

export const ProductsModelFilter = (props: ProductsModelFilterProps) => {
    const { className, onSend } = props;
    const model = useSelector(getProductsFilterModel);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

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
            items={models}
            defaultValue={t('Model')}
            className={className}
        />
    );
};
