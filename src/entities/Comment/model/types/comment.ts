import { User } from 'entities/User';

export interface CommentType {
    id: string;
    articleId: string;
    text: string;
    user: User;
}
