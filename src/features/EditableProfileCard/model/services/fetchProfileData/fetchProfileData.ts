import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { Profile } from 'entities/Profile';
import { $api } from 'shared/api/api';

export const fetchProfileData = createAsyncThunk<
    Profile,
    string,
    {
        rejectValue: string;
    }
>('profile/fetchProfileData', async (profileId, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
        const response = await $api.get<Profile>(`/profile/${profileId}`);
        if (!response.data) {
            throw new Error();
        }
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('Profile not found');
    }
});
