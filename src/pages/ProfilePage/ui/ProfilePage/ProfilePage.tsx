import { useParams } from 'react-router-dom';
import { Container } from 'shared/ui/Container/Container';
import { Page } from 'shared/ui/Page/Page';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { profileReducer } from 'features/EditableProfileCard';
import { useTranslation } from 'react-i18next';
import { HStack, VStack } from 'shared/ui/Stack';
import { useState } from 'react';
import {
    ProfilePageItemType,
    NavbarProfilePage,
} from 'widgets/NavbarProfilePage';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ProfilePageHeader } from '../ProfilePageHeader/ProfilePageHeader';
import { ProfilePagePageBlock } from '../ProfilePageBlock/ProfilePagePageBlock';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';

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
    const authData = useSelector(getUserAuthData)


    if (!id) {
        return <Text text={t('User not found')} />;
    }

    if (authData?.id !== id){
        return
    }

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page isBottomPadding>
                <Container>
                    <VStack gap="20">
                        <ProfilePageHeader block={isCurrentBlock} />

                        <HStack gap="20">
                            <ProfilePagePageBlock
                                block={isCurrentBlock}
                                id={id}
                            />
                            <NavbarProfilePage
                                onChangeBlock={setIsCurrentBlock}
                                block={isCurrentBlock}
                            />
                        </HStack>
                    </VStack>
                </Container>
            </Page>
        </DynamicModuleLoader>
    );
};
export default ProfilePage;
