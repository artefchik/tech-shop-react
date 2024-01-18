import { classNames } from 'shared/lib/classNames/classNames';
import { Card } from 'shared/ui/Card/Card';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import cls from './CommentItem.module.scss';
import { CommentType } from '../../model/types/comment';

interface CommentItemProps {
    className?: string;
    comment?:CommentType;
    isLoading?:boolean

}

export const CommentItem = (props: CommentItemProps) => {
    const { className, comment, isLoading } = props;

    if (!comment) {
        return null;
    }
    return (
        <Card className={classNames(cls.CommentItem, {}, [className])}>
            <AppLink to={`${RoutePath.profile}${comment.user.id}`} className={cls.header}>
                {comment.user.avatar && <Avatar src={comment.user.avatar} alt={comment.user.username} />}
                <Text title={comment.user.username} />
            </AppLink>
            <Text text={comment.text} theme={TextTheme.TEXT} />
        </Card>
    );
};
