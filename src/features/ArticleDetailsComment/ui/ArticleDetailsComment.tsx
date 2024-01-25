import { classNames } from 'shared/lib/classNames/classNames';
import { CommentForm, CommentList } from 'entities/Comment';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { VStack } from 'shared/ui/Stack';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { getUserAuthData } from 'entities/User';
import { DynamicModelLoader } from 'shared/lib/components/DynamicModelLoader/DynamicModelLoader';
import {
    getArticleDetailsCommentsText,
} from '../model/selectors/getArticleDetailsCommentsText/getArticleDetailsCommentsText';
import {
    getArticleDetailsCommentsIsLoading,
} from '../model/selectors/getArticleDetailsCommentsIsLoading/getArticleDetailsCommentsIsLoading';
import {
    addCommentForArticle,
} from '../model/services/addNewCommentForArticle/addNewCommentForArticle';
import {
    fetchCommentsByArticleId,
} from '../model/services/fetchCommentByArticleId/fetchCommentByArticleId';
import {
    articleDetailsCommentsActions,
    articleDetailsCommentsReducer,
} from '../model/slice/articleDetailsCommentsSlice';
import {
    getArticleDetailsCommentsData,
} from '../model/selectors/getArticleDetailsCommentsData/getArticleDetailsCommentsData';
import cls from './ArticleDetailsComment.module.scss';

interface ArticleDetailsCommentProps {
    className?: string;
    id:string
}

export const ArticleDetailsComment = (props: ArticleDetailsCommentProps) => {
    const { className, id } = props;
    const authData = useSelector(getUserAuthData);
    const dispatch = useAppDispatch();
    const comments = useSelector(getArticleDetailsCommentsData);
    const isLoading = useSelector(getArticleDetailsCommentsIsLoading);
    const text = useSelector(getArticleDetailsCommentsText);

    const onCommentChangeText = useCallback((value:string) => {
        dispatch(articleDetailsCommentsActions.setText(value));
    }, [dispatch]);

    const onSendComment = useCallback((text: string) => {
        dispatch(addCommentForArticle(text));
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
    }, [dispatch, id]);

    return (
        <DynamicModelLoader name="articleDetailsComments" reducer={articleDetailsCommentsReducer}>
            <VStack gap="20" className={classNames(cls.ArticleDetailsComment, {}, [className])}>
                <Text
                    size={TextSize.BIG}
                    title="Комментарии"
                    className={cls.commentTitle}
                />
                <CommentForm
                    onSendComment={onSendComment}
                    onCommentChangeText={onCommentChangeText}
                    text={text}
                    authData={authData}
                />
                <CommentList comments={comments} isLoading={isLoading} />
            </VStack>
        </DynamicModelLoader>

    );
};
