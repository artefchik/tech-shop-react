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
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage';
import { cartActions } from 'entities/Cart/model/slice/cartSlice';
import { User } from '../../types/user';

interface fetchArticleListProps {
    replace?: boolean;
}

export const initUserAuthData = createAsyncThunk<
    User,
    void,
    ThunkConfig<string>
>('user/initUserAuthData', async (_, thunkAPI) => {
    const { getState, rejectWithValue, dispatch } = thunkAPI;

    try {
        const userId = JSON.parse?.(
            localStorage.getItem(USER_LOCALSTORAGE_KEY) || '',
        );
        if (!userId) {
            return rejectWithValue('error');
        }

        const response = await axios.get<User>(
            `http://localhost:8000/users/${userId}`,
        );
        if (!response.data) {
            return rejectWithValue('error');
        }
        dispatch(cartActions.setInitUserId(response.data));
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
