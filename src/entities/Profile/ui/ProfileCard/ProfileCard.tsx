import { classNames } from 'shared/lib/classNames/classNames';
import { Card } from 'shared/ui/Card/Card';
import { VStack } from 'shared/ui/Stack';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import avatar from 'shared/assets/avatar.jpeg';
import { Profile } from '../../model/types/profile';
import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
    className?: string;
    data: Profile | undefined;
}

export const ProfileCard = (props: ProfileCardProps) => {
    const { className, data } = props;
    const name = `${data?.firstname} ${data?.lastname}`;
    const srcAvatar = data?.user?.avatar ? data?.user?.avatar : avatar;
    return (
        <Card className={classNames(cls.ProfileCard, {}, [className])}>
            <VStack align="center" gap="20">
                <div className={cls.avatar}>
                    <img src={srcAvatar} alt="avatar" />
                </div>
                <VStack gap="5" align="center">
                    <Text text={name} size={TextSize.BIG} />
                    <Text text={data?.user?.roles.toString()} theme={TextTheme.TEXT} />
                </VStack>
            </VStack>
        </Card>
    );
};
