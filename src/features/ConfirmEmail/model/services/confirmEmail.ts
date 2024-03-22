import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserAuthData } from 'entities/User';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { CommentType } from 'entities/Comment/model/types/comment';
import { getArticleDetailsData } from 'entities/Article';
import { $api } from 'shared/api/api';

export const confirmEmail = createAsyncThunk<string, void, ThunkConfig<string>>(
    'confirmEmail/confirmEmail',
    async (_, thunkApi) => {
        const { extra, dispatch, rejectWithValue, getState } = thunkApi;

        const userData = getUserAuthData(getState());

        if (!userData) {
            return rejectWithValue('unauthorized');
        }
        try {
            const response = await $api.get<string>(`/confirm/${userData.id}`);

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            return rejectWithValue('error');
        }
    },
);
