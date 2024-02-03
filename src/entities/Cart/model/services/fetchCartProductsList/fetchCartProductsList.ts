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
import { getCartProductsQuery } from 'entities/Cart/api/cartApi';

interface Carts {
    products: CartItemType[];
    userId: string;
}

export const fetchCartProductsList = createAsyncThunk<
    Carts,
    void,
    ThunkConfig<string>
>('cart/fetchCartProductsList', async (_, thunkAPI) => {
    const { getState, rejectWithValue, dispatch } = thunkAPI;

    try {
        const authData = getUserAuthData(getState());
        if (!authData?.id) {
            return rejectWithValue('error');
        }
        const response = await axios.get<Carts>(
            `http://localhost:8000/cart/${authData?.id}`,
        );
        if (!response.data) {
            return rejectWithValue('error');
        }
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
