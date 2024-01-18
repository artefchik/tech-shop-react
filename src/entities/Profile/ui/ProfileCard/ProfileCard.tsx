import { classNames } from 'shared/lib/classNames/classNames';
import { Input } from 'shared/ui/Input/Input';
import { memo } from 'react';
import { Card } from 'shared/ui/Card/Card';
import * as fs from 'fs';
import cls from './ProfileCard.module.scss';
import { Profile } from '../../model/types/profile';

interface ProfileCardProps {
    className?: string;
    data: Profile | undefined;
    onChangeFirstname: (value: string) => void,
    onChangeLastname: (value: string) => void,
    readonly?:boolean

}

export const ProfileCard = memo((props: ProfileCardProps) => {
    const {
        className,
        data,
        onChangeLastname,
        onChangeFirstname,
        readonly,
    } = props;
    return (
        <div className={classNames(cls.ProfileCard, {}, [className])}>
            <Input label="First name" readonly={readonly} value={data?.firstname} onChange={onChangeFirstname} />
            <Input label="Last name" readonly={readonly} value={data?.lastname} onChange={onChangeLastname} />
        </div>

    );
});
