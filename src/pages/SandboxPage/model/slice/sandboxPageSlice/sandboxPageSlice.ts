import { createSlice } from '@reduxjs/toolkit';
import { SandboxPageSchema } from 'pages/SandboxPage';

const initialState: SandboxPageSchema = {
    _showSettings: false,
};

export const sandboxPageSlice = createSlice({
    name: 'sandboxPage',
    initialState,
    reducers: {
        setShowSettings: (state) => {
            state._showSettings = true;
        },
    },
    extraReducers: (builder) => {},
});

export const { actions: sandboxPageActions } = sandboxPageSlice;
export const { reducer: sandboxPageReducer } = sandboxPageSlice;
