import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getArticleListPage } from '../../selectors/getArticleListPage/getArticleListPage';
import { articlesPageActions } from '../../slice/articlesPageSlice';
import { getArticleListHasMore } from '../../selectors/getArticleListHasMore/getArticleListHasMore';
import { getArticleListLimit } from '../../selectors/getArticleListLimit/getArticleListLimit';
import { fetchArticleList } from '../../services/fetchArticleList/fetchArticleList';
import { getArticleListIsLoading } from '../../selectors/getArticleListIsLoading/getArticleListIsLoading';

export const fetchArticleNextPage = createAsyncThunk<void, void, ThunkConfig<string>>(
    'articlesPage/fetchArticleNextPage',
    async (_, { dispatch, getState }) => {
        const hasMore = getArticleListHasMore(getState());
        const page = getArticleListPage(getState());
        const isLoading = getArticleListIsLoading(getState());

        if (hasMore && !isLoading) {
            dispatch(articlesPageActions.setPage(page + 1));
            dispatch(fetchArticleList({}));
        }
    },
);
