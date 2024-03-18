import { rtkApi } from 'shared/api/rtkApi';
import { Rating } from 'entities/Rating';

interface GetArticleDetailsRatingArg {
    articleId: string;
    userId: string;
}
interface ChangeArticleDetailsRatingArg {
    rate: number;
    feedback?: string;
    articleId: string;
    userId: string;
}

const articleRatingApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleDetailsRating: build.query<
            Rating[],
            GetArticleDetailsRatingArg
        >({
            query: ({ articleId, userId }) => ({
                url: `/articles/rating/${articleId}`,
                params: {
                    userId,
                },
            }),
        }),
        changeArticleRating: build.mutation<
            null,
            ChangeArticleDetailsRatingArg
        >({
            query: (arg) => ({
                url: `/articles/rating/${arg.articleId}`,
                method: 'POST',
                body: arg,
            }),
        }),
    }),
});

export const useGetArticleDetailsRating =
    articleRatingApi.useGetArticleDetailsRatingQuery;
export const useChangeArticleDetailsRating =
    articleRatingApi.useChangeArticleRatingMutation;
