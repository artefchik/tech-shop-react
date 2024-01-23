import { useParams } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import { ArticleDetails } from 'entities/Article';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { Container } from 'shared/ui/Container/Container';
import { AddNewCommentForm } from 'features/addNewCommentForm/ui/AddNewCommentForm';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useCallback, useEffect } from 'react';
import { DynamicModelLoader } from 'shared/lib/components/DynamicModelLoader/DynamicModelLoader';
import { useSelector } from 'react-redux';
import { CommentList } from 'entities/Comment';
import { Page } from 'shared/ui/Page/Page';
import {
    ArticleDetailsHeaderPage,
} from '../ArticleDetailsHeaderPage/ArticleDetailsHeaderPage';
import {
    getArticleDetailsCommentsIsLoading,
} from '../../model/selectors/getArticleDetailsCommentsIsLoading/getArticleDetailsCommentsIsLoading';
import {
    getArticleDetailsCommentsData,
} from '../../model/selectors/getArticleDetailsCommentsData/getArticleDetailsCommentsData';
import {
    addCommentForArticle,
} from '../../model/services/addNewCommentForArticle/addNewCommentForArticle';
import {
    fetchCommentsByArticleId,
} from '../../model/services/fetchCommentByArticleId/fetchCommentByArticleId';
import cls from './ArticleDetailsPage.module.scss';
import { articleDetailsCommentsReducer } from '../../model/slice/articleDetailsCommentsSlice';

interface ArticleDetailsPageProps {
    className?: string;
}

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const { className } = props;
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const comments = useSelector(getArticleDetailsCommentsData);
    const isLoading = useSelector(getArticleDetailsCommentsIsLoading);

    const onSendComment = useCallback((text: string) => {
        dispatch(addCommentForArticle(text));
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchCommentsByArticleId(id));
    }, [dispatch, id]);

    if (!id) {
        return <Text title="Статья не найдена" size={TextSize.BIG} />;
    }

    return (
        <DynamicModelLoader name="articleDetailsComments" reducer={articleDetailsCommentsReducer}>
            <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                <Container className={cls.body}>
                    <ArticleDetailsHeaderPage />
                    <ArticleDetails id={id} className={cls.article} />
                    <Text size={TextSize.BIG} title="Комментарии" className={cls.commentTitle} />
                    <AddNewCommentForm onSendComment={onSendComment} />
                    <CommentList comments={comments} isLoading={isLoading} />
                </Container>
            </Page>
        </DynamicModelLoader>
    );
};
export default ArticleDetailsPage;
