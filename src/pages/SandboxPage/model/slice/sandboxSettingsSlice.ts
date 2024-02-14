import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LanguageType } from 'shared/const/types';
import { ArticleType } from 'entities/Article';
import { SandboxSettingsSchema } from '../types/sandboxSettings';

const initialState: SandboxSettingsSchema = {
    lang: LanguageType.RU,
    types: [],
    previewImage: '',
    keyWords: [],
};

export const sandboxSettingsSlice = createSlice({
    name: 'sandboxSettings',
    initialState,
    reducers: {
        setPreviewImage: (state, action: PayloadAction<string>) => {
            state.previewImage = action.payload;
        },
        setLang: (state, action: PayloadAction<LanguageType>) => {
            state.lang = action.payload;
        },
        setTypes: (state, action: PayloadAction<ArticleType[]>) => {
            state.types = action.payload;
        },
    },
    extraReducers: (builder) => {},
});

export const { actions: sandboxSettingsActions } = sandboxSettingsSlice;
export const { reducer: sandboxSettingsReducer } = sandboxSettingsSlice;
