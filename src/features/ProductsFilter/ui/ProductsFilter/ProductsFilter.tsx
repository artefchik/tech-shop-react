import { classNames } from 'shared/lib/classNames/classNames';
import { Popover } from 'shared/ui/DropdownsList';
import filter from 'shared/assets/icons/filters.svg';
import { ArticleSortTypes } from 'features/ArticleFilters/ui/ArticleSortTypes/ArticleSortTypes';
import { ArticleSortFilters } from 'features/ArticleFilters/ui/ArticleSortFilters/ArticleSortFilters';
import { ArticleSortOrder } from 'features/ArticleFilters/ui/ArticleSortOrder/ArticleSortOrder';
import cls from './ProductsFilter.module.scss';

interface ProductsFilterProps {
    className?: string;
}

export const ProductsFilter = ({ className }: ProductsFilterProps) => (
    <Popover
        title="Фильтры"
        icon={filter}
        openView="bottomLeft"
        className={className}
    >
        hfhhfhhf
    </Popover>
);
