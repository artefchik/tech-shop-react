import { classNames } from 'shared/lib/classNames/classNames';
import { Container } from 'shared/ui/Container/Container';
import { useCallback, useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from 'shared/ui/Page/Page';
import { useSearchParams } from 'react-router-dom';
import { ArticlesHeaderPage } from '../ArticlesHeaderPage/ArticlesHeaderPage';
import { initArticlePage } from '../../model/services/initArticlePage/initArticlePage';
import { ArticlesInfiniteList } from '../ArticlesInfiniteList/ArticlesInfiniteList';
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

    useEffect(() => {
        dispatch(initArticlePage(searchParams));
    }, [dispatch, searchParams]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page isBottomPadding>
                <Container>
                    <ArticlesHeaderPage className={cls.filters} />
                    <ArticlesInfiniteList />
                </Container>
            </Page>
        </DynamicModuleLoader>
    );
};
export default ArticlesPage;
