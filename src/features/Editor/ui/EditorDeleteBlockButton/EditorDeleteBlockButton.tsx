import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { editorActions } from '../../model/slice/editorSlice';
import cls from './EditorDeleteBlockButton.module.scss';

interface EditorDeleteBlockButtonProps {
    className?: string;
    id: string;
}

export const EditorDeleteBlockButton = (
    props: EditorDeleteBlockButtonProps,
) => {
    const { className, id } = props;
    const dispatch = useAppDispatch();

    const onDeleteBlock = useCallback(() => {
        dispatch(editorActions.deleteBlock(id));
    }, [dispatch, id]);

    return (
        <Button
            onClick={onDeleteBlock}
            theme={ThemeButton.CLEAR}
            className={classNames(cls.EditorDeleteBlockButton, {}, [className])}
        />
    );
};
