import { useCallback, useState } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { VStack } from 'shared/ui/Stack';
import { TextArea, TextAreaTextSize } from 'shared/ui/TextArea/TextArea';
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce';
import { ArticleTextBlock } from 'entities/Article/model/types/article';
import { useTranslation } from 'react-i18next';
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
    const { t } = useTranslation();
    const onChangeTextBlock = useCallback(
        (value: string) => {
            dispatch(
                editorActions.onChangeTextBlock({
                    _id: item._id,
                    type: item.type,
                    title,
                    paragraph: value,
                }),
            );
        },
        [dispatch, item._id, item.type, title, paragraph],
    );

    const onChangeTitleBlock = useCallback(
        (value: string) => {
            dispatch(
                editorActions.onChangeTextBlock({
                    _id: item._id,
                    type: item.type,
                    title: value,
                    paragraph,
                }),
            );
        },
        [dispatch, item._id, item.type, paragraph],
    );

    // const debounceChange = useDebounce(onChangeBlock, 600);

    const onChangeTitle = useCallback(
        (value: string) => {
            setTitle(value);
            onClose?.(value);
            onChangeTitleBlock(value);
        },
        [onChangeTitleBlock, onClose],
    );
    const onChangeText = useCallback(
        (value: string) => {
            setParagraph(value);
            onClose?.(value);
            onChangeTextBlock(value);
        },
        [onChangeTextBlock, onClose],
    );

    return (
        <VStack width gap="5" className={className}>
            <TextArea
                textSize={TextAreaTextSize.MEDIUM}
                placeholder={t('The title')}
                onChange={onChangeTitle}
                value={title}
            />
            <TextArea
                placeholder={t('Enter the text')}
                onChange={onChangeText}
                value={paragraph}
            />
        </VStack>
    );
};
