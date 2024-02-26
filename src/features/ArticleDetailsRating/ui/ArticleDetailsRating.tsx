import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import {
    useChangeArticleDetailsRating,
    useGetArticleDetailsRating,
} from 'features/ArticleDetailsRating/api/articleRatingApi';
import { useCallback } from 'react';
import { RatingCard } from 'entities/Rating';

interface ArticleDetailsRatingProps {
    className?: string;
    articleId: string;
}

const ArticleDetailsRatingAsync = (props: ArticleDetailsRatingProps) => {
    const { className, articleId } = props;
    const userData = useSelector(getUserAuthData);

    const { data, isLoading } = useGetArticleDetailsRating({
        articleId,
        userId: userData?._id ?? '',
    });

    const [changeArticleRatingMutation] = useChangeArticleDetailsRating();

    const handleChangeArticleRatingMutation = useCallback(
        (starsCount: number, feedback?: string) => {
            try {
                changeArticleRatingMutation({
                    articleId,
                    userId: userData?._id ?? '',
                    rate: starsCount,
                    feedback,
                });
            } catch (e) {
                console.log(e);
            }
        },
        [articleId, changeArticleRatingMutation, userData?._id],
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
export default ArticleDetailsRatingAsync;
