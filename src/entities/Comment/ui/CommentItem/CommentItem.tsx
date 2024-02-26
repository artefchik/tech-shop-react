import { classNames } from 'shared/lib/classNames/classNames';
import { Card } from 'shared/ui/Card/Card';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { memo, useCallback } from 'react';
import { RoutePath } from 'shared/const/router';
import { HStack, VStack } from 'shared/ui/Stack';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import cls from './CommentItem.module.scss';
import { CommentType } from '../../model/types/comment';

interface CommentItemProps {
    className?: string;
    comment?: CommentType;
    isLoading?: boolean;
    onDeleteComment?: (id: string) => void;
}

export const CommentItem = memo((props: CommentItemProps) => {
    const { className, comment, isLoading, onDeleteComment } = props;
    const authData = useSelector(getUserAuthData);
    const isShowDelete = comment?.userId === authData?._id;

    const onDeleteClick = useCallback(
        (id: string) => () => {
            onDeleteComment?.(id);
        },
        [],
    );

    if (!comment) {
        return null;
    }

    return (
        <Card className={classNames(cls.CommentItem, {}, [className])}>
            <HStack align="center">
                <VStack width gap="5">
                    {/* <AppLink */}
                    {/*    to={`${RoutePath.profile}${comment.user._id}`} */}
                    {/*    className={cls.header} */}
                    {/*    theme={AppLinkTheme.CLEAR} */}
                    {/* > */}
                    {/*    /!* {comment.user.avatar && ( *!/ */}
                    {/*    /!*    <Avatar *!/ */}
                    {/*    /!*        src={comment.user.avatar} *!/ */}
                    {/*    /!*        alt={comment.user.username} *!/ */}
                    {/*    /!*    /> *!/ */}
                    {/*    /!* )} *!/ */}
                    {/*    /!* <Text text={comment.user.username} /> *!/ */}
                    {/* </AppLink> */}
                    <Text text={comment.text} theme={TextTheme.TEXT} />
                </VStack>
                {isShowDelete && (
                    <Button
                        theme={ThemeButton.DELETE}
                        onClick={onDeleteClick(comment._id)}
                    />
                )}
            </HStack>
        </Card>
    );
});
