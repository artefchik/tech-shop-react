import { classNames } from 'shared/lib/classNames/classNames';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { AppImage } from 'shared/ui/AppImage/AppImage';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import avatar from 'shared/assets/avatar.jpeg';
import { HStack } from 'shared/ui/Stack';
import { Button } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { use } from 'i18next';
import cls from './AvatarChange.module.scss';

interface AvatarChangeProps {
    className?: string;
    srcImage?: string;
    onChangeAvatar: (formData: File) => void;
}

export const AvatarChange = (props: AvatarChangeProps) => {
    const { className, onChangeAvatar, srcImage } = props;
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [imageURL, setImageURL] = useState<File>();
    const [image, setImage] = useState(srcImage ?? avatar);
    const { t } = useTranslation();
    const fileReader = new FileReader();
    fileReader.onloadend = (readerEvent: ProgressEvent<FileReader>) => {
        if (readerEvent?.target?.result) {
            setImage(fileReader.result as string);
        }
    };
    const onChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files) {
            const file = e.target.files?.[0];
            fileReader.readAsDataURL(file);
            setImageURL(file);
        }
    };
    //
    useEffect(() => {
        if (imageURL) {
            onChangeAvatar(imageURL);
        }
    }, [imageURL, onChangeAvatar]);

    const onClickHandler = () => {
        fileInputRef.current?.click();
    };

    return (
        <HStack
            gap="15"
            align="center"
            className={classNames(cls.AvatarChange, {}, [className])}
        >
            <AppImage
                className={cls.avatar}
                fallback={
                    <Skeleton
                        width="100%"
                        height="100%"
                        className={cls.avatar}
                    />
                }
                src={image}
                errorFallback={
                    <img className={cls.avatar} src={avatar} alt="avatar" />
                }
            />
            <input
                className={cls.imageInput}
                ref={fileInputRef}
                type="file"
                onChange={onChangeImage}
                accept=".jpg, .jpeg, .png, .svg"
            />
            <Button onClick={onClickHandler}> {t('Change avatar')}</Button>
        </HStack>
    );
};
