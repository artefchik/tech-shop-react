import {
    memo, ReactNode,
} from 'react';
import { DynamicModelLoader } from 'shared/lib/components/DynamicModelLoader/DynamicModelLoader';
import { Popover } from 'shared/ui/DropdownsList/ui/Popover/Popover';
import filter from 'shared/assets/icons/filters.svg';
import { ArticleSortOrder } from '../../ui/ArticleSortOrder/ArticleSortOrder';
import { ArticleSortFilters } from '../../ui/ArticleSortFilters/ArticleSortFilters';
import { ArticleSortTypes } from '../../ui/ArticleSortTypes/ArticleSortTypes';
import { articleFiltersReducer } from '../../model/slice/articleFiltersSlice';

interface ArticleFiltersProps {
  className?: string;
  fetchData: () => void;
}

export const ArticleFilters = memo((props: ArticleFiltersProps) => {
    const { className, fetchData } = props;

    return (
        <DynamicModelLoader name="articleFilters" reducer={articleFiltersReducer}>
            <Popover title="Фильтры" icon={filter} openView="bottomLeft" className={className}>
                <ArticleSortTypes onSend={fetchData} />
                <ArticleSortFilters onSend={fetchData} />
                <ArticleSortOrder onSend={fetchData} />
            </Popover>
        </DynamicModelLoader>
    );
});
