import { ArticleListItem, ArticleListItemSkeleton } from 'entities/Article';
import { useSelector } from 'react-redux';
import { Virtuoso, VirtuosoGrid } from 'react-virtuoso';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ViewType } from 'shared/const/types';
import { fetchArticleNextPage } from '../../model/services/fetchArticleNextPage/fetchArticleNextPage';
import { getArticles } from '../../model/slice/articlesPageSlice';
import { getArticleListIsLoading } from '../../model/selectors/getArticleListIsLoading/getArticleListIsLoading';
import { getArticleListError } from '../../model/selectors/getArticleListError/getArticleListError';
import { getArticleListView } from '../../model/selectors/getArticleListView/getArticleListView';
import cls from './ArticlesInfiniteList.module.scss';

interface ArticlesInfiniteListProps {
    className?: string;
}

export const ArticlesInfiniteList = (props: ArticlesInfiniteListProps) => {
    const { className } = props;
    const articles = useSelector(getArticles.selectAll);
    const articlesLength = useSelector(getArticles.selectTotal);
    const isLoading = useSelector(getArticleListIsLoading);
    const error = useSelector(getArticleListError);
    const view = useSelector(getArticleListView);
    const dispatch = useAppDispatch();

    const onLoadNextPart = () => {
        dispatch(fetchArticleNextPage());
    };

    if (view === ViewType.BIG) {
        return (
            <Virtuoso
                useWindowScroll
                totalCount={articlesLength}
                data={articles}
                endReached={onLoadNextPart}
                components={{
                    ScrollSeekPlaceholder: () => (
                        <ArticleListItemSkeleton view={ViewType.BIG} />
                    ),
                }}
                itemContent={(index) => (
                    <ArticleListItem
                        article={articles[index]}
                        view={ViewType.BIG}
                        className={cls.bigCard}
                        index={index}
                    />
                )}
                scrollSeekConfiguration={{
                    enter: (velocity) => Math.abs(velocity) > 200,
                    exit: (velocity) => Math.abs(velocity) < 50,
                }}
            />
        );
    }

    return (
        <VirtuosoGrid
            useWindowScroll
            totalCount={articlesLength}
            data={articles}
            endReached={onLoadNextPart}
            components={{
                ScrollSeekPlaceholder: () => (
                    <ArticleListItemSkeleton view={ViewType.SMALL} />
                ),
            }}
            listClassName={cls.wrapper}
            itemContent={(index) => (
                <ArticleListItem
                    article={articles[index]}
                    view={ViewType.SMALL}
                    className={cls.bigCard}
                    index={index}
                />
            )}
            scrollSeekConfiguration={{
                enter: (velocity) => Math.abs(velocity) > 200,
                exit: (velocity) => Math.abs(velocity) < 50,
            }}
        />
    );
};
