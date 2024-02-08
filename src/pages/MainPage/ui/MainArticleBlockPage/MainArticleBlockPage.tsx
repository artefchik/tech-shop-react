import { classNames } from 'shared/lib/classNames/classNames';
import { MainBlockPage } from 'shared/ui/MainBlockPage/MainBlockPage';
import { Article, ArticleList } from 'entities/Article';
import { useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchArticleList } from 'pages/ArticlesPage/model/services/fetchArticleList/fetchArticleList';
import { useSelector } from 'react-redux';
import { articlesPageReducer } from 'pages/ArticlesPage/model/slice/articlesPageSlice';
import { getRoutePathArticles } from 'shared/const/router';
import { DynamicModelLoader } from 'shared/lib/components/DynamicModelLoader/DynamicModelLoader';
import { useGetMainBlockPage } from '../../model/api/mainPageApi';

interface MainArticleBlockPageProps {
    className?: string;
}

export const MainArticleBlockPage = (props: MainArticleBlockPageProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const { data: articles, isLoading } = useGetMainBlockPage({
        url: '/articles',
        limit: 5,
    });

    return (
        <MainBlockPage
            srcLink={getRoutePathArticles()}
            title="Articles"
            ListBlock={
                !!articles && (
                    <ArticleList isLoading={isLoading} articles={articles} />
                )
            }
        />
    );
};
