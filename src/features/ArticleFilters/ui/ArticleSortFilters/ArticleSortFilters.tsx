import { classNames } from 'shared/lib/classNames/classNames';
import { Select } from 'shared/ui/DropdownsList';
import { useSelector } from 'react-redux';
import {
    getArticleFiltersSort,
} from 'features/ArticleFilters/model/selectors/getArticleFiltersSort/getArticleFiltersSort';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ReactNode, useCallback, useMemo } from 'react';
import { ArticleSortField } from 'features/ArticleFilters';
import { articleFiltersActions } from 'features/ArticleFilters/model/slice/articleFiltersSlice';

interface ArticleSortFiltersProps {
    className?: string;
    onSend:()=>void
}

interface SortOption {
    value: ArticleSortField;
    content: ReactNode;
}

export const ArticleSortFilters = (props: ArticleSortFiltersProps) => {
    const { className, onSend } = props;
    const sort = useSelector(getArticleFiltersSort);
    const dispatch = useAppDispatch();

    const sortFieldOptions = useMemo<SortOption[]>(
        () => [
            {
                value: ArticleSortField.CREATED,
                content: 'по дате создания',
            },
            {
                value: ArticleSortField.TITLE,
                content: 'по заголовку',
            },
            {
                value: ArticleSortField.VIEW,
                content: 'по просмотрам',
            },
        ],

        [],
    );
    const onChangeSortField = useCallback((value: string) => {
        dispatch(articleFiltersActions.setSort(value as ArticleSortField));
        onSend();
    }, [dispatch, onSend]);

    return (
        <Select
            value={sort}
            onChange={onChangeSortField}
            items={sortFieldOptions}
            defaultValue="Фильтровать ..."
            className={className}
        />

    );
};
