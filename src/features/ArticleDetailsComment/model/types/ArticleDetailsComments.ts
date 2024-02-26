import { CommentType } from 'entities/Comment';
import { ArticleCommentType } from 'entities/Comment/model/types/comment';

export interface ArticleDetailsCommentsSchema {
    isLoading: boolean;
    error?: string;
    data?: ArticleCommentType;
    text?: string;
}
