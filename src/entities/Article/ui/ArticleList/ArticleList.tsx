import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { ViewType } from 'shared/const/types';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { Article } from '../../model/types/article';
import cls from './ArticleList.module.scss';

interface ArticleListProps {
    className?: string;
    view?: ViewType;
    isLoading?: boolean;
    articles?: Article[];
}

export const ArticleList = memo((props: ArticleListProps) => {
    const {
        className,
        isLoading,
        articles = [],
        view = ViewType.SMALL,
    } = props;
    return (
        <div
            className={classNames(cls.ArticleList, {}, [className, cls[view]])}
        >
            {articles.length > 0 &&
                articles.map((article) => (
                    <ArticleListItem
                        key={article.id}
                        article={article}
                        view={view}
                    />
                ))}
        </div>
    );
});
