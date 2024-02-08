import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleListItemSkeleton } from 'entities/Article/ui/ArticleListItem/ArticleListItemSkeleton';
import { ArticleListItem } from 'entities/Article/ui/ArticleListItem/ArticleListItem';
import { memo } from 'react';
import { ViewType } from 'shared/ui/ViewSelector/ViewSelector';
import { Article, ArticleView } from '../../model/types/article';
import cls from './ArticleList.module.scss';

interface ArticleListProps {
    className?: string;
    view?: ViewType;
    isLoading?: boolean;
    articles: Article[];
}

const getSkeletons = (view: ViewType) =>
    new Array(view === ViewType.BIG ? 3 : 6)
        .fill(0)
        .map((item, index) => (
            <ArticleListItemSkeleton key={index} view={view} />
        ));

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
            {articles.length > 0
                ? articles.map((article) => (
                      <ArticleListItem
                          key={article.id}
                          article={article}
                          view={view}
                      />
                  ))
                : null}
            {isLoading && getSkeletons(view)}
        </div>
    );
});
