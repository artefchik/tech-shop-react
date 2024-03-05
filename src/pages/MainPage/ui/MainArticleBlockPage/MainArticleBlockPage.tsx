import { MainBlockPage } from 'shared/ui/MainBlockPage/MainBlockPage';
import { ArticleList } from 'entities/Article';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getRoutePathArticles } from 'shared/const/router';
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
        order: 'asc',
    });

    return (
        <MainBlockPage
            srcLink={getRoutePathArticles()}
            title="Articles"
            ListBlock={
                !!articles && <ArticleList isLoading={isLoading} articles={articles} />
            }
        />
    );
};
