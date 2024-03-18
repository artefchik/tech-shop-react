import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { useCallback, useEffect } from 'react';
import { RatingCard } from 'entities/Rating';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useTranslation } from 'react-i18next';
import { createArticleDetailsRating } from '../model/services/createArticleRating/createArticleDetailsRating';
import { fetchArticleDetailsRating } from '../model/services/fetchArticleRating/fetchArticleDetailsRating';
import { articleDetailsRatingReducer } from '../model/slice/articleDetailsRatingSlice';
import { getArticleDetailsRatingData } from '../model/selectors/getArticleDetailsRatingData/getArticleDetailsRatingData';

interface ArticleDetailsRatingProps {
    className?: string;
    articleId: string;
}

const reducers: ReducersList = {
    articleDetailsRating: articleDetailsRatingReducer,
};

export const ArticleDetailsRating = (props: ArticleDetailsRatingProps) => {
    const { className, articleId } = props;
    const userData = useSelector(getUserAuthData);
    const dispatch = useAppDispatch();
    const articleRating = useSelector(getArticleDetailsRatingData);
    const { t } = useTranslation();

    useEffect(() => {
        dispatch(fetchArticleDetailsRating(articleId));
    }, [articleId, dispatch]);

    const handleCreateArticleRating = useCallback(
        (starsCount: number, feedback?: string) => {
            dispatch(
                createArticleDetailsRating({
                    articleId,
                    rate: starsCount,
                    feedback: feedback || '',
                    userId: userData?.id ?? '',
                }),
            );
        },
        [articleId, dispatch, userData?.id],
    );

    const onAccept = useCallback(
        (starsCount: number, feedback?: string) => {
            handleCreateArticleRating(starsCount, feedback);
        },
        [handleCreateArticleRating],
    );

    const onCancel = useCallback(
        (starsCount: number) => {
            handleCreateArticleRating(starsCount);
        },
        [handleCreateArticleRating],
    );

    if (!userData?.id) {
        return null;
    }

    const rating = articleRating?.rate ? articleRating.rate : 0;

    return (
        <RatingCard
            rate={rating}
            className={className}
            onAccept={onAccept}
            onCancel={onCancel}
            title={t('Please rate the article')}
            feedbackTitle={t('Please leave a review')}
            hasFeedback
        />
    );
};
