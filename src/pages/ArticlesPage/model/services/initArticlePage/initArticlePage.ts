import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { articleFiltersActions } from 'features/ArticleFilters/model/slice/articleFiltersSlice';
import { articlesPageActions } from '../../slice/articlesPageSlice';
import { fetchArticleList } from '../../services/fetchArticleList/fetchArticleList';
import { getArticleListInited } from '../../selectors/getArticleListInited/getArticleListIninted';

export const initArticlePage = createAsyncThunk<void, URLSearchParams, ThunkConfig<string>>(
    'articlesPage/initArticlePage',
    async (searchParams, thunkAPI) => {
        const { dispatch, getState } = thunkAPI;
        const inited = getArticleListInited(getState());

        if (!inited) {
            const search = searchParams.get('search');
            const type = searchParams.get('type');

            if (search) {
                dispatch(articleFiltersActions.setSearch(search));
            }
            dispatch(articlesPageActions.initState());
            dispatch(fetchArticleList({}));
        }
    },
);
