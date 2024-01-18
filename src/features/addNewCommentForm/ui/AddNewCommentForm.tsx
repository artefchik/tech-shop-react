import { classNames } from 'shared/lib/classNames/classNames';
import { Input } from 'shared/ui/Input/Input';
import { FormEvent, useCallback, useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { DynamicModelLoader } from 'shared/lib/components/DynamicModelLoader/DynamicModelLoader';
import { Button } from 'shared/ui/Button/Button';
import { Card } from 'shared/ui/Card/Card';
import { getUserAuthData } from 'entities/User';
import { Text } from 'shared/ui/Text/Text';
import cls from './AddNewCommentForm.module.scss';
import {
    getAddNewCommentFormText,
} from '../model/selectors/getAddNewCommentFormText/getAddNewCommentFormText';
import { addNewCommentFormActions, addNewCommentFormReducer } from '../model/slice/addNewCommentFormSlice';

interface AddNewCommentFormProps {
    className?: string;
    onSendComment:(text:string)=>void
}

export const AddNewCommentForm = (props: AddNewCommentFormProps) => {
    const { className, onSendComment } = props;
    const dispatch = useAppDispatch();
    const text = useSelector(getAddNewCommentFormText);

    const authData = useSelector(getUserAuthData);

    const onCommentChangeText = useCallback((value:string) => {
        dispatch(addNewCommentFormActions.setText(value));
    }, [dispatch]);

    const onSendCommentHandler = useCallback((event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSendComment(text || '');
        onCommentChangeText('');
    }, [onCommentChangeText, onSendComment, text]);

    return (
        <DynamicModelLoader name="addNewCommentForm" reducer={addNewCommentFormReducer}>
            <Card>
                <form onSubmit={onSendCommentHandler} className={classNames(cls.AddNewCommentForm, {}, [className])}>
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
                                title="Оставлять комментарии могут только зарегистрированные пользователи..."
                                className={cls.input}
                            />
                            <Button>Войти</Button>
                        </>
                    )}
                </form>
            </Card>
        </DynamicModelLoader>
    );
};
