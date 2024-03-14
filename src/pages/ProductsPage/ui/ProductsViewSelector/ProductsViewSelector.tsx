import { memo, useCallback } from 'react';
import { ViewSelector } from 'shared/ui/ViewSelector/ViewSelector';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ViewType } from 'shared/const/types';
import { getProductsPageView } from '../../model/selectors/getProductsPageView/getProductsPageView';
import { productsPageActions } from '../../model/slice/productsPageSlice';

interface ProductsViewSelectorProps {
    className?: string;
}

export const ProductsViewSelector = memo((props: ProductsViewSelectorProps) => {
    const { className } = props;

    const view = useSelector(getProductsPageView);
    const dispatch = useAppDispatch();

    const onChangeView = useCallback(
        (view: ViewType) => {
            dispatch(productsPageActions.setView(view));
        },
        [dispatch],
    );

    return <ViewSelector view={view} onViewClick={onChangeView} className={className} />;
});
