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
    async (_, thunkAPI) => {
        const hasMore = getArticleListHasMore(thunkAPI.getState());
        const page = getArticleListPage(thunkAPI.getState());
        const isLoading = getArticleListIsLoading(thunkAPI.getState());

        if (hasMore && !isLoading) {
            thunkAPI.dispatch(articlesPageActions.setPage(page + 1));
            console.log(page);
            thunkAPI.dispatch(fetchArticleList({}));
        }
    },
);
