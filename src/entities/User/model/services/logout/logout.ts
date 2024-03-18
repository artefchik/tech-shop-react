import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { $api } from 'shared/api/api';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage';
import { userActions } from 'entities/User';

export const logout = createAsyncThunk<void, void, ThunkConfig<string>>(
    'user/logout',
    async (_, thunkAPI) => {
        const { getState, rejectWithValue, dispatch } = thunkAPI;

        try {
            await $api.post(`/logout`);
            localStorage.removeItem(USER_LOCALSTORAGE_KEY);
            dispatch(userActions.setLogout());
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);
