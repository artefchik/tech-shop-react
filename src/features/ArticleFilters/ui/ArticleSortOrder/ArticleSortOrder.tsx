import { Select } from 'shared/ui/DropdownsList/ui/Select/Select';
import { ReactNode, useCallback, useMemo } from 'react';
import { SortOrder } from 'shared/const/types';
import { useSelector } from 'react-redux';
import { getArticleFiltersOrder } from 'features/ArticleFilters';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { articleFiltersActions } from 'features/ArticleFilters/model/slice/articleFiltersSlice';

interface ArticleSortOrderProps {
    className?: string;
    onSend:()=>void
}

interface SortOrderOption {
    value:SortOrder;
    content:ReactNode
}

export const ArticleSortOrder = (props: ArticleSortOrderProps) => {
    const { className, onSend } = props;
    const order = useSelector(getArticleFiltersOrder);
    const dispatch = useAppDispatch();

    const onChangeOrder = useCallback((value:string) => {
        dispatch(articleFiltersActions.setOrder(value as SortOrder));
        onSend();
    }, [dispatch, onSend]);

    const sortOrderOptions = useMemo<SortOrderOption[]>(
        () => [
            {
                value: SortOrder.ASK,
                content: 'по возрастанию',
            },
            {
                value: SortOrder.DESK,
                content: 'по убыванию',
            },
        ],

        [],
    );

    return (
        <Select
            value={order}
            onChange={onChangeOrder}
            items={sortOrderOptions}
            defaultValue="Сортировка"
            className={className}
        />
    );
};
