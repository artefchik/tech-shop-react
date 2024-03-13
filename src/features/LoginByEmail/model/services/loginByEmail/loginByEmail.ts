import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthResponse, userActions } from 'entities/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage';
import { $api } from 'shared/api/api';

interface LoginByEmailProps {
    email: string;
    password: string;
}

export const loginByEmail = createAsyncThunk<
    AuthResponse,
    LoginByEmailProps,
    {
        rejectValue: string;
    }
>('user/loginByEmail', async (authData, thunkAPI) => {
    const { getState, rejectWithValue, dispatch } = thunkAPI;

    try {
        const response = await $api.post<AuthResponse>('/login', authData);
        if (!response.data) {
            throw new Error();
        }
        localStorage.setItem(
            USER_LOCALSTORAGE_KEY,
            JSON.stringify(response.data.accessToken),
        );
        dispatch(userActions.setAuthData(response.data.user));
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('не верный логин или пароль');
    }
});
