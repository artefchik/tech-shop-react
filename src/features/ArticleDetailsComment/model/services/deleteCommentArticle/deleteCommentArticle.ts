import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { CommentType } from 'entities/Comment';
import axios from 'axios';
import { userActions } from 'entities/User';
import { articleDetailsCommentsActions } from 'features/ArticleDetailsComment/model/slice/articleDetailsCommentsSlice';
import { fetchCommentsByArticleId } from 'features/ArticleDetailsComment/model/services/fetchCommentByArticleId/fetchCommentByArticleId';
import { $api } from 'shared/api/api';

export const deleteCommentArticle = createAsyncThunk<
    CommentType,
    string | undefined,
    ThunkConfig<string>
>('articleDetailsComments/deleteCommentArticle', async (commentId, thunkApi) => {
    const { extra, rejectWithValue, dispatch } = thunkApi;

    if (!commentId) {
        return rejectWithValue('error');
    }

    try {
        const response = await $api.delete<CommentType>(`/comments/${commentId}`);

        if (!response.data) {
            throw new Error();
        }
        dispatch(fetchCommentsByArticleId(response.data.articleId));

        return response.data;
    } catch (e) {
        return rejectWithValue('error');
    }
});
