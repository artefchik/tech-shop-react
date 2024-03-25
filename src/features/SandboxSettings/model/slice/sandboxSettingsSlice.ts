import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LanguageType } from 'shared/const/types';
import { ArticleType } from 'entities/Article';
import { SandboxSettingsSchema } from '../types/settings';

const initialState: SandboxSettingsSchema = {
    lang: LanguageType.RU,
    types: ArticleType.IT,
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
        setTypes: (state, action: PayloadAction<ArticleType>) => {
            state.types = action.payload;
        },
        setKeyWords: (state, action: PayloadAction<string>) => {
            if (action.payload.length) {
                const words = action.payload.split(',');
                state.keyWords = words.map((word) => word.trim());
            }
        },

        resetSettings: (state) => {
            state.previewImage = '';
        },
    },
    extraReducers: (builder) => {},
});

export const { actions: sandboxSettingsActions } = sandboxSettingsSlice;
export const { reducer: sandboxSettingsReducer } = sandboxSettingsSlice;
