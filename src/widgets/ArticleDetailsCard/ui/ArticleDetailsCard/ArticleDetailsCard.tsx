import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import {
    ArticleDetails,
    ArticleType,
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading,
} from 'entities/Article';
import { useCallback, useEffect } from 'react';
import { ArticleTypeBlock } from 'entities/Article/ui/ArticleTypeBlock/ArticleTypeBlock';
import { fetchArticleById } from 'entities/Article/model/services/fetchArticleById/fetchArticleById';

interface ArticleDetailsCardProps {
    className?: string;
    articleId: string;
}

export const ArticleDetailsCard = (props: ArticleDetailsCardProps) => {
    const { className, articleId } = props;

    const dispatch = useAppDispatch();
    const article = useSelector(getArticleDetailsData);
    const isLoading = useSelector(getArticleDetailsIsLoading);
    const error = useSelector(getArticleDetailsError);

    useEffect(() => {
        if (articleId) {
            dispatch(fetchArticleById(articleId));
        }
    }, [dispatch, articleId]);

    return (
        <ArticleDetails article={article} isLoading={isLoading} error={error} />
    );
};
