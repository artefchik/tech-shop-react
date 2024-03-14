import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage';
import { initUserAuthData } from '../services/initUserAuthData/initUserAuthData';
import { User, UserSchema } from '../types/user';

const initialState: UserSchema = {
    _mounted: false,
    error: undefined,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<User>) => {
            state.authData = action.payload;
        },
        setLogout: (state) => {
            state.authData = undefined;
            localStorage.removeItem(USER_LOCALSTORAGE_KEY);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(initUserAuthData.fulfilled, (state, action) => {
                state.authData = action.payload;
                state._mounted = true;
            })
            .addCase(initUserAuthData.rejected, (state, action) => {
                state.error = action.payload;
                state._mounted = true;
            });
    },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
