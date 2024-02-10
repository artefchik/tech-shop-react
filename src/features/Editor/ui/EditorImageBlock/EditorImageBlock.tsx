import { classNames } from 'shared/lib/classNames/classNames';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { VStack } from 'shared/ui/Stack';
import { Input, InputTextAlign, InputTheme } from 'shared/ui/Input/Input';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ArticleBlockType } from 'entities/Article/model/types/article';
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

    const [image, setImage] = useState<File>();
    const [imageURL, setImageURL] = useState<string | ArrayBuffer | null>();
    const [title, setTitle] = useState(item.title);
    const dispatch = useAppDispatch();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const fileReader = new FileReader();
    fileReader.onloadend = (readerEvent: ProgressEvent<FileReader>) => {
        if (readerEvent?.target?.result) {
            setImageURL(fileReader.result);
        }
    };
    fileReader.onerror = () => {
        setImageURL('не удалось загрузить мзображение');
    };
    const onChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files) {
            const file = e.target.files?.[0];
            setImage(file);
            fileReader.readAsDataURL(file);
        }
    };
    const onChangeTitle = useCallback((value: string) => {
        setTitle(value);
    }, []);

    useEffect(() => {
        onClose(imageURL as string);
        dispatch(
            editorActions.onChangeImageBlock({
                id: item.id,
                image: imageURL as string,
                type: ArticleBlockType.IMAGE,
                title,
            }),
        );
    }, [dispatch, imageURL, item.id, onClose, title]);

    const isVisible = Boolean(imageURL);
    const onClickHandler = () => {
        if (!isVisible) {
            fileInputRef.current?.click();
        }
    };

    return (
        <div className={classNames(cls.EditorImageBlock, {}, [className])}>
            <VStack className={cls.body} gap="10">
                <input
                    className={cls.inputFile}
                    ref={fileInputRef}
                    type="file"
                    onChange={onChangeImage}
                    accept=".jpg, .jpeg, .png, .svg"
                />
                <div className={cls.bodyImage} onClick={onClickHandler}>
                    {!imageURL && (
                        <Text
                            className={cls.text}
                            text="Добавить картинку"
                            theme={TextTheme.TEXT}
                        />
                    )}
                    {imageURL && (
                        <div className={cls.image}>
                            <img src={imageURL as string} alt="" />
                        </div>
                    )}
                </div>
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
