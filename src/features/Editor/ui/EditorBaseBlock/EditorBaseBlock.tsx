import { useCallback, useState } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { VStack } from 'shared/ui/Stack';
import { TextArea, TextAreaTextSize } from 'shared/ui/TextArea/TextArea';
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce';
import { ArticleTextBlock } from 'entities/Article/model/types/article';
import { editorActions } from '../../model/slice/editorSlice';

interface EditorBaseBlockProps {
    className?: string;
    item: ArticleTextBlock;
    onClose?: (value: string) => void;
}

export const EditorBaseBlock = (props: EditorBaseBlockProps) => {
    const { className, item, onClose } = props;
    const [title, setTitle] = useState(item.title ?? '');
    const [paragraph, setParagraph] = useState(item.paragraph ?? '');
    const dispatch = useAppDispatch();

    const onChangeBlock = useCallback(() => {
        dispatch(
            editorActions.onChangeTextBlock({
                _id: item._id,
                type: item.type,
                title,
                paragraph,
            }),
        );
    }, [dispatch, item._id, item.type, title, paragraph]);

    const debounceChange = useDebounce(onChangeBlock, 600);

    const onChangeTitle = useCallback(
        (value: string) => {
            setTitle(value);
            onClose?.(value);
            debounceChange();
        },
        [debounceChange, onClose],
    );
    const onChangeText = useCallback(
        (value: string) => {
            setParagraph(value);
            onClose?.(value);
            debounceChange();
        },
        [debounceChange, onClose],
    );

    return (
        <VStack width gap="5" className={className}>
            <TextArea
                textSize={TextAreaTextSize.MEDIUM}
                placeholder="Заголовок"
                onChange={onChangeTitle}
                value={title}
            />
            <TextArea
                placeholder="Введите текст"
                onChange={onChangeText}
                value={paragraph}
            />
        </VStack>
    );
};
