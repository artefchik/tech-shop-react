import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArticleBlockType } from 'entities/Article/model/types/article';
import { EditorSchema } from 'features/Editor';
import { getStorageItem } from 'shared/lib/helpers/localStorage';
import {
    EDITOR_CREATED_LOCALSTORAGE_KEY,
    EDITOR_LOCALSTORAGE_KEY,
} from 'shared/const/localStorage';
import { Editor, EditorBlock, ImageBlock, TextBlock } from '../types/editor';

const initialState: EditorSchema = {
    title: '',

    editorData: {
        blocks: [
            {
                id: '1',
                type: ArticleBlockType.TEXT,
                title: '',
                text: '',
            },
        ],
        title: '',
    },
    dateChange: {
        hour: 0,
        minutes: 0,
    },
    _initiated: false,
};

export const editorSlice = createSlice({
    name: 'editor',
    initialState,
    reducers: {
        setInitiated: (state) => {
            state._initiated = true;
        },
        initEditor: (state) => {
            const data = getStorageItem(EDITOR_LOCALSTORAGE_KEY) as Editor;
            const dateTime = getStorageItem(EDITOR_CREATED_LOCALSTORAGE_KEY);
            if (dateTime) {
                state.dateChange = dateTime;
            }
            state.editorData = data;
            state._initiated = true;
        },
        setTitle: (state, action: PayloadAction<string>) => {
            state.title = action.payload;
        },
        renderBlocksInStorage: (state) => {
            // state.editorData = state.dataStorage;
        },

        createBlock: (state, action: PayloadAction<EditorBlock>) => {
            const searchBlock = state.editorData?.blocks.find(
                (block) => block.id === action.payload.id,
            );
            if (!searchBlock) {
                state.editorData?.blocks.push(action.payload);
            } else {
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
