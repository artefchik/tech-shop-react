import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EditorSchema } from 'features/Editor';
import { getStorageItem } from 'shared/lib/helpers/localStorage';
import {
    EDITOR_CREATED_LOCALSTORAGE_KEY,
    EDITOR_LOCALSTORAGE_KEY,
} from 'shared/const/localStorage';
import { ArticleBlockType } from 'entities/Article';
import { v4 as uuidv4 } from 'uuid';
import {
    EditorBlock,
    EditorData,
    EditorSavedData,
    ImageBlock,
    TextBlock,
    TimeChange,
} from '../types/editor';

const initialState: EditorSchema = {
    editorData: {
        blocks: [
            {
                id: uuidv4(),
                type: ArticleBlockType.TEXT,
                title: '',
                text: '',
            },
        ],
        title: '',
    },
    _initiated: false,
};

export const editorSlice = createSlice({
    name: 'editor',
    initialState,
    reducers: {
        initEditor: (state) => {
            const data = getStorageItem<EditorSavedData>(EDITOR_LOCALSTORAGE_KEY);
            if (data) {
                state.savedData = data;
            }
            state._initiated = true;
        },
        setTitle: (state, action: PayloadAction<string>) => {
            state.editorData.title = action.payload;
        },
        renderBlocksStorage: (state) => {
            if (state.savedData) {
                state.editorData.blocks = state.savedData.blocks;
                state.editorData.title = state.savedData.title;
            }
            state.savedData = undefined;
        },
        createBlock: (state, action: PayloadAction<EditorBlock>) => {
            state.editorData?.blocks.push(action.payload);
        },

        changeBlock: (state, action: PayloadAction<EditorBlock>) => {
            const searchBlock = state.editorData?.blocks.find(
                (block) => block.id === action.payload.id,
            );
            if (searchBlock) {
                state.editorData.blocks = state.editorData.blocks.map((block) => {
                    if (block.id === action.payload.id) {
                        block = action.payload;
                    }
                    return block;
                });
            }
        },
        onChangeTextBlock: (state, action: PayloadAction<TextBlock>) => {
            state.editorData.blocks = state.editorData.blocks.map((block) => {
                if (block.id === action.payload.id) {
                    block = {
                        ...block,
                        ...action.payload,
                    };
                }
                return block;
            });
        },

        onChangeImageBlock: (state, action: PayloadAction<ImageBlock>) => {
            state.editorData.blocks = state.editorData.blocks.map((block) => {
                if (block.id === action.payload.id) {
                    block = {
                        ...block,
                        ...action.payload,
                    };
                }
                return block;
            });
        },
        createBlockOnMobile: (state, action: PayloadAction<EditorBlock>) => {
            state.editorData.blocks.push(action.payload);
        },
        deleteBlock: (state, action: PayloadAction<string>) => {
            state.editorData.blocks = state.editorData.blocks.filter(
                (block) => block.id !== action.payload,
            );
        },
    },
    extraReducers: (builder) => {
        // builder
        // .addCase(fetchProfileData.pending, (state, action) => {
        //     state.error = undefined;
        //     state.isLoading = true;
        // })
        // .addCase(
        //     fetchProfileData.fulfilled,
        //     (state, action: PayloadAction<Profile>) => {
        //         state.isLoading = false;
        //         state.data = action.payload;
        //         state.form = action.payload;
        //     },
        // )
        // .addCase(fetchProfileData.rejected, (state, action) => {
        //     state.isLoading = false;
        //     state.error = action.payload;
        // })
    },
});

export const { actions: editorActions } = editorSlice;
export const { reducer: editorReducer } = editorSlice;
