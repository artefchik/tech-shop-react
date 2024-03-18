import { ArticleFilters } from 'features/ArticleFilters';
import { ArticleViewSelector } from 'pages/ArticlesPage/ui/ArticleViewSelector';
import { HStack } from 'shared/ui/Stack';
import { useCallback } from 'react';
import { ArticleView } from 'entities/Article';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce';
import { ArticleSearch } from 'features/ArticleFilters/ui/ArticleSearch/ArticleSearch';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { fetchArticleList } from '../../model/services/fetchArticleList/fetchArticleList';
import { articlesPageActions } from '../../model/slice/articlesPageSlice';
import { getArticleListView } from '../../model/selectors/getArticleListView/getArticleListView';
import cls from './ArticlesHeaderPage.module.scss';

interface ArticlesHeaderPageProps {
    className?: string;
}

export const ArticlesHeaderPage = (props: ArticlesHeaderPageProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const fetchData = useCallback(() => {
        dispatch(articlesPageActions.setPage(1));
        dispatch(fetchArticleList({ replace: true }));
    }, [dispatch]);

    const debounceFetchData = useDebounce(fetchData, 600);

    return (
        <HStack
            align="center"
            justify="between"
            gap="30"
            className={classNames(cls.ArticlesHeaderPage, {}, [className])}
        >
            {/* <ArticleSearch onSend={debounceFetchData} /> */}
            <Text text={t('Articles')} size={TextSize.LARGE} As="h3" />
            <HStack
                gap="15"
                align="center"
                justify="end"
                className={cls.filters}
            >
                <ArticleFilters fetchData={debounceFetchData} />
                <ArticleViewSelector />
            </HStack>
        </HStack>
    );
};
