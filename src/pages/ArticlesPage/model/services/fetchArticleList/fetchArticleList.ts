import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
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
    const search = getArticleFiltersSearch(getState());
    const type = getArticleFiltersType(getState());
    const sort = getArticleFiltersSort(getState());
    const order = getArticleFiltersOrder(getState());
    try {
        addQueryParams({
            search,
            type,
            sort,
            order,
        });
        const response = await $api.get<Article[]>('/articles', {
            params: {
                // _expand: 'user',
                page,
                // _limit: limit,
                // sort,
                // order,
                type: type === ArticleType.ALL ? undefined : type,
                // q: search,
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
