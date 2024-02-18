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
import { CartItemType } from 'entities/Cart/model/types/cart';
import { getCartProducts } from 'entities/Cart/model/selectors/getCartProducts/getCartProducts';
import { getUserAuthData } from 'entities/User';
import { CartType, getCartProductsQuery } from 'entities/Cart/api/cartApi';
import { $api } from 'shared/api/api';

export const fetchCartProductsList = createAsyncThunk<
    CartType,
    void,
    ThunkConfig<string>
>('cart/fetchCartProductsList', async (_, thunkAPI) => {
    const { getState, rejectWithValue, dispatch } = thunkAPI;
    const authData = getUserAuthData(getState());
    if (!authData?.id) {
        return rejectWithValue('error');
    }

    try {
        const response = await $api.get(`/cart/${authData?.id}`);
        if (!response.data) {
            return rejectWithValue('error');
        }
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
