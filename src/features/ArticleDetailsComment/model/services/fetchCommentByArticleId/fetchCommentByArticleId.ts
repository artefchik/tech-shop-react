import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { CommentType } from 'entities/Comment';
import axios from 'axios';
import { $api } from 'shared/api/api';
import { ArticleCommentType } from 'entities/Comment/model/types/comment';

export const fetchCommentsByArticleId = createAsyncThunk<
    ArticleCommentType,
    string | undefined,
    ThunkConfig<string>
>('articleDetailsComments/fetchCommentsByArticleId', async (articleId, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    if (!articleId) {
        return rejectWithValue('error');
    }

    try {
        const response = await $api.get<ArticleCommentType>(
            `/articles/comments/${articleId}`,
            {
                // params: {
                //     articleId,
                //     _expand: 'user',
                // },
            },
        );

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (e) {
        return rejectWithValue('error');
    }
});
