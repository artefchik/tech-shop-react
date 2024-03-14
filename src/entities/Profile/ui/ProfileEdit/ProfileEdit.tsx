import { classNames } from 'shared/lib/classNames/classNames';
import { Input } from 'shared/ui/Input/Input';
import { memo } from 'react';
import { VStack } from 'shared/ui/Stack';
import { useTranslation } from 'react-i18next';
import { Profile } from '../../model/types/profile';

interface ProfileEditProps {
    className?: string;
    data: Profile | undefined;
    onChangeFirstname: (value: string) => void;
    onChangeLastname: (value: string) => void;
    onChangeAge: (value: string) => void;
    readonly?: boolean;
}

export const ProfileEdit = memo((props: ProfileEditProps) => {
    const {
        className,
        data,
        onChangeLastname,
        onChangeFirstname,
        onChangeAge,
        readonly,
    } = props;
    const { t } = useTranslation();
    return (
        <VStack width gap="15" className={classNames('', {}, [className])}>
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
