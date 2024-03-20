import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { ViewType } from 'shared/const/types';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import cls from './ArticleList.module.scss';

interface ArticleListSkeletonProps {
    className?: string;
    view: ViewType;
}

export const ArticleListSkeleton = memo((props: ArticleListSkeletonProps) => {
    const { className, view = ViewType.SMALL } = props;
    return (
        <div
            className={classNames(cls.ArticleList, {}, [className, cls[view]])}
        >
            {new Array(view === ViewType.BIG ? 3 : 6)
                .fill(0)
                .map((_, index) => (
                    <ArticleListItemSkeleton view={view} key={index} />
                ))}
        </div>
    );
});
