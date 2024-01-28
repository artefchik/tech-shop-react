import { Input } from 'shared/ui/Input/Input';
import { useCallback } from 'react';
import { articleFiltersActions, getArticleFiltersSearch } from 'features/ArticleFilters';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';

interface ArticleSearchProps {
    className?: string;
    onSend?:()=>void
}

export const ArticleSearch = (props: ArticleSearchProps) => {
    const { className, onSend } = props;
    const dispatch = useAppDispatch();
    const search = useSelector(getArticleFiltersSearch);
    const onChangeSearch = useCallback((value: string) => {
        dispatch(articleFiltersActions.setSearch(value));
        onSend?.();
    }, [dispatch, onSend]);
    return (
        <Input value={search} onChange={onChangeSearch} placeholder="Поиск по статьям" className={className} />
    );
};
