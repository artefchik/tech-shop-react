import { Rating } from 'entities/Rating';

export interface ArticleRating extends Rating {
    articleId: string;
    userId: string;
}
