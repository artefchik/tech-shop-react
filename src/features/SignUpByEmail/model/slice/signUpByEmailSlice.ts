import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage';
import { SignUpByEmailSchema } from 'features/SignUpByEmail/model/types/SignUpSchema';
import { signUpByEmail } from 'features/SignUpByEmail/model/services/signUpByEmail/signUpByEmail';

const initialState: SignUpByEmailSchema = {
    isLoading: false,
    error: undefined,
};

export const signUpByEmailSlice = createSlice({
    name: 'signUpByEmail',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signUpByEmail.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(signUpByEmail.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(signUpByEmail.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            });
    },
});

export const { actions: signUpByEmailActions } = signUpByEmailSlice;
export const { reducer: signUpByEmailReducer } = signUpByEmailSlice;
