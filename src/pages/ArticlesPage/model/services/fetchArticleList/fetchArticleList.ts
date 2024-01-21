import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { Article, ArticleType } from 'entities/Article';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getArticleFiltersSearch, getArticleFiltersType } from 'features/ArticleFilters';
import { addQueryParams } from 'shared/lib/url/addQueryParams/addQueryParams';
import { getArticleListLimit } from '../../selectors/getArticleListLimit/getArticleListLimit';
import { getArticleListPage } from '../../selectors/getArticleListPage/getArticleListPage';

interface fetchArticleListProps {
  replace?:boolean
}

export const fetchArticleList = createAsyncThunk<Article[], fetchArticleListProps, ThunkConfig<string>>(
    'articlesPage/fetchArticleList',
    async (_, thunkAPI) => {
        const page = getArticleListPage(thunkAPI.getState());
        const limit = getArticleListLimit(thunkAPI.getState());
        const search = getArticleFiltersSearch(thunkAPI.getState());
        const type = getArticleFiltersType(thunkAPI.getState());
        try {
            addQueryParams({ search, type });
            const response = await axios.get<Article[]>('http://localhost:8000/articles', {
                params: {
                    _expand: 'user',
                    _page: page,
                    _limit: limit,
                    _type: type === ArticleType.ALL ? undefined : type,
                    q: search,
                },
            });
            if (!response.data) {
                return thunkAPI.rejectWithValue('error');
            }
            return response.data;
        } catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue('error');
        }
    },
);
