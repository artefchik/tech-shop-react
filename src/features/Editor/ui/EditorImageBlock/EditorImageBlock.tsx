import { classNames } from 'shared/lib/classNames/classNames';
import { useCallback, useState } from 'react';
import { VStack } from 'shared/ui/Stack';
import { Input, InputTextAlign, InputTheme } from 'shared/ui/Input/Input';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { UploadImage } from 'shared/ui/UploadImage/UploadImage';
import { ImageBlock } from '../../model/types/editor';
import { editorActions } from '../../model/slice/editorSlice';
import cls from './EditorImageBlock.module.scss';

interface EditorImageBlockProps {
    className?: string;
    item: ImageBlock;
    onClose: (value: string) => void;
}

export const EditorImageBlock = (props: EditorImageBlockProps) => {
    const { className, item, onClose } = props;

    const [title, setTitle] = useState(item.title);
    const dispatch = useAppDispatch();

    const onChangeTitle = useCallback((value: string) => {
        setTitle(value);
    }, []);
    const onChangeImage = useCallback(
        (block: ImageBlock) => {
            dispatch(
                editorActions.onChangeImageBlock({
                    id: block.id,
                    image: block.image,
                    type: block.type,
                    title,
                }),
            );
        },
        [dispatch, title],
    );

    return (
        <div className={classNames(cls.EditorImageBlock, {}, [className])}>
            <VStack className={cls.body} gap="10">
                <UploadImage
                    item={item}
                    text="Добавить картинку"
                    height={90}
                    onChangeImageBlock={onChangeImage}
                />
                <Input
                    className={cls.title}
                    theme={InputTheme.CLEAR}
                    placeholder="Подпись к изображению"
                    align={InputTextAlign.CENTER}
                    value={title}
                    onChange={onChangeTitle}
                />
            </VStack>
        </div>
    );
};
