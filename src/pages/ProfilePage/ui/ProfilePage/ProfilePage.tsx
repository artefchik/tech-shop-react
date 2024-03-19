import { useParams } from 'react-router-dom';
import { Container } from 'shared/ui/Container/Container';
import { Page } from 'shared/ui/Page/Page';
import { Text, TextSize } from 'shared/ui/Text/Text';
import {
    fetchProfileData,
    getProfileData,
    getProfileError,
    profileReducer,
} from 'features/EditableProfileCard';
import { useTranslation } from 'react-i18next';
import { HStack, VStack } from 'shared/ui/Stack';
import { useEffect, useState } from 'react';
import {
    NavbarProfilePage,
    ProfilePageItemType,
} from 'widgets/NavbarProfilePage';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { ProfileCard } from 'entities/Profile';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { EmptySearch } from 'shared/ui/EmptySearch/EmptySearch';
import { ProfilePagePageBlock } from '../ProfilePageBlock/ProfilePagePageBlock';
import { ProfilePageHeader } from '../ProfilePageHeader/ProfilePageHeader';
import cls from './ProfilePage.module.scss';

interface ProfilePageProps {
    className?: string;
}

const reducers: ReducersList = {
    profile: profileReducer,
};

export const ProfilePage = (props: ProfilePageProps) => {
    const { className } = props;
    const { id } = useParams<{ id: string }>();
    const { t } = useTranslation();
    const [isCurrentBlock, setIsCurrentBlock] = useState(
        ProfilePageItemType.PROFILE,
    );
    const authData = useSelector(getUserAuthData);
    const dispatch = useAppDispatch();
    const profileData = useSelector(getProfileData);

    const error = useSelector(getProfileError);

    useEffect(() => {
        if (id) {
            dispatch(fetchProfileData(id));
        }
    }, [dispatch, id]);

    if (!id) {
        return null;
    }

    let renderContent;

    if (error) {
        renderContent = <EmptySearch text={error} />;
    } else if (authData?.id !== id) {
        renderContent = (
            <>
                <ProfilePageHeader block={isCurrentBlock} />
                <ProfileCard data={profileData} />
            </>
        );
    } else {
        renderContent = (
            <>
                <ProfilePageHeader
                    block={isCurrentBlock}
                    className={cls.title}
                />

                <HStack gap="20" className={cls.content}>
                    <ProfilePagePageBlock block={isCurrentBlock} id={id} />
                    <NavbarProfilePage
                        onChangeBlock={setIsCurrentBlock}
                        block={isCurrentBlock}
                    />
                </HStack>
            </>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page isBottomPadding>
                <Container>
                    <VStack gap="20">{renderContent}</VStack>
                </Container>
            </Page>
        </DynamicModuleLoader>
    );
};
export default ProfilePage;
