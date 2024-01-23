import { classNames } from 'shared/lib/classNames/classNames';
import { Card } from 'shared/ui/Card/Card';
import { Input } from 'shared/ui/Input/Input';
import {
    memo, ReactNode, useCallback, useMemo,
} from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { DynamicModelLoader } from 'shared/lib/components/DynamicModelLoader/DynamicModelLoader';
import { Select } from 'shared/ui/Select/Select';
import { ArticleSortOrder } from 'features/ArticleFilters/ui/ArticleSortOrder/ArticleSortOrder';
import { BsFilterRight } from 'react-icons/bs';
import { SortOrder } from 'shared/const/types';
import {
    getArticleFiltersSort,
} from '../../model/selectors/getArticleFiltersSort/getArticleFiltersSort';
import { ArticleTypeTabs } from '../../ui/ArticleTypeTabs/ArticleTypeTabs';
import { getArticleFiltersSearch } from '../../model/selectors/getArticleFiltersSearch/getArticleFiltersSearch';
import { articleFiltersActions, articleFiltersReducer } from '../../model/slice/articleFiltersSlice';
import cls from './ArticleFilters.module.scss';
import { ArticleSortField } from '../../model/types/filters';

interface ArticleFiltersProps {
  className?: string;
  fetchData: () => void;
}

export enum SortItemValueType {
  SORT_FIELD='SortField',
  SortOrder = 'SortOrder',
}
interface SortOption {
  value: ArticleSortField;
  content: ReactNode;
}

interface SortItem {
  value:SortItemValueType;
  content:ReactNode
}

export const ArticleFilters = memo((props: ArticleFiltersProps) => {
    const { className, fetchData } = props;
    const search = useSelector(getArticleFiltersSearch);
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

    // const sortOptions = useMemo<SortItem[]>(() => [
    //     {
    //         value: ,
    //         content: <ArticleSortOrder onSend={fetchData} />,
    //     },
    // ], [fetchData]);

    const onChangeSearch = useCallback((value: string) => {
        dispatch(articleFiltersActions.setSearch(value));
        fetchData();
    }, [dispatch, fetchData]);

    const onChangeSortField = useCallback((value: string) => {
        dispatch(articleFiltersActions.setSort(value as ArticleSortField));
        fetchData();
    }, [dispatch, fetchData]);
    return (
        <DynamicModelLoader name="articleFilters" reducer={articleFiltersReducer}>
            <Card className={classNames(cls.ArticleFilters, {}, [className])}>
                <Input value={search} onChange={onChangeSearch} placeholder="Поиск" />
                <ArticleTypeTabs fetchData={fetchData} />
                <Select
                    value={sort}
                    onChange={onChangeSortField}
                    items={sortFieldOptions}
                    defaultValue="сортировать по"
                />

                {/* <Select */}
                {/*    items={sortOptions} */}
                {/*    defaultValue="Фильтры" */}
                {/*    Icon={BsFilterRight} */}
                {/* /> */}

            </Card>
        </DynamicModelLoader>
    );
});
