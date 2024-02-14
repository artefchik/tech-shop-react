import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArticleBlockType } from 'entities/Article/model/types/article';
import { EditorSchema } from 'features/Editor';
import { getStorageItem } from 'shared/lib/helpers/localStorage';
import {
    EDITOR_CREATED_LOCALSTORAGE_KEY,
    EDITOR_LOCALSTORAGE_KEY,
} from 'shared/const/localStorage';
import {
    DateChange,
    EditorBlock,
    ImageBlock,
    TextBlock,
} from '../types/editor';

const initialState: EditorSchema = {
    title: '',
    blocks: [
        {
            id: '1',
            type: ArticleBlockType.TEXT,
            title: '',
            paragraphs: [],
        },
    ],
    dateChange: {
        hour: 0,
        minutes: 0,
    },
    _showBlocks: false,
    _inited: false,
};

export const editorSlice = createSlice({
    name: 'editor',
    initialState,
    reducers: {
        showBlocks: (state) => {
            state._showBlocks = true;
        },
        initEditor: (state) => {
            const data = getStorageItem(EDITOR_LOCALSTORAGE_KEY);
            const dateTime = getStorageItem(EDITOR_CREATED_LOCALSTORAGE_KEY);
            if (dateTime) {
                state.dateChange = dateTime;
            }
            if (data) {
                state.title = data.title;
                state.blocks = data.blocks;
            }
            state._inited = true;
        },
        setTitle: (state, action: PayloadAction<string>) => {
            state.title = action.payload;
        },

        createBlock: (state, action: PayloadAction<EditorBlock>) => {
            const searchBlock = state.blocks.find(
                (block) => block.id === action.payload.id,
            );
            if (!searchBlock) {
                state.blocks.push(action.payload);
            } else {
                state.blocks = state.blocks.map((block) => {
                    if (block.id === action.payload.id) {
                        block = {
                            ...block,
                            ...action.payload,
                        };
                    }
                    return block;
                });
            }
        },
        onChangeTitleInTextBlock: (state, action: PayloadAction<TextBlock>) => {
            state.blocks = state.blocks.map((block) => {
                if (block.id === action.payload.id) {
                    block = {
                        ...block,
                        title: action.payload.title,
                    };
                }
                return block;
            });
        },
        onChangeTextInTextBlock: (state, action: PayloadAction<TextBlock>) => {
            state.blocks = state.blocks.map((block) => {
                if (block.id === action.payload.id) {
                    block = {
                        ...block,
                        paragraphs: action.payload.paragraphs,
                    };
                }
                return block;
            });
        },
        onChangeImageBlock: (state, action: PayloadAction<ImageBlock>) => {
            state.blocks = state.blocks.map((block) => {
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
            state.blocks.push(action.payload);
        },
        deleteBlock: (state, action: PayloadAction<string>) => {
            state.blocks = state.blocks.filter(
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
