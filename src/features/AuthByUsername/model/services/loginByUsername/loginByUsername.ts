import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, userActions } from 'entities/User';
import axios from 'axios';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage';
import { $api } from 'shared/api/api';
import { AuthResponse } from 'features/AuthByUsername/model/types/loginSchema';

interface LoginByUsernameProps {
    email: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<
    AuthResponse,
    LoginByUsernameProps,
    {
        rejectValue: string;
    }
>('login/loginByUsername', async (authData, thunkAPI) => {
    try {
        const response = await $api.post<AuthResponse>('/login', authData);
        if (!response.data) {
            throw new Error();
        }
        localStorage.setItem(
            USER_LOCALSTORAGE_KEY,
            JSON.stringify(response.data.accessToken),
        );
        thunkAPI.dispatch(userActions.setAuthData(response.data.user));
        return response.data;
    } catch (e) {
        console.log(e);
        return thunkAPI.rejectWithValue('не верный логин или пароль');
    }
});
