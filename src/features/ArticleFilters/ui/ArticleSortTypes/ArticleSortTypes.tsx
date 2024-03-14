import { Select } from 'shared/ui/DropdownsList';
import { useCallback, useMemo } from 'react';
import { TabItem } from 'shared/ui/Tabs/Tabs';
import { ArticleType } from 'entities/Article';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useTranslation } from 'react-i18next';
import { articleFiltersActions } from '../../model/slice/articleFiltersSlice';
import { getArticleFiltersType } from '../../model/selectors/getArticleFiltersType/getArticleFiltersType';

interface ArticleSortTypesProps {
    className?: string;
    onSend: () => void;
}

export const ArticleSortTypes = (props: ArticleSortTypesProps) => {
    const { className, onSend } = props;
    const { t } = useTranslation();
    const type = useSelector(getArticleFiltersType);
    const dispatch = useAppDispatch();
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

    const onChangeTypes = useCallback(
        (value: string) => {
            dispatch(articleFiltersActions.setType(value as ArticleType));
            onSend();
        },
        [dispatch, onSend],
    );

    return (
        <Select
            value={type}
            onChange={onChangeTypes}
            items={sortTypesOptions}
            defaultValue={type !== ArticleType.ALL ? type : t('Categories')}
            className={className}
        />
    );
};
