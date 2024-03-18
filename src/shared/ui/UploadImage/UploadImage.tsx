import { classNames } from 'shared/lib/classNames/classNames';
import { ChangeEvent, CSSProperties, useEffect, useRef, useState } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import cls from './UploadImage.module.scss';

interface UploadImageProps<T> {
    className?: string;
    height?: number | string;
    text?: string;
    image?: string;
    adaptive?: boolean;
    onChangeImageBlock: (image: string) => void;
}

export function UploadImage<T>(props: UploadImageProps<T>) {
    const {
        className,
        height = 150,
        text = 'Добавить картинку',
        image,
        adaptive = false,
        onChangeImageBlock,
    } = props;

    const [imageURL, setImageURL] = useState<string | ArrayBuffer | null>(
        image ?? null,
    );
    const fileInputRef = useRef<HTMLInputElement>(null);
    const isVisible = Boolean(imageURL);

    const fileReader = new FileReader();
    fileReader.onloadend = (readerEvent: ProgressEvent<FileReader>) => {
        if (readerEvent?.target?.result) {
            setImageURL(fileReader.result);
            onChangeImageBlock(fileReader.result as string);
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
                    <div
                        className={classNames(
                            cls.image,
                            { [cls.adaptive]: adaptive },
                            [className],
                        )}
                    >
                        <img src={imageURL as string} alt="" />
                    </div>
                )}
            </div>
        </div>
    );
}
