import { ArticleList } from 'entities/Article';
import { useSelector } from 'react-redux';
import { getArticles } from '../../model/slice/articlesPageSlice';
import {
    getArticleListIsLoading,
} from '../../model/selectors/getArticleListIsLoading/getArticleListIsLoading';
import { getArticleListError } from '../../model/selectors/getArticleListError/getArticleListError';
import { getArticleListView } from '../../model/selectors/getArticleListView/getArticleListView';

interface ArticlesInfiniteListProps {
    className?: string;
}

export const ArticlesInfiniteList = (props: ArticlesInfiniteListProps) => {
    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticleListIsLoading);
    const error = useSelector(getArticleListError);
    const view = useSelector(getArticleListView);
    const { className } = props;

    return (
        <ArticleList articles={articles} isLoading={isLoading} view={view} />
    );
};
