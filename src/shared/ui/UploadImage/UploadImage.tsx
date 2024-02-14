import { classNames } from 'shared/lib/classNames/classNames';
import { ChangeEvent, CSSProperties, useEffect, useRef, useState } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { ImageBlock } from 'features/Editor/model/types/editor';
import cls from './UploadImage.module.scss';

interface UploadImageProps {
    className?: string;
    height?: number | string;
    text?: string;
    item: ImageBlock;
    onChangeImageBlock?: (block: ImageBlock) => void;
}

export const UploadImage = (props: UploadImageProps) => {
    const {
        className,
        height = 150,
        text = 'Добавить картинку',
        onChangeImageBlock,
        item,
    } = props;

    const [imageURL, setImageURL] = useState<string | ArrayBuffer | null>(
        item?.image ?? null,
    );
    const fileInputRef = useRef<HTMLInputElement>(null);
    const isVisible = Boolean(imageURL);

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
            fileReader.readAsDataURL(file);
        }
    };
    const onClickHandler = () => {
        if (!isVisible) {
            fileInputRef.current?.click();
        }
    };

    const styles: CSSProperties = {
        minHeight: height,
    };

    useEffect(() => {
        if (onChangeImageBlock) {
            onChangeImageBlock({
                id: item.id,
                image: imageURL as string,
                type: item.type,
                title: text,
            });
        }
    }, [imageURL, item.id, item.type, onChangeImageBlock, text]);

    return (
        <div className={classNames(cls.UploadImage, {}, [className])}>
            <input
                className={cls.inputFile}
                ref={fileInputRef}
                type="file"
                onChange={onChangeImage}
                accept=".jpg, .jpeg, .png, .svg"
            />
            <div
                className={classNames(
                    cls.bodyImage,
                    { [cls.selectedImage]: Boolean(imageURL) },
                    [className],
                )}
                onClick={onClickHandler}
                style={styles}
            >
                {!imageURL && (
                    <Text
                        className={cls.text}
                        text={text}
                        theme={TextTheme.TEXT}
                    />
                )}
                {imageURL && (
                    <div className={cls.image}>
                        <img src={imageURL as string} alt="" />
                    </div>
                )}
            </div>
        </div>
    );
};
