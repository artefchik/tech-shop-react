import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleListItemSkeleton } from 'entities/Article/ui/ArticleListItem/ArticleListItemSkeleton';
import { ArticleListItem } from 'entities/Article/ui/ArticleListItem/ArticleListItem';
import { memo } from 'react';
import { Article, ArticleView } from '../../model/types/article';
import cls from './ArticleList.module.scss';

interface ArticleListProps {
    className?: string;
    view?:ArticleView;
    isLoading?:boolean;
    articles:Article[]
}

const getSkeletons = (view:ArticleView) => new Array(view === ArticleView.BIG ? 3 : 6)
    .fill(0)
    .map((item, index) => <ArticleListItemSkeleton key={index} view={view} />);

export const ArticleList = memo((props: ArticleListProps) => {
    const {
        className,
        isLoading,
        articles,
        view = ArticleView.SMALL,
    } = props;
    return (
        <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
            {
                articles.length > 0 && articles.map((article) => (
                    <ArticleListItem
                        key={article.id}
                        article={article}
                        view={view}
                    />
                ))
            }
            {isLoading && getSkeletons(view)}
        </div>
    );
});
