import { classNames } from 'shared/lib/classNames/classNames';
import { Card } from 'shared/ui/Card/Card';
import { VStack } from 'shared/ui/Stack';
import { Text } from 'shared/ui/Text/Text';
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
    const srcAvatar = data?.avatar ? data?.avatar : avatar;
    return (
        <Card className={classNames(cls.ProfileCard, {}, [className])}>
            <VStack align="center" gap="20">
                <div className={cls.avatar}>
                    <img src={avatar} alt="avatar" />
                </div>
                <VStack gap="10" align="center">
                    <Text title={name} />
                    <Text text={data?.user?.roles.toString()} />
                </VStack>
            </VStack>
        </Card>
    );
};
