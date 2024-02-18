import { classNames } from 'shared/lib/classNames/classNames';
import { useCallback } from 'react';
import { editorActions } from 'features/Editor/model/slice/editorSlice';
import { useSelector } from 'react-redux';
import { getEditorTitle } from 'features/Editor/model/selectors/getEditorTitle/getEditorTitle';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { TextArea, TextAreaTextSize } from 'shared/ui/TextArea/TextArea';
import cls from './EditorTitle.module.scss';

interface EditorTitleProps {
    className?: string;
}

export const EditorTitle = (props: EditorTitleProps) => {
    const { className } = props;
    const title = useSelector(getEditorTitle);
    const dispatch = useAppDispatch();

    const onChangeTitle = useCallback(
        (title: string) => {
            dispatch(editorActions.setTitle(title));
        },
        [dispatch],
    );

    return (
        <TextArea
            placeholder="Заголовок"
            value={title}
            onChange={onChangeTitle}
            textSize={TextAreaTextSize.BIG}
            className={classNames(cls.EditorTitle, {}, [className])}
            height={Math.ceil((title.length + 30) / 100)}
        />
    );
};
