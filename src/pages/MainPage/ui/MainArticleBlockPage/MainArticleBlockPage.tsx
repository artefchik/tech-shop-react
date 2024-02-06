import { classNames } from 'shared/lib/classNames/classNames';
import { MainBlockPage } from 'shared/ui/MainBlockPage/MainBlockPage';
import { ArticleList } from 'entities/Article';
import { useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchArticleList } from 'pages/ArticlesPage/model/services/fetchArticleList/fetchArticleList';
import { useSelector } from 'react-redux';
import {
    articlesPageReducer,
    getArticles,
} from 'pages/ArticlesPage/model/slice/articlesPageSlice';
import { getRoutePathArticles } from 'shared/const/router';
import { getArticleListIsLoading } from 'pages/ArticlesPage/model/selectors/getArticleListIsLoading/getArticleListIsLoading';
import { DynamicModelLoader } from 'shared/lib/components/DynamicModelLoader/DynamicModelLoader';
import cls from './MainArticleBlockPage.module.scss';

interface MainArticleBlockPageProps {
    className?: string;
}

export const MainArticleBlockPage = (props: MainArticleBlockPageProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticleListIsLoading);

    useEffect(() => {
        dispatch(fetchArticleList({}));
    }, [dispatch]);

    return (
        <DynamicModelLoader name="articlesPage" reducer={articlesPageReducer}>
            <MainBlockPage
                srcLink={getRoutePathArticles()}
                title="Articles"
                ListBlock={
                    <ArticleList isLoading={isLoading} articles={articles} />
                }
            />
        </DynamicModelLoader>
    );
};
