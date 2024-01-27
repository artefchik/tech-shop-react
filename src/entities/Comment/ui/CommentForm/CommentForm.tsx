import { classNames } from 'shared/lib/classNames/classNames';
import { Input } from 'shared/ui/Input/Input';
import { Button } from 'shared/ui/Button/Button';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { Card } from 'shared/ui/Card/Card';
import { FormEvent, memo, useCallback } from 'react';
import { User } from 'entities/User';
import { useToggleModal } from 'shared/lib/hooks/useToggleModal/useToggleModal';
import { LoginModal } from 'features/AuthByUsername';
import cls from './CommentForm.module.scss';

interface CommentFormProps {
  className?: string;
  onSendComment?: (text: string) => void;
  onCommentChangeText?: (value: string) => void;
  text?:string;
  authData?:User
}

export const CommentForm = memo((props: CommentFormProps) => {
    const {
        className,
        onSendComment,
        onCommentChangeText,
        text,
        authData,
    } = props;
    const { isOpenModal, onCloseModal, onShowModal } = useToggleModal();

    const onSendCommentHandler = useCallback((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSendComment?.(text || '');
        onCommentChangeText?.('');
    }, [onCommentChangeText, onSendComment, text]);

    return (
        <Card>
            <form onSubmit={onSendCommentHandler} className={classNames(cls.CommentForm, {}, [className])}>
                {authData ? (
                    <>
                        <Input
                            onChange={onCommentChangeText}
                            value={text}
                            placeholder="Введите текст комментария"
                            className={cls.input}
                        />
                        <Button type="submit">Отправить</Button>
                    </>
                ) : (
                    <>
                        <Text
                            theme={TextTheme.TEXT}
                            size={TextSize.DEFAULT}
                            title="Оставлять комментарии могут только зарегистрированные пользователи..."
                            className={cls.input}
                        />
                        <Button onClick={onShowModal}>Войти</Button>
                        {isOpenModal && <LoginModal isOpen={isOpenModal} onClose={onCloseModal} />}
                    </>
                )}
            </form>
        </Card>
    );
});