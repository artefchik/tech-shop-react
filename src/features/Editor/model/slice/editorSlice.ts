import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Profile } from 'entities/Profile';
import { SandboxPageSchema } from 'pages/SandboxPage/model/types/sandbox';
import {
    ArticleBlock,
    ArticleBlockType,
} from 'entities/Article/model/types/article';
import { EditorSchema } from 'features/Editor';
import {
    EditorBlock,
    ImageBlock,
    TextBlock,
} from 'features/Editor/model/types/editor';
import { a } from '@react-spring/web';

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
};

export const editorSlice = createSlice({
    name: 'editor',
    initialState,
    reducers: {
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
                block = {
                    ...block,
                    ...action.payload,
                };
                return block;
            });
        },
        onChangeTextInTextBlock: (state, action: PayloadAction<TextBlock>) => {
            state.blocks = state.blocks.map((block) => {
                block = {
                    ...block,
                    ...action.payload,
                };
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
