import { classNames } from 'shared/lib/classNames/classNames';
import { CommentForm, CommentList } from 'entities/Comment';
import { Text, TextSize, TextTheme, TextWeight } from 'shared/ui/Text/Text';
import { HStack, VStack } from 'shared/ui/Stack';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { getUserAuthData } from 'entities/User';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useTranslation } from 'react-i18next';
import { deleteCommentArticle } from '../model/services/deleteCommentArticle/deleteCommentArticle';
import { getArticleDetailsCommentsText } from '../model/selectors/getArticleDetailsCommentsText/getArticleDetailsCommentsText';
import { getArticleDetailsCommentsIsLoading } from '../model/selectors/getArticleDetailsCommentsIsLoading/getArticleDetailsCommentsIsLoading';
import { addCommentForArticle } from '../model/services/addNewCommentForArticle/addNewCommentForArticle';
import {
    articleDetailsCommentsActions,
    articleDetailsCommentsReducer,
} from '../model/slice/articleDetailsCommentsSlice';
import { getArticleDetailsCommentsData } from '../model/selectors/getArticleDetailsCommentsData/getArticleDetailsCommentsData';
import { fetchCommentsByArticleId } from '../model/services/fetchCommentByArticleId/fetchCommentByArticleId';

interface ArticleDetailsCommentProps {
    className?: string;
    articleId: string;
}

const reducers: ReducersList = {
    articleDetailsComments: articleDetailsCommentsReducer,
};

export const ArticleDetailsComment = (props: ArticleDetailsCommentProps) => {
    const { className, articleId } = props;
    const { t } = useTranslation();
    const authData = useSelector(getUserAuthData);
    const dispatch = useAppDispatch();
    const comments = useSelector(getArticleDetailsCommentsData);
    const isLoading = useSelector(getArticleDetailsCommentsIsLoading);
    const text = useSelector(getArticleDetailsCommentsText);

    const onCommentChangeText = useCallback(
        (value: string) => {
            dispatch(articleDetailsCommentsActions.setText(value));
        },
        [dispatch],
    );

    const onSendComment = useCallback(
        (text: string) => {
            dispatch(addCommentForArticle(text));
        },
        [dispatch],
    );

    useEffect(() => {
        dispatch(fetchCommentsByArticleId(articleId));
    }, [dispatch, articleId]);

    const onDeleteComment = useCallback(
        (id: string) => {
            dispatch(articleDetailsCommentsActions.deleteComment(id));
            dispatch(deleteCommentArticle(id));
        },
        [dispatch],
    );

    return (
        <DynamicModuleLoader reducers={reducers}>
            <VStack gap="20" className={className}>
                <HStack gap="10">
                    <Text
                        size={TextSize.BIG}
                        text={t('Comments')}
                        weight={TextWeight.SEMI}
                    />
                    <Text
                        size={TextSize.BIG}
                        text={String(comments?.length)}
                        theme={TextTheme.TEXT}
                        weight={TextWeight.SEMI}
                    />
                </HStack>
                <CommentForm
                    onSendComment={onSendComment}
                    onCommentChangeText={onCommentChangeText}
                    text={text}
                    authData={authData}
                />
                <CommentList
                    comments={comments}
                    isLoading={isLoading}
                    onDeleteComment={onDeleteComment}
                />
            </VStack>
        </DynamicModuleLoader>
    );
};
