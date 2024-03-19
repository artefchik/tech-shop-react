import { createSlice } from '@reduxjs/toolkit';
import { loginByEmail } from '../services/loginByEmail/loginByEmail';
import { LoginByEmailSchema } from '../types/LoginSchema';

const initialState: LoginByEmailSchema = {
    isLoading: false,
    error: undefined,
};

export const loginByEmailSlice = createSlice({
    name: 'loginByEmail',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginByEmail.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(loginByEmail.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(loginByEmail.rejected, (state, action) => {
                state.error = action.payload;
                state.isLoading = false;
            });
    },
});

export const { actions: loginByEmailActions } = loginByEmailSlice;
export const { reducer: loginByEmailReducer } = loginByEmailSlice;
