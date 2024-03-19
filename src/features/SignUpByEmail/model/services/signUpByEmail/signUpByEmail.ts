import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthResponse, userActions } from 'entities/User';
import { $api } from 'shared/api/api';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage';
import { ThunkConfig } from 'app/providers/StoreProvider';

interface SignupByEmailProps {
    username: string;
    email: string;
    password: string;
}

export const signUpByEmail = createAsyncThunk<
    AuthResponse,
    SignupByEmailProps,
    ThunkConfig<string>
>('user/signUpByEmail', async (authData, thunkAPI) => {
    const { getState, rejectWithValue, dispatch } = thunkAPI;

    try {
        const response = await $api.post<AuthResponse>(
            '/registration',
            authData,
        );
        if (!response.data) {
            throw new Error();
        }
        localStorage.setItem(USER_LOCALSTORAGE_KEY, response.data.accessToken);
        dispatch(userActions.setAuthData(response.data.user));
        return response.data;
    } catch (e: any) {
        console.log(e);
        return rejectWithValue(e.response?.data?.message);
    }
});
