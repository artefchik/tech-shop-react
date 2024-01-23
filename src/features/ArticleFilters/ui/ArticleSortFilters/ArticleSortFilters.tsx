import { classNames } from 'shared/lib/classNames/classNames';
import { useMemo } from 'react';
import cls from './ArticleSortFilters.module.scss';

interface ArticleSortFiltersProps {
    className?: string;
}

export const ArticleSortFilters = (props: ArticleSortFiltersProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.ArticleSortFilters, {}, [className])}>
            ArticleSortFilters
        </div>
    );
};
