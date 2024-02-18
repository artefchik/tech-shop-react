import { useCallback, useState } from 'react';
import { VStack } from 'shared/ui/Stack';
import { Input, InputTextAlign, InputTheme } from 'shared/ui/Input/Input';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { UploadImage } from 'shared/ui/UploadImage/UploadImage';
import { ArticleBlockType } from 'entities/Article/model/types/article';
import { ImageBlock } from '../../model/types/editor';
import { editorActions } from '../../model/slice/editorSlice';

interface EditorImageBlockProps {
    className?: string;
    item: ImageBlock;
    onClose?: (value: string) => void;
}

export const EditorImageBlock = (props: EditorImageBlockProps) => {
    const { className, item, onClose } = props;

    const [title, setTitle] = useState(item.title);
    const dispatch = useAppDispatch();

    const onChangeTitle = useCallback((value: string) => {
        setTitle(value);
    }, []);

    const onChangeImage = useCallback(
        (image: string) => {
            dispatch(
                editorActions.onChangeImageBlock({
                    id: item.id,
                    type: ArticleBlockType.IMAGE,
                    image,
                    title,
                }),
            );
        },
        [dispatch, item.id, title],
    );

    return (
        <VStack className={className} gap="10">
            <UploadImage
                image={item.image}
                text="Добавить картинку"
                height={90}
                onChangeImageBlock={onChangeImage}
            />
            <Input
                theme={InputTheme.CLEAR}
                placeholder="Подпись к изображению"
                align={InputTextAlign.CENTER}
                value={title}
                onChange={onChangeTitle}
            />
        </VStack>
    );
};
