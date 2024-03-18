import { ArticleListItem } from 'entities/Article';
import { useSelector } from 'react-redux';
import { Virtuoso, VirtuosoGrid, VirtuosoGridHandle } from 'react-virtuoso';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ViewType } from 'shared/const/types';
import { ArticleListItemSkeleton } from 'entities/Article/ui/ArticleListItem/ArticleListItemSkeleton';
import { useEffect, useRef, useState } from 'react';
import { ARTICLE_ITEM_ID_LOCALSTORAGE_KEY } from 'shared/const/localStorage';
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
    const virtuosoGridRef = useRef<VirtuosoGridHandle>(null);
    const [selectedArticleId, setSelectedArticleId] = useState(0);

    useEffect(() => {
        const articleListId =
            sessionStorage.getItem(ARTICLE_ITEM_ID_LOCALSTORAGE_KEY) || 0;
        setSelectedArticleId(Number(articleListId));
    }, []);

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (view === ViewType.BIG) {
            timeout = setTimeout(() => {
                if (virtuosoGridRef.current) {
                    virtuosoGridRef.current.scrollToIndex(selectedArticleId);
                }
            }, 400);
        }

        return () => clearTimeout(timeout);
    }, [selectedArticleId, view]);

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
                initialTopMostItemIndex={selectedArticleId}
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
            ref={virtuosoGridRef}
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
