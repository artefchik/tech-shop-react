import { Select } from 'shared/ui/DropdownsList/ui/Select/Select';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useTranslation } from 'react-i18next';
import { ProductsCategories } from 'shared/const/types';
import { productsFiltersActions } from '../../model/slice/ProductsFilterSlice';
import { getProductsFilterColor } from '../../model/selectors/getProductsFilterColor/getProductsFilterColor';
import { pcColors, phoneColors, productColors } from '../../model/types/productsColors';

interface ProductsModelFilterProps {
    className?: string;
    onSend: () => void;
    category?: string;
}

export const ProductsColorFilter = (props: ProductsModelFilterProps) => {
    const { className, onSend, category } = props;
    const color = useSelector(getProductsFilterColor);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    const colorItems = useCallback(() => {
        switch (category) {
            case ProductsCategories.ALL:
                return productColors;
            case ProductsCategories.PC:
                return pcColors;
            case ProductsCategories.PHONE:
                return phoneColors;
            default:
                return productColors;
        }
    }, [category]);

    const onChangeColor = useCallback(
        (value: string) => {
            dispatch(productsFiltersActions.setColor(value));
            onSend();
        },
        [dispatch, onSend],
    );

    const onClearColor = useCallback(() => {
        dispatch(productsFiltersActions.setColor(''));
        onSend();
    }, [dispatch, onSend]);

    return (
        <Select
            value={color}
            onChange={onChangeColor}
            items={colorItems()}
            defaultValue={color || t('Color')}
            className={className}
            onClearValue={onClearColor}
        />
    );
};
