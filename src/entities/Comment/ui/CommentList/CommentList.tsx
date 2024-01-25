import { classNames } from 'shared/lib/classNames/classNames';
import { CommentItem } from 'entities/Comment/ui/CommentItem/CommentItem';
import { memo } from 'react';
import cls from './CommentList.module.scss';
import { CommentType } from '../../model/types/comment';

interface CommentListProps {
    className?: string;
    comments?:CommentType[];
    isLoading?:boolean
}

export const CommentList = memo((props: CommentListProps) => {
    const {
        className,
        comments,
        isLoading,
    } = props;
    return (
        <div className={classNames(cls.CommentList, {}, [className])}>
            {comments?.map((comment) => (
                <CommentItem comment={comment} isLoading={isLoading} key={comment.id} />
            ))}
        </div>
    );
});
