import { classNames } from 'shared/lib/classNames/classNames';
import { Input, InputTextSize, InputTheme } from 'shared/ui/Input/Input';
import { useCallback, useState } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { VStack } from 'shared/ui/Stack';
import { TextArea } from 'shared/ui/TextArea/TextArea';
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce';
import { editorActions } from '../../model/slice/editorSlice';
import cls from './EditorBaseBlock.module.scss';
import { TextBlock } from '../../model/types/editor';

interface EditorBaseBlockProps {
    className?: string;
    item: TextBlock;
    onClose: (value: string) => void;
}

export const EditorBaseBlock = (props: EditorBaseBlockProps) => {
    const { className, item, onClose } = props;
    const [title, setTitle] = useState(item.title);
    const dispatch = useAppDispatch();
    const [text, setText] = useState('');
    const onChangeTitle = useCallback(
        (value: string) => {
            setTitle(value);
            onClose(value);
            dispatch(
                editorActions.onChangeTitleInTextBlock({
                    id: item.id,
                    title: value,
                    type: item.type,
                }),
            );
        },
        [dispatch, item.id, item.type, onClose],
    );

    const onChangeText = useCallback(
        (value: string) => {
            setText(value);
            onClose(value);
            dispatch(
                editorActions.onChangeTextInTextBlock({
                    id: item.id,
                    type: item.type,
                    paragraphs: [value],
                }),
            );
        },
        [dispatch, item.id, item.type],
    );

    return (
        <VStack
            width
            gap="10"
            className={classNames(cls.EditorBaseBlock, {}, [className])}
        >
            <Input
                value={title}
                theme={InputTheme.CLEAR}
                autoFocus
                placeholder="Заголовок"
                onChange={onChangeTitle}
                className={cls.input}
                textSize={InputTextSize.MEDIUM}
            />
            <TextArea
                placeholder="Введите текст"
                onChange={onChangeText}
                value={text}
                height={Math.ceil((text.length + 40) / 100)}
            />
        </VStack>
    );
};
