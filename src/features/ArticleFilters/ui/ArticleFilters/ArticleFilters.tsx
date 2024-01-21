import { classNames } from 'shared/lib/classNames/classNames';
import { Card } from 'shared/ui/Card/Card';
import { Input } from 'shared/ui/Input/Input';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { DynamicModelLoader } from 'shared/lib/components/DynamicModelLoader/DynamicModelLoader';
import { ArticleTypeTabs } from 'features/ArticleFilters/ui/ArticleTypeTabs/ArticleTypeTabs';
import {
    getArticleFiltersSearch,
} from '../../model/selectors/getArticleFiltersSearch/getArticleFiltersSearch';
import { articleFiltersActions, articleFiltersReducer } from '../../model/slice/articleFiltersSlice';
import cls from './ArticleFilters.module.scss';

interface ArticleFiltersProps {
    className?: string;
    fetchData:()=>void
}

export const ArticleFilters = memo((props: ArticleFiltersProps) => {
    const { className, fetchData } = props;
    const search = useSelector(getArticleFiltersSearch);
    const dispatch = useAppDispatch();
    const onChangeSearch = useCallback((value:string) => {
        dispatch(articleFiltersActions.setSearch(value));
        fetchData();
    }, [dispatch, fetchData]);
    return (
        <DynamicModelLoader name="articleFilters" reducer={articleFiltersReducer}>
            <Card className={classNames(cls.ArticleFilters, {}, [className])}>
                <Input value={search} onChange={onChangeSearch} placeholder="Поиск" />
                <ArticleTypeTabs fetchData={fetchData} />
            </Card>
        </DynamicModelLoader>
    );
});
