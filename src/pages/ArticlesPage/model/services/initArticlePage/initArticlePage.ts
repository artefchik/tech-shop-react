import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { ArticleType } from 'entities/Article';
import { SortOrder } from 'shared/const/types';
import { articleFiltersActions, ArticleSortField } from 'features/ArticleFilters';
import { articlesPageActions } from '../../slice/articlesPageSlice';
import { fetchArticleList } from '../../services/fetchArticleList/fetchArticleList';
import { getArticleListInited } from '../../selectors/getArticleListInited/getArticleListIninted';

export const initArticlePage = createAsyncThunk<
    void,
    URLSearchParams,
    ThunkConfig<string>
>('articlesPage/initArticlePage', async (searchParams, thunkAPI) => {
    const { dispatch, getState } = thunkAPI;
    const inited = getArticleListInited(getState());

    if (!inited) {
        const search = searchParams.get('search');
        const type = searchParams.get('type') as ArticleType;
        const sort = searchParams.get('sort') as ArticleSortField;
        const order = searchParams.get('order') as SortOrder;

        if (search) {
            dispatch(articleFiltersActions.setSearch(search));
        }
        if (sort) {
            dispatch(articleFiltersActions.setSort(sort));
        }
        if (type) {
            dispatch(articleFiltersActions.setType(type));
        }
        if (order) {
            dispatch(articleFiltersActions.setOrder(order));
        }
        dispatch(articlesPageActions.initState());
        dispatch(fetchArticleList({}));
    }
});
