import { ArticleFilters } from 'features/ArticleFilters';
import { ArticleViewSelector } from 'features/ArticleViewSelector';
import { HStack } from 'shared/ui/Stack';
import { useCallback } from 'react';
import { ArticleView } from 'entities/Article';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce';
import { fetchArticleList } from '../../model/services/fetchArticleList/fetchArticleList';
import { articlesPageActions } from '../../model/slice/articlesPageSlice';
import { getArticleListView } from '../../model/selectors/getArticleListView/getArticleListView';
import cls from './ArticlesHeaderPage.module.scss';

interface ArticlesHeaderPageProps {
    className?: string;
}

export const ArticlesHeaderPage = (props: ArticlesHeaderPageProps) => {
    const { className } = props;
    const view = useSelector(getArticleListView);
    const dispatch = useAppDispatch();

    const onChangeView = useCallback((view:ArticleView) => {
        dispatch(articlesPageActions.setView(view));
    }, [dispatch]);

    const fetchData = useCallback(() => {
        dispatch(articlesPageActions.setPage(1));
        dispatch(fetchArticleList({ replace: true }));
    }, [dispatch]);

    const debounceFetchData = useDebounce(fetchData, 600);

    return (
        <HStack gap="15" align="start" className={className} justify="between">
            <ArticleFilters fetchData={debounceFetchData} className={cls.filter} />
            <ArticleViewSelector view={view} onViewClick={onChangeView} />
        </HStack>
    );
};
