import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { StateSchema } from 'app/providers/StoreProvider';
import { ValidateProfileError } from 'features/EditableProfilleCard/model/types/editableProfile';
import { Profile } from 'entities/Profile';
import {
    validateProfileData,
} from '../validateProfileData/validateProfileData';

interface ThunkConfig {
    state?: StateSchema;
    rejectValue?: ValidateProfileError[];
}

export const updateProfileData = createAsyncThunk<Profile, void, {
    rejectValue: ValidateProfileError[];
}>(
    'profile/updateProfileData',
    async (_, thunkAPI) => {
        // @ts-ignore
        const formData = getProfileForm(thunkAPI.getState());
        const errors = validateProfileData(formData);
        if (errors.length) {
            return thunkAPI.rejectWithValue(errors);
        }
        try {
            const response = await axios.put<Profile>(`http://localhost:8000/profile/${formData?.id}`, formData);
            return response.data;
        } catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue([ValidateProfileError.SERVER_ERROR]);
        }
    },
);
