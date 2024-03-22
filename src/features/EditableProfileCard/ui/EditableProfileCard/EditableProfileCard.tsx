import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { memo, ReactNode, useCallback, useEffect } from 'react';
import { Card } from 'shared/ui/Card/Card';
import {
    EditableProfileFooter,
    ProfileCard,
    ProfileEdit,
} from 'entities/Profile';
import { HStack, VStack } from 'shared/ui/Stack';
import { useTranslation } from 'react-i18next';
import { AVATAR_FILE_NAME } from 'shared/const/const';
import { updateProfileAvatar } from '../../model/services/updateProfileAvatar/updateProfileAvatar';
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData';
import { profileActions, profileReducer } from '../../model/slice/profileSlice';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';

interface EditableProfileCardProps {
    className?: string;
    id?: string;
    ActivatedEmail?: ReactNode;
}

export const EditableProfileCard = memo((props: EditableProfileCardProps) => {
    const { className, id, ActivatedEmail } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const dataForm = useSelector(getProfileForm);
    const isLoading = useSelector(getProfileIsLoading);
    const readonly = useSelector(getProfileReadonly);
    const authData = useSelector(getUserAuthData);

    const profileData = useSelector(getProfileData);
    const canEdit = authData?.id === dataForm?.id;
    useEffect(() => {
        if (id) {
            dispatch(fetchProfileData(id));
        }
    }, [dispatch, id]);

    const onChangeFirstname = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ firstname: value || '' }));
        },
        [dispatch],
    );

    const onChangeLastname = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ lastname: value || '' }));
        },
        [dispatch],
    );
    const onChangeAge = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ age: Number(value) }));
        },
        [dispatch],
    );

    const onChangeAvatar = useCallback(
        (imageFile: File) => {
            const formData = new FormData();
            formData.append(AVATAR_FILE_NAME, imageFile);
            console.log(formData);
            dispatch(updateProfileAvatar(formData));
        },
        [dispatch],
    );

    return (
        <VStack gap="25" className={className} width>
            <VStack gap="20">
                <Card>
                    <VStack gap="20">
                        <ProfileEdit
                            readonly={readonly}
                            data={dataForm}
                            onChangeFirstname={onChangeFirstname}
                            onChangeLastname={onChangeLastname}
                            onChangeAvatar={onChangeAvatar}
                            onChangeAge={onChangeAge}
                        />
                        {ActivatedEmail && ActivatedEmail}
                        {canEdit && <EditableProfileFooter />}
                    </VStack>
                </Card>
            </VStack>
        </VStack>
    );
});
