import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { Profile } from 'entities/Profile';

export const fetchProfileData = createAsyncThunk<Profile, string, {
    rejectValue: string
}>(
    'profile/fetchProfileData',
    async (profileId, thunkAPI) => {
        try {
            const response = await axios.get<Profile>(`http://localhost:8000/profile/${profileId}`);
            if (!response.data) {
                return thunkAPI.rejectWithValue('error');
            }
            return response.data;
        } catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue('error');
        }
    },
);
