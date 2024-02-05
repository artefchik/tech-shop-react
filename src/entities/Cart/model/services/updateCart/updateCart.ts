import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage';
import { CartItemType } from 'entities/Cart/model/types/cart';
import { getCartProducts } from 'entities/Cart/model/selectors/getCartProducts/getCartProducts';
import { CartType, setUpdateProducts } from 'entities/Cart/api/cartApi';

export const updateCart = createAsyncThunk<CartType, void, ThunkConfig<string>>(
    'cart/updateCart',
    async (_, thunkAPI) => {
        const { getState, rejectWithValue, dispatch } = thunkAPI;

        const products = getCartProducts(getState());
        const userId = JSON.parse?.(
            localStorage.getItem(USER_LOCALSTORAGE_KEY) || '',
        );
        try {
            if (!userId) {
                return rejectWithValue('error');
            }
            const response = await dispatch(
                setUpdateProducts({ userId, products }),
            ).unwrap();
            if (!response) {
                return rejectWithValue('error');
            }
            return response;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);
