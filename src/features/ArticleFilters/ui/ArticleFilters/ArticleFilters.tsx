import { memo } from 'react';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Popover } from 'shared/ui/DropdownsList/ui/Popover/Popover';
import filter from 'shared/assets/icons/filters.svg';
import { useTranslation } from 'react-i18next';
import { ArticleSortOrder } from '../../ui/ArticleSortOrder/ArticleSortOrder';
import { ArticleSortFilters } from '../../ui/ArticleSortFilters/ArticleSortFilters';
import { ArticleSortTypes } from '../../ui/ArticleSortTypes/ArticleSortTypes';
import { articleFiltersReducer } from '../../model/slice/articleFiltersSlice';

interface ArticleFiltersProps {
    className?: string;
    fetchData: () => void;
}

const reducers: ReducersList = {
    articleFilters: articleFiltersReducer,
};

export const ArticleFilters = memo((props: ArticleFiltersProps) => {
    const { className, fetchData } = props;
    const { t } = useTranslation();
    return (
        <DynamicModuleLoader reducers={reducers}>
            <Popover
                title={t('Filters')}
                icon={filter}
                openView="bottomLeft"
                className={className}
            >
                <ArticleSortTypes onSend={fetchData} />
                <ArticleSortFilters onSend={fetchData} />
                <ArticleSortOrder onSend={fetchData} />
            </Popover>
        </DynamicModuleLoader>
    );
});
