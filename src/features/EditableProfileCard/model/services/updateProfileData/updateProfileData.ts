import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';
import { StateSchema } from 'app/providers/StoreProvider';
import { ValidateProfileError } from 'features/EditableProfileCard/model/types/editableProfile';
import { Profile } from 'entities/Profile';
import { getProfileForm } from 'features/EditableProfileCard/model/selectors/getProfileForm/getProfileForm';
import { $api } from 'shared/api/api';
import { validateProfileData } from '../validateProfileData/validateProfileData';

export const updateProfileData = createAsyncThunk<
    Profile,
    void,
    {
        rejectValue: ValidateProfileError[];
    }
>('profile/updateProfileData', async (_, thunkAPI) => {
    try {
        // @ts-ignore
        const formData = getProfileForm(thunkAPI.getState());

        const response = await $api.patch<Profile>(
            `/profile/${formData?.id}`,
            formData,
        );
        return response.data;
    } catch (e) {
        console.log(e);
        return thunkAPI.rejectWithValue([ValidateProfileError.SERVER_ERROR]);
    }
});
