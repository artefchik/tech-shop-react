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
import { $api } from 'shared/api/api';
import { AuthResponse } from 'features/AuthByUsername/model/types/loginSchema';
import { User } from '../../types/user';

interface fetchArticleListProps {
    replace?: boolean;
}

export const initUserAuthData = createAsyncThunk<User, void, ThunkConfig<string>>(
    'user/initUserAuthData',
    async (_, thunkAPI) => {
        const { getState, rejectWithValue, dispatch } = thunkAPI;

        try {
            const response = await axios.get<AuthResponse>(
                `http://localhost:8000/refresh`,
                { withCredentials: true },
            );
            if (!response.data) {
                return rejectWithValue('error');
            }
            localStorage.setItem(USER_LOCALSTORAGE_KEY, response.data.accessToken);
            return response.data.user;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);
