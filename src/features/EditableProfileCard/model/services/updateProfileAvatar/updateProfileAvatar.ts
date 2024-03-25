import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthResponse, User, userActions } from 'entities/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage';
import axios from 'axios';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { $api } from 'shared/api/api';

interface UpdateProfileAvatarProps {
    formData: FormData;
}

export const updateProfileAvatar = createAsyncThunk<
    User,
    FormData,
    ThunkConfig<string>
>('profile/updateProfileAvatar', async (data, thunkAPI) => {
    const { getState, rejectWithValue, dispatch } = thunkAPI;

    try {
        const response = await $api.post<User>(`/upload`, data);

        if (!response.data) {
            throw new Error();
        }
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue(
            'The avatar has not been uploaded.Try again please.',
        );
    }
});
