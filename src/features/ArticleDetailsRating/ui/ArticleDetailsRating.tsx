import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { useCallback } from 'react';
import { RatingCard } from 'entities/Rating';
import {
    useChangeArticleDetailsRating,
    useGetArticleDetailsRating,
} from '../api/articleRatingApi';

interface ArticleDetailsRatingProps {
    className?: string;
    articleId: string;
}

const ArticleDetailsRating = (props: ArticleDetailsRatingProps) => {
    const { className, articleId } = props;
    const userData = useSelector(getUserAuthData);

    const { data, isLoading } = useGetArticleDetailsRating({
        articleId,
        userId: userData?.id ?? '',
    });

    const [changeArticleRatingMutation] = useChangeArticleDetailsRating();

    const handleChangeArticleRatingMutation = useCallback(
        (starsCount: number, feedback?: string) => {
            try {
                changeArticleRatingMutation({
                    articleId,
                    userId: userData?.id ?? '',
                    rate: starsCount,
                    feedback,
                });
            } catch (e) {
                console.log(e);
            }
        },
        [articleId, changeArticleRatingMutation, userData?.id],
    );

    const onAccept = useCallback(
        (starsCount: number, feedback?: string) => {
            handleChangeArticleRatingMutation(starsCount, feedback);
        },
        [handleChangeArticleRatingMutation],
    );

    const onCancel = useCallback(
        (starsCount: number) => {
            handleChangeArticleRatingMutation(starsCount);
        },
        [handleChangeArticleRatingMutation],
    );

    const rating = data?.[0];

    if (isLoading) {
        return null;
    }

    return (
        <RatingCard
            rate={rating?.rate}
            className={className}
            onAccept={onAccept}
            onCancel={onCancel}
            title="Оцените статью"
            feedbackTitle="Оставьте отзыв"
            hasFeedback
        />
    );
};
export default ArticleDetailsRating;
