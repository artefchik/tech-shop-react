import { classNames } from 'shared/lib/classNames/classNames';
import { Card } from 'shared/ui/Card/Card';
import { VStack } from 'shared/ui/Stack';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import avatar from 'shared/assets/avatar.jpeg';
import { AppImage } from 'shared/ui/AppImage/AppImage';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Profile } from '../../model/types/profile';
import cls from './ProfileCard.module.scss';

interface ProfileCardProps {
    className?: string;
    data: Profile | undefined;
    isLoading?: boolean;
}

export const ProfileCard = (props: ProfileCardProps) => {
    const { className, data, isLoading = false } = props;
    const name = `${data?.firstname} ${data?.lastname}`;
    const srcAvatar = data?.user?.avatar ? data?.user?.avatar : avatar;

    return (
        <Card className={classNames(cls.ProfileCard, {}, [className])}>
            <VStack align="center" gap="20">
                <AppImage
                    className={cls.avatar}
                    fallback={<Skeleton border="50%" className={cls.avatar} />}
                    src={srcAvatar}
                />
                <VStack gap="5" align="center">
                    {isLoading ? (
                        <>
                            <Skeleton height={32} width={160} />
                            <Skeleton height={32} width={150} />
                        </>
                    ) : (
                        <>
                            <Text text={name} size={TextSize.BIG} />
                            <Text
                                text={data?.user?.roles.toString()}
                                theme={TextTheme.TEXT}
                            />
                        </>
                    )}
                </VStack>
            </VStack>
        </Card>
    );
};
