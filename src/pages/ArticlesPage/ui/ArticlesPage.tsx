import { classNames } from 'shared/lib/classNames/classNames';
import { Container } from 'shared/ui/Container/Container';
import { ArticleList, ArticleView } from 'entities/Article';
import { useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { DynamicModelLoader } from 'shared/lib/components/DynamicModelLoader/DynamicModelLoader';
import { ArticleViewSelector } from 'features/ArticleViewSelector';
import { Page } from 'shared/ui/Page/Page';
import { useInView } from 'react-intersection-observer';
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce';
import { ArticleFilters } from 'features/ArticleFilters';
import { Card } from 'shared/ui/Card/Card';
import { initArticlePage } from 'pages/ArticlesPage/model/services/initArticlePage/initArticlePage';
import { useSearchParams } from 'react-router-dom';
import { getArticleListInited } from '../model/selectors/getArticleListInited/getArticleListIninted';
import { getArticleListHasMore } from '../model/selectors/getArticleListHasMore/getArticleListHasMore';
import { getArticleListPage } from '../model/selectors/getArticleListPage/getArticleListPage';
import { fetchArticleNextPage } from '../model/services/fetchArticleNextPage/fetchArticleNextPage';
import { articlesPageActions, articlesPageReducer, getArticles } from '../model/slice/articlesPageSlice';
import { fetchArticleList } from '../model/services/fetchArticleList/fetchArticleList';
import {
    getArticleListIsLoading,
} from '../model/selectors/getArticleListIsLoading/getArticleListIsLoading';
import cls from './ArticlesPage.module.scss';
import { getArticleListError } from '../model/selectors/getArticleListError/getArticleListError';
import { getArticleListView } from '../model/selectors/getArticleListView/getArticleListView';

interface ArticlesPageProps {
    className?: string;
}

const ArticlesPage = (props: ArticlesPageProps) => {
    const { className } = props;
    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticleListIsLoading);
    const error = useSelector(getArticleListError);
    const view = useSelector(getArticleListView);
    const dispatch = useAppDispatch();
    const page = useSelector(getArticleListPage);
    const hasMore = useSelector(getArticleListHasMore);
    const inited = useSelector(getArticleListInited);
    const [searchParams, setSearchParams] = useSearchParams();
    const { ref, inView } = useInView({
        threshold: 1,
    });

    const fetchData = useCallback(() => {
        dispatch(articlesPageActions.setPage(1));
        dispatch(fetchArticleList({ replace: true }));
    }, [dispatch]);

    const debounceFetchData = useDebounce(fetchData, 600);

    const onChangeView = useCallback((view:ArticleView) => {
        dispatch(articlesPageActions.setView(view));
    }, [dispatch]);

    const onLoadNextPage = useCallback(() => {
        if (inView) {
            dispatch(fetchArticleNextPage());
        }
    }, [dispatch, inView]);

    useEffect(() => {
        initArticlePage(searchParams);
    }, [dispatch, inited, searchParams]);

    return (
        <DynamicModelLoader name="articlesPage" reducer={articlesPageReducer}>
            <Page
                triggerRef={ref}
                onScrollEnd={onLoadNextPage}
                className={classNames(cls.ArticlesPage, {}, [className])}
            >
                <Container>
                    <div className={cls.body}>
                        <ArticleFilters fetchData={debounceFetchData} className={cls.filters} />
                        <ArticleViewSelector view={view} onViewClick={onChangeView} />
                    </div>
                    <ArticleList articles={articles} isLoading={isLoading} view={view} />
                </Container>
            </Page>
        </DynamicModelLoader>
    );
};
export default ArticlesPage;
