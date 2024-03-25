import { useCallback, useState } from 'react';
import { VStack } from 'shared/ui/Stack';
import { Input, InputTextAlign, InputTheme } from 'shared/ui/Input/Input';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { UploadImage } from 'shared/ui/UploadImage/UploadImage';
import {
    ArticleBlockType,
    ArticleImageBlock,
} from 'entities/Article/model/types/article';
import { useTranslation } from 'react-i18next';
import { editorActions } from '../../model/slice/editorSlice';

interface EditorImageBlockProps {
    className?: string;
    item: ArticleImageBlock;
    onClose?: (value: string) => void;
}

export const EditorImageBlock = (props: EditorImageBlockProps) => {
    const { className, item, onClose } = props;
    const { t } = useTranslation();

    const [title, setTitle] = useState(item.title ?? '');
    const dispatch = useAppDispatch();

    const onChangeTitle = useCallback(
        (value: string) => {
            setTitle(value);
            dispatch(
                editorActions.onChangeImageBlock({
                    _id: item._id,
                    type: ArticleBlockType.IMAGE,
                    title,
                }),
            );
        },
        [dispatch, item._id, title],
    );

    const onChangeImage = useCallback(
        (image: string) => {
            dispatch(
                editorActions.onChangeImageBlock({
                    _id: item._id,
                    type: ArticleBlockType.IMAGE,
                    src: image,
                    title,
                }),
            );
        },
        [dispatch, item._id, title],
    );

    return (
        <VStack className={className} gap="10">
            <UploadImage
                image={item.src}
                text={t('Add an image')}
                height={90}
                onChangeImageBlock={onChangeImage}
            />
            <Input
                theme={InputTheme.CLEAR}
                placeholder={t('Image caption')}
                align={InputTextAlign.CENTER}
                value={title}
                onChange={onChangeTitle}
            />
        </VStack>
    );
};
