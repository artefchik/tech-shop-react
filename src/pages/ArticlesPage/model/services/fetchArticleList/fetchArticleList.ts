import { createAsyncThunk } from '@reduxjs/toolkit';
import { Article, ArticleType } from 'entities/Article';
import { ThunkConfig } from 'app/providers/StoreProvider';
import {
    getArticleFiltersOrder,
    getArticleFiltersSearch,
    getArticleFiltersSort,
    getArticleFiltersType,
} from 'features/ArticleFilters';
import { addQueryParams } from 'shared/lib/url/addQueryParams/addQueryParams';
import { $api } from 'shared/api/api';
import { getArticleListLimit } from '../../selectors/getArticleListLimit/getArticleListLimit';
import { getArticleListPage } from '../../selectors/getArticleListPage/getArticleListPage';

interface fetchArticleListProps {
    replace?: boolean;
}

export const fetchArticleList = createAsyncThunk<
    Article[],
    fetchArticleListProps,
    ThunkConfig<string>
>('articlesPage/fetchArticleList', async (_, thunkAPI) => {
    const { getState, rejectWithValue } = thunkAPI;

    const page = getArticleListPage(getState());
    const limit = getArticleListLimit(getState());
    const type = getArticleFiltersType(getState());
    const sort = getArticleFiltersSort(getState());
    const order = getArticleFiltersOrder(getState());
    try {
        addQueryParams({
            type,
            sort,
            order,
        });
        const response = await $api.get<Article[]>('/articles', {
            params: {
                order,
                page,
                limit,
                sort,
                types: type === ArticleType.ALL ? undefined : type,
            },
        });
        if (!response.data) {
            return rejectWithValue('error');
        }
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
