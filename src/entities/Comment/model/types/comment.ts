import { User } from 'entities/User';

export interface CommentType {
    _id: string;
    articleId: string;
    text: string;
    userId: string;
}
