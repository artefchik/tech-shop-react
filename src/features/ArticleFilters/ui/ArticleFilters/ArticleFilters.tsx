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
import { Popover } from 'shared/ui/Popover/Popover';
import { TabItem } from 'shared/ui/Tabs/Tabs';
import { ArticleType } from 'entities/Article';
import { getArticleFiltersType } from 'features/ArticleFilters';
import {
    getArticleFiltersSort,
} from '../../model/selectors/getArticleFiltersSort/getArticleFiltersSort';
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
  SORT_ORDER = 'SortOrder',
  SORT_TYPE = 'SortType'
}
interface SortOption {
  value: ArticleSortField;
  content: ReactNode;
}

interface PopoverItem {
  value:SortItemValueType;
  content:ReactNode
}

export const ArticleFilters = memo((props: ArticleFiltersProps) => {
    const { className, fetchData } = props;
    const search = useSelector(getArticleFiltersSearch);
    const type = useSelector(getArticleFiltersType);
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

    const onChangeSearch = useCallback((value: string) => {
        dispatch(articleFiltersActions.setSearch(value));
        fetchData();
    }, [dispatch, fetchData]);

    const onChangeSortField = useCallback((value: string) => {
        dispatch(articleFiltersActions.setSort(value as ArticleSortField));
        fetchData();
    }, [dispatch, fetchData]);
    const onChangeTypes = useCallback((value: string) => {
        dispatch(articleFiltersActions.setType(value as ArticleType));
        fetchData();
    }, [dispatch, fetchData]);

    const sortTypesOptions = useMemo<TabItem[]>(
        () => [
            {
                value: ArticleType.ALL,
                content: 'Все статьи',
            },
            {
                value: ArticleType.SCIENCE,
                content: 'Наука',
            },
            {
                value: ArticleType.IT,
                content: 'IT',
            },
            {
                value: ArticleType.POLITICS,
                content: 'Политика',
            },
        ],
        [],
    );

    const popoverItems = useMemo<PopoverItem[]>(() => [

        {
            value: SortItemValueType.SORT_FIELD,
            content: <Select
                value={sort}
                onChange={onChangeSortField}
                items={sortFieldOptions}
                defaultValue="Фильтровать ..."
            />,
        },
        {
            value: SortItemValueType.SORT_TYPE,
            content: <Select
                value={type}
                onChange={onChangeTypes}
                items={sortTypesOptions}
                defaultValue="Категории"
            />,
        },
        {
            value: SortItemValueType.SORT_FIELD,
            content: <ArticleSortOrder onSend={fetchData} />,
        },
    ], [fetchData, onChangeSortField, onChangeTypes, sort, sortFieldOptions, sortTypesOptions, type]);

    return (
        <DynamicModelLoader name="articleFilters" reducer={articleFiltersReducer}>
            <Card className={classNames(cls.ArticleFilters, {}, [className])}>
                <Input value={search} onChange={onChangeSearch} placeholder="Поиск" />
                <Popover items={popoverItems} title="Фильтры" Icon={BsFilterRight} />
            </Card>
        </DynamicModelLoader>
    );
});
