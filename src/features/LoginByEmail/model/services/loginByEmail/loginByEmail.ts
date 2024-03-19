import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthResponse, userActions } from 'entities/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage';
import axios from 'axios';
import { ThunkConfig } from 'app/providers/StoreProvider';

interface LoginByEmailProps {
    email: string;
    password: string;
}

export const loginByEmail = createAsyncThunk<
    AuthResponse,
    LoginByEmailProps,
    ThunkConfig<string>
>('user/loginByEmail', async (authData, thunkAPI) => {
    const { getState, rejectWithValue, dispatch } = thunkAPI;

    try {
        const response = await axios.post<AuthResponse>(
            `http://localhost:8000/login`,
            authData,
            { withCredentials: true },
        );

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
        return rejectWithValue(
            'Вход на сайт не был произведён. Возможно, Вы ввели неверное email пользователя или пароль.',
        );
    }
});
