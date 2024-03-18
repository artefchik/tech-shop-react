import { HStack } from 'shared/ui/Stack';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { useSelector } from 'react-redux';
import { ProfilePageItemType } from 'widgets/NavbarProfilePage';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import {
    getProfileData,
    getProfileIsLoading,
} from 'features/EditableProfileCard';

interface ProfilePageHeaderProps {
    className?: string;
    block: ProfilePageItemType;
}

export const ProfilePageHeader = (props: ProfilePageHeaderProps) => {
    const { className, block } = props;
    const profileData = useSelector(getProfileData);
    const isLoading = useSelector(getProfileIsLoading);
    const { t } = useTranslation();
    const renderTitle = useCallback(() => {
        switch (block) {
            case ProfilePageItemType.SETTING:
                return t('User settings');
            case ProfilePageItemType.PROFILE:
                return t('User profile');
            case ProfilePageItemType.FAVORITES:
                return t('Favorites');
            default:
                return '';
        }
    }, [block, t]);

    if (isLoading) {
        return <Skeleton height={42} width={600} />;
    }

    return (
        <HStack gap="10" className={className}>
            <Text text={renderTitle()} size={TextSize.LARGE} />
            <Text
                theme={TextTheme.SECONDARY}
                size={TextSize.LARGE}
                text={`${profileData?.firstname} ${profileData?.lastname}`}
            />
        </HStack>
    );
};
