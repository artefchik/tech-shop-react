import { classNames } from 'shared/lib/classNames/classNames';
import { Input } from 'shared/ui/Input/Input';
import { memo } from 'react';
import { VStack } from 'shared/ui/Stack';
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
        <VStack width gap="15" className={classNames('', {}, [className])}>
            <Input label="First name" readonly={readonly} value={data?.firstname} onChange={onChangeFirstname} />
            <Input label="Last name" readonly={readonly} value={data?.lastname} onChange={onChangeLastname} />
        </VStack>

    );
});
