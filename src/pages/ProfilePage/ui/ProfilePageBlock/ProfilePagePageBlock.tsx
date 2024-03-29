import { useCallback, useEffect } from 'react';
import { ProfilePageItemType } from 'widgets/NavbarProfilePage';
import { ProfileCard } from 'entities/Profile';
import { EditableProfileCard } from 'features/EditableProfileCard';
import { useSelector } from 'react-redux';
import { getProfileData } from 'features/EditableProfileCard/model/selectors/getProfileData/getProfileData';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchProfileData } from 'features/EditableProfileCard/model/services/fetchProfileData/fetchProfileData';
import { getProfileIsLoading } from 'features/EditableProfileCard/model/selectors/getProfileIsLoading/getProfileIsLoading';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { ProfileFavoritesBlock } from 'pages/ProfilePage/ui/ProfileFavoritesBlock/ProfileFavoritesBlock';
import { HStack } from 'shared/ui/Stack';
import { ConfirmEmail } from 'features/ConfirmEmail/ui/ConfirmEmail';

interface ProfilePagePageBlockProps {
    className?: string;
    id: string;
    block: ProfilePageItemType;
}

export const ProfilePagePageBlock = (props: ProfilePagePageBlockProps) => {
    const { className, block, id } = props;
    const isLoading = useSelector(getProfileIsLoading);

    const profileData = useSelector(getProfileData);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (id) {
            dispatch(fetchProfileData(id));
        }
    }, [dispatch, id]);

    const renderBlock = useCallback(() => {
        switch (block) {
            case ProfilePageItemType.FAVORITES:
                return <ProfileFavoritesBlock />;

            case ProfilePageItemType.PROFILE:
                return <ProfileCard isLoading={isLoading} data={profileData} />;

            case ProfilePageItemType.SETTING:
                return (
                    <EditableProfileCard
                        id={id}
                        ActivatedEmail={<ConfirmEmail />}
                    />
                );
            default:
                return <ProfileCard isLoading={isLoading} data={profileData} />;
        }
    }, [isLoading, id, block, profileData]);

    return <HStack width>{renderBlock()}</HStack>;
};
