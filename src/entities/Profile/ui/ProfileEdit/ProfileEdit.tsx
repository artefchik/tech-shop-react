import { classNames } from 'shared/lib/classNames/classNames';
import { Input } from 'shared/ui/Input/Input';
import { ChangeEvent, memo, useEffect, useRef, useState } from 'react';
import { VStack } from 'shared/ui/Stack';
import { useTranslation } from 'react-i18next';
import { UploadImage } from 'shared/ui/UploadImage/UploadImage';
import cls from 'shared/ui/UploadImage/UploadImage.module.scss';
import axios from 'axios';
import { AvatarChange } from 'shared/ui/AvatarChange/AvatarChange';
import { Checkbox } from 'shared/ui/Checkbox';
import { Profile } from '../../model/types/profile';

interface ProfileEditProps {
    className?: string;
    data: Profile | undefined;
    onChangeFirstname: (value: string) => void;
    onChangeLastname: (value: string) => void;
    onChangeAge: (value: string) => void;
    onChangeAvatar: (formData: File) => void;

    readonly?: boolean;
}

export const ProfileEdit = memo((props: ProfileEditProps) => {
    const {
        className,
        data,
        onChangeLastname,
        onChangeFirstname,
        onChangeAge,
        onChangeAvatar,
        readonly,
    } = props;
    const { t } = useTranslation();

    return (
        <VStack width gap="15" className={classNames('', {}, [className])}>
            <AvatarChange
                srcImage={data?.user?.avatar}
                onChangeAvatar={onChangeAvatar}
            />
            <Input
                label={t('First name')}
                readonly={readonly}
                value={data?.firstname}
                onChange={onChangeFirstname}
            />
            <Input
                label={t('Last name')}
                readonly={readonly}
                value={data?.lastname}
                onChange={onChangeLastname}
            />
            <Input
                type="number"
                label={t('Age')}
                readonly={readonly}
                value={String(data?.age)}
                onChange={onChangeAge}
            />
        </VStack>
    );
});
