import { classNames } from 'shared/lib/classNames/classNames';
import { Container } from 'shared/ui/Container/Container';
import { ArticleList, ArticleView } from 'entities/Article';
import { useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { DynamicModelLoader } from 'shared/lib/components/DynamicModelLoader/DynamicModelLoader';
import { ArticleViewSelector } from 'features/ArticleViewSelector';
import { articlesPageActions, articlesPageReducer, getArticles } from '../model/slice/articlesPageSlice';
import { fetchArticleList } from '../model/services/fetchArticleList';
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

    useEffect(() => {
        dispatch(fetchArticleList());
    }, [dispatch]);

    const oChangeView = useCallback((view:ArticleView) => {
        dispatch(articlesPageActions.setView(view));
    }, [dispatch]);

    return (
        <DynamicModelLoader name="articlesPage" reducer={articlesPageReducer}>
            <div className={classNames(cls.ArticlesPage, {}, [className])}>
                <Container>
                    <ArticleViewSelector view={view} onViewClick={oChangeView} />
                    <ArticleList articles={articles} isLoading={isLoading} view={view} />
                </Container>
            </div>
        </DynamicModelLoader>
    );
};
export default ArticlesPage;
