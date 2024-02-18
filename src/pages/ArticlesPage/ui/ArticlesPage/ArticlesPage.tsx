import { classNames } from 'shared/lib/classNames/classNames';
import { Container } from 'shared/ui/Container/Container';
import { useCallback, useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from 'shared/ui/Page/Page';
import { useInView } from 'react-intersection-observer';
import { useSearchParams } from 'react-router-dom';
import { ArticlesHeaderPage } from '../ArticlesHeaderPage/ArticlesHeaderPage';
import { initArticlePage } from '../../model/services/initArticlePage/initArticlePage';
import { ArticlesInfiniteList } from '../ArticlesInfiniteList/ArticlesInfiniteList';
import { fetchArticleNextPage } from '../../model/services/fetchArticleNextPage/fetchArticleNextPage';
import cls from './ArticlesPage.module.scss';
import { articlesPageReducer } from '../../model/slice/articlesPageSlice';

interface ArticlesPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
};

const ArticlesPage = (props: ArticlesPageProps) => {
    const { className } = props;

    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const { ref, inView } = useInView({
        threshold: 1,
    });
    const onLoadNextPage = useCallback(() => {
        if (inView) {
            dispatch(fetchArticleNextPage());
        }
    }, [dispatch, inView]);

    useEffect(() => {
        initArticlePage(searchParams);
    }, [dispatch, searchParams]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page
                triggerRef={ref}
                onScrollEnd={onLoadNextPage}
                className={classNames(cls.ArticlesPage, {}, [className])}
            >
                <Container>
                    <ArticlesHeaderPage className={cls.filters} />
                    <ArticlesInfiniteList />
                </Container>
            </Page>
        </DynamicModuleLoader>
    );
};
export default ArticlesPage;
