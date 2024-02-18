import { User } from 'entities/User';

export interface CommentType {
    articleId: string;
    id: string;
    text: string;
    user: User;
}
