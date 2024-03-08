import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MobileBarSchema } from '../types/MobileBarSchema';

const initialState: MobileBarSchema = {
    isOpen: false,
};

export const mobileBarSlice = createSlice({
    name: 'mobileBar',
    initialState,
    reducers: {
        setOpenBar: (state, action: PayloadAction<boolean>) => {
            state.isOpen = action.payload;
        },
    },
});

export const { actions: mobileBarActions } = mobileBarSlice;
export const { reducer: mobileBarReducer } = mobileBarSlice;
