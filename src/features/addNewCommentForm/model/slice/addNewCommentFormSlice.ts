import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddNewCommentFormSchema } from '../types/addNewCommentForm';

const initialState:AddNewCommentFormSchema = {
    text: undefined,
};

export const addNewCommentFormSlice = createSlice({
    name: 'addNewCommentForm',
    initialState,
    reducers: {
        setText: (state, action: PayloadAction<string>) => {
            state.text = action.payload;
        },
    },
});

export const { actions: addNewCommentFormActions } = addNewCommentFormSlice;
export const { reducer: addNewCommentFormReducer } = addNewCommentFormSlice;
