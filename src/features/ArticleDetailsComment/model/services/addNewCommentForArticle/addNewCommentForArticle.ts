import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserAuthData } from 'entities/User';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { CommentType } from 'entities/Comment/model/types/comment';
import { getArticleDetailsData } from 'entities/Article';
import { fetchCommentsByArticleId } from '../fetchCommentByArticleId/fetchCommentByArticleId';

export const addCommentForArticle = createAsyncThunk<
    CommentType,
    string,
    ThunkConfig<string>
>('articleDetails/addCommentForArticle', async (text, thunkApi) => {
    const { extra, dispatch, rejectWithValue, getState } = thunkApi;

    const userData = getUserAuthData(getState());
    const article = getArticleDetailsData(getState());

    if (!userData || !text || !article) {
        return rejectWithValue('no data');
    }

    try {
        const response = await extra.api.post<CommentType>(
            'http://localhost:8000/comments',
            {
                articleId: article._id,
                userId: userData._id,
                text,
            },
        );

        if (!response.data) {
            throw new Error();
        }

        dispatch(fetchCommentsByArticleId(article._id));

        return response.data;
    } catch (e) {
        return rejectWithValue('error');
    }
});
