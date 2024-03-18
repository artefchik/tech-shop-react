import { ArticleRating } from './articleRating';

export interface ArticleDetailsRatingSchema {
    data: ArticleRating;
    isLoading: boolean;
    error?: string;
}
